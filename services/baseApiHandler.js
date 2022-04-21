const show = async (req, res, record) => {
  try {
    let { id } = req.query
    id = parseInt(id)

    const dbRecord = await record.findUnique({
      where: {
        id: id,
      },
    })

    if (!dbRecord) {
      res.status(404).json({ data: null })
      return
    }

    res.status(200).json({ data: dbRecord })
  } catch (error) {
    res.status(500).json({ data: error.message })
  }
}

const list = async (req, res, record) => {
  try {
    const { skip, take, ...rest } = req.query
    const parsedSkip = parseInt(skip)
    const parsedTake = parseInt(take)

    const result = await record.findMany({
      ...(skip && { skip: parsedSkip }),
      ...(take && { take: parsedTake }),
      where: { ...rest },
    })

    res.status(200).json({ data: result })
  } catch (error) {
    res.status(500).json({ data: error.message })
  }
}

module.exports = {
  show,
  list,
}
