import prisma from 'services/prisma'
import nc from 'next-connect'
import withMethodHandler from 'middlewares/withMethodHandler'
import { compare, hash } from 'bcrypt'
import { changePassSchema } from 'utils/validator'
import { authenticated } from 'middlewares/authentication'

const changePassword = async (req, res) => {
  try {
    let { email, oldPass, newPass } = await changePassSchema.validateAsync(req.body)
    const round = 10
    hash(newPass, round, async (error, hash) => {
      if (error) return res.status(400).json({ data: 'Hash Failed' })
      newPass = hash
      try {
        const userData = await prisma.user.findUnique({
          where: { email },
        })
        compare(oldPass, userData.password, async (error, result) => {
          if (!error && result) {
            const updateUser = await prisma.user.update({
              where: { email },
              data: {
                password: newPass,
              },
            })
            return res.status(200).json({ data: 'Password Changed Successfully' })
          }
          res.status(401).json({ data: 'Wrong Password' })
        })
      } catch (error) {
        res.status(404).json({ data: 'User not found' })
      }
    })
  } catch (error) {
    res.status(422).json({ data: 'New Password Not Valid' })
  }
}

const handler = nc()
  .use(withMethodHandler(['PATCH']))
  .use(authenticated())
  .patch((req, res) => changePassword(req, res))

export default handler
