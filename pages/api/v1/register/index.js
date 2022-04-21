import prisma from 'services/prisma'
import { hash } from 'bcrypt'
import { regSchema } from '@utils/validator'
import nc from 'next-connect'
import withMethodHandler from 'middlewares/withMethodHandler'

const register = async (req, res) => {
  try {
    const validationResult = await regSchema.validateAsync(req.body)
    const round = 10
    hash(validationResult.password, round, async (error, hash) => {
      if (error) return res.status(500).json({ data: 'Hash Failed' })
      validationResult.password = hash
      try {
        const result = await prisma.user.create({
          data: validationResult,
        })
        res.status(200).json({ data: result })
      } catch (error) {
        if (error.code === 'P2002') {
          res.status(401).json({ data: 'Account has already been registered' })
        } else {
          res.status(401).json({ data: 'Registration Failed' })
        }
      }
    })
  } catch (error) {
    res.status(422).json({ data: `${error.details[0].context.label} not valid` })
  }
}

const handler = nc()
  .use(withMethodHandler(['POST']))
  .post((req, res) => register(req, res))

export default handler
