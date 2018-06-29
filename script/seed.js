'use strict'

const db = require('../server/db')
const {
  User,
  Donor,
  Vendor,
  Pool,
  Donation,
  Transaction
} = require('../server/db/models')

const users = [
  {
    email: 'cody@email.com',
    password: '123',
    firstName: 'Cody',
    lastName: 'mnb'
  },
  {
    email: 'jesse@email.com',
    password: '234',
    firstName: 'Jesse',
    lastName: 'Sullivan'
  }
]

const donors = [
  {
    address: 'Brooklyn, NY',
    totalDonation: '3000',
    donationCount: 200,
    mostRecentDonation: '100'
  }
]

const vendors = [
  {
    address: 'Brooklyn, NY',
    continent: 'North America',
    country: 'USA',
    town: 'Williamsburg',
    maxCapacity: '100000',
    companyName: 'Water4you',
    mostRecentDisbursement: '5000',
    totalWaterDistributed: '200000',
    disbursementCount: 4,
    totalDisbursement: 20000,
    averagePrice: ''
  }
]

const donations = [
  {
    amount: '100'
  }
]

const transactions = [
  {
    cost: '200',
    quantity: '1000',
    deliveryDate: '2018-06-04 08:20:20'
  }
]

const pools = [
  {
    name: 'Haskell',
    latitude: '42.75',
    longitude: '70.32',
    mostRecentDonation: '200',
    mostRecentExpenditure: '100',
    targetQuantity: '500', //represents amount of water in each dispatch to the pool area
    town: 'New York',
    country: 'Trump Land',
    continent: 'North America',
    status: 'open for bidding', //pool is in planning, collecting money, open for bidding, sent to vendor, complete
    currentFunds: '800',
    solutionType: 'water',
    goalFunds: '2000',
    needIntensity: '7',
    population: 37,
    mortalityRate: '10',
    factoids: ['Gabe likes swords', 'Gabe was in stackapella'],
    waterQuality: 'poor'
  }
]

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const createdUsers = await Promise.all(users.map(user => User.create(user)))
  const createdDonors = await Promise.all(
    donors.map(donor => Donor.create(donor))
  )
  const createdVendors = await Promise.all(
    vendors.map(vendor => Vendor.create(vendor))
  )
  const createdPools = await Promise.all(pools.map(pool => Pool.create(pool)))
  await createdUsers[0].setDonor(createdDonors[0])
  await createdUsers[1].setVendor(createdVendors[0])
  await createdPools[0].addDonor(createdDonors[0])
  await createdPools[0].addVendor(createdVendors[0])
  const foundDonations = await Donation.findAll()
  const foundTransactions = await Transaction.findAll()
  await foundDonations[0].update(donations[0])
  await foundTransactions[0].update(transactions[0])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = {
  seed,
  users,
  donors,
  vendors,
  transactions,
  pools
}
