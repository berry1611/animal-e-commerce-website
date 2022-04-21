import prisma from 'services/prisma'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import nc from 'next-connect'
import withMethodHandler from 'middlewares/withMethodHandler'

const login = async (req, res) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })
    const { password, ...rest } = userData
    compare(req.body.password, password, (error, result) => {
      if (!error && result) {
        const claims = { sub: rest.id }
        const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(201).json({ jwt, data: rest })
      } else {
        res.status(401).json({ data: 'Login Failed' })
      }
    })
  } catch (error) {
    res.status(404).json({ data: 'User Not Found' })
  }
}

const handler = nc()
  .use(withMethodHandler(['POST']))
  .post((req, res) => login(req, res))

export default handler
