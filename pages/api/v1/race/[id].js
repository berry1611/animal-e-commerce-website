import withMethodHandler from "middlewares/withMethodHandler"
import nc from "next-connect"
import { show } from "services/baseApiHandler"
const prisma = require("services/prisma")

const handler = nc()
  .use(withMethodHandler())
  .get((req, res) => show(req, res, prisma.race))

export default handler