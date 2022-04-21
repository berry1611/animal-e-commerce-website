const { PrismaClient } = require('@prisma/client')
const seedRaces = require('./seeds/rasHewan')
const seedAnimals = require('./seeds/namaHewan')
const prisma = new PrismaClient()

async function main() {
  for (const seed in seedAnimals) {
    const result = await prisma.animal.create({
      data: {
        ...seedAnimals[seed],
        races: {
          createMany: {
            data: seedRaces[seed],
          },
        },
      },
    })
  }
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
