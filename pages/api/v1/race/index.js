import withMethodHandler from "middlewares/withMethodHandler"
import nc from "next-connect"
import { list } from "services/baseApiHandler"
const prisma = require("services/prisma")

const handler = nc()
  .use(withMethodHandler())
  .get((req, res) => list(req, res, prisma.race))

export default handler
