import prisma from 'services/prisma'
import nc from 'next-connect'
import withMethodHandler from 'middlewares/withMethodHandler'
import nodemailer from 'nodemailer'
import { decode, sign } from 'jsonwebtoken'
import { resetPassSchema } from '@utils/validator'
import { hash } from 'bcrypt'

const sendMail = async (req, res) => {
  const companyName = 'CariHewan'
  const domainName = req.headers.host
  const { email } = req.body
  try {
    const findUser = await prisma.user.findUnique({
      where: { email },
    })
    const token = sign({ id: findUser.id, email: findUser.email }, process.env.RESET_PASS_SECRET, {
      expiresIn: '20m',
    })

    const transporter = nodemailer.createTransport({
      host: 'mail.carihewan.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.TRANSPORTER_EMAIL,
        pass: process.env.TRANSPORTER_PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: `${companyName} <noreply@${companyName}.com>`,
      to: `${findUser.email}`,
      subject: `Password Reset Request for ${companyName}`,
      html: `
      <p>Dear ,</p>

      <p>Seseorang baru saja meminta
      pembaharuan kata sandi untuk akun
      dengan email ${findUser.email}.</p>

      <p>Bukan kamu? Perkuat keamanan akunmu
      dengan mengganti kata sandimu.</p>

      <p>Abaikan pesan ini jika kamu tidak ingin
      reset password.</p>

      <a href="http://${domainName}/password/reset?key=${token}">Reset Password</a>
      `,
    })
    res.status(200).json({ data: `Email has been sent to ${findUser.email}` })
  } catch (error) {
    res.status(404).json({ data: 'User Not Found' })
    console.log(error)
  }
}

const resetPassword = async (req, res) => {
  const id = decode(req.query.key).id
  const round = 10
  try {
    let { newPass } = await resetPassSchema.validateAsync(req.body)
    hash(newPass, round, async (error, hash) => {
      if (error) return res.status(500).json({ data: 'Hash Failed' })
      newPass = hash
      try {
        const updateUser = await prisma.user.update({
          where: { id },
          data: {
            password: newPass,
          },
        })
        res.status(200).json({ data: 'Password Reset Successfully' })
      } catch (error) {
        res.status(500).json({ data: 'Password Reset Failed' })
      }
    })
  } catch (error) {
    res.status(422).json({ data: 'New Password Not Valid' })
  }
}

const handler = nc()
  .use(withMethodHandler(['POST', 'PATCH']))
  .post((req, res) => sendMail(req, res))
  .patch((req, res) => resetPassword(req, res))

export default handler
