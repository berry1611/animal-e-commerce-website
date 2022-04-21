import { verify } from 'jsonwebtoken'

export const authenticated = () => {
  const handler = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ data: 'Sorry you are not authenticated' })
    verify(token, process.env.JWT_SECRET, async (error, result) => {
      if (!error && result) {
        return next()
      }
      res.status(401).json({ data: 'Sorry you are not authenticated' })
    })
  }

  return handler
}
