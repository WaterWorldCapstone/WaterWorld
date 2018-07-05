'use strict'

const db = require('../server/db')
const {
  User,
  Donor,
  Vendor,
  Pool,
  Donation,
  Transaction,
  Region
} = require('../server/db/models')

const users = [
  {
    email: 'cody@email.com',
    password: '123',
    firstName: 'Cody',
    lastName: 'mnb',
    userType: 'admin'
  },
  {
    email: 'jesse@email.com',
    password: '234',
    firstName: 'Jesse',
    lastName: 'Sullivan',
    userType: 'donor'
  },
  {
    email: 'pluto@crat.com',
    password: `$$$`,
    firstName: `Ava`,
    lastName: `Ricious`,
    userType: 'vendor'
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
    name: 'Alpha',
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
  },
  {
    name: 'Mori Volo',
    latitude: '42.75',
    longitude: '70.32',
    mostRecentDonation: '200',
    mostRecentExpenditure: '100',
    targetQuantity: '500', //represents amount of water in each dispatch to the pool area
    town: 'Panta Kakista',
    country: 'Thanatos archein',
    continent: 'Nemo caret',
    status: 'collecting money', //pool is in planning, collecting money, open for bidding, sent to vendor, complete
    currentFunds: '800',
    solutionType: 'water',
    goalFunds: '2000',
    needIntensity: '7',
    population: 37,
    mortalityRate: '10',
    factoids: ['Nihil est vivere ratio', 'Summa stultitia sum'],
    waterQuality: 'poor',
    images: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
  },
  {
    name: 'Beta',
    latitude: '17.030',
    longitude: '-61.796',
    mostRecentDonation: '200',
    mostRecentExpenditure: '100',
    targetQuantity: '500', //represents amount of water in each dispatch to the pool area
    town: 'New York',
    country: 'Trump Land',
    continent: 'North America',
    status: 'open for bidding', //pool is in planning, collecting money, open for bidding, sent to vendor, complete
    currentFunds: '800',
    solutionType: 'water',
    goalFunds: '1000',
    needIntensity: '7',
    population: 50,
    mortalityRate: '10',
    factoids: ['Gabe likes swords', 'Gabe was in stackapella'],
    waterQuality: 'poor',
    images: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
  },
  {
    name: 'Gamma',
    latitude: '26.066',
    longitude: '50.557',
    mostRecentDonation: '200',
    mostRecentExpenditure: '100',
    targetQuantity: '500', //represents amount of water in each dispatch to the pool area
    town: 'New York',
    country: 'Trump Land',
    continent: 'North America',
    status: 'open for bidding', //pool is in planning, collecting money, open for bidding, sent to vendor, complete
    currentFunds: '800',
    solutionType: 'water',
    goalFunds: '5000',
    needIntensity: '7',
    population: 50,
    mortalityRate: '10',
    factoids: ['Gabe likes swords', 'Gabe was in stackapella'],
    waterQuality: 'poor',
    images: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
  },
  {
    name: 'Delta',
    latitude: '13.193',
    longitude: '-59.543',
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
    population: 50,
    mortalityRate: '10',
    factoids: ['Gabe likes swords', 'Gabe was in stackapella'],
    waterQuality: 'poor',
    images: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
  },
  {
    name: 'Epsilon',
    latitude: '13.183',
    longitude: '-59.543',
    mostRecentDonation: '200',
    mostRecentExpenditure: '100',
    targetQuantity: '500', //represents amount of water in each dispatch to the pool area
    town: 'New York',
    country: 'Trump Land',
    continent: 'North America',
    status: 'open for bidding', //pool is in planning, collecting money, open for bidding, sent to vendor, complete
    currentFunds: '200',
    solutionType: 'water',
    goalFunds: '2000',
    needIntensity: '7',
    population: 50,
    mortalityRate: '10',
    factoids: ['Gabe likes swords', 'Gabe was in stackapella'],
    waterQuality: 'poor',
    images: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
  },
  {
    name: 'Zeta',
    latitude: '13.189',
    longitude: '-59.543',
    mostRecentDonation: '200',
    mostRecentExpenditure: '100',
    targetQuantity: '500', //represents amount of water in each dispatch to the pool area
    town: 'New York',
    country: 'Trump Land',
    continent: 'North America',
    status: 'open for bidding', //pool is in planning, collecting money, open for bidding, sent to vendor, complete
    currentFunds: '300',
    solutionType: 'water',
    goalFunds: '2000',
    needIntensity: '7',
    population: 50,
    mortalityRate: '10',
    factoids: ['Gabe likes swords', 'Gabe was in stackapella'],
    waterQuality: 'poor',
    images: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
  },
  {
    name: 'Eta',
    latitude: '13.193',
    longitude: '-59.523',
    mostRecentDonation: '200',
    mostRecentExpenditure: '100',
    targetQuantity: '500', //represents amount of water in each dispatch to the pool area
    town: 'New York',
    country: 'Trump Land',
    continent: 'North America',
    status: 'open for bidding', //pool is in planning, collecting money, open for bidding, sent to vendor, complete
    currentFunds: '500',
    solutionType: 'water',
    goalFunds: '2200',
    needIntensity: '7',
    population: 50,
    mortalityRate: '10',
    factoids: ['Gabe likes swords', 'Gabe was in stackapella'],
    waterQuality: 'poor',
    images: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
  },
  {
    name: 'Theta',
    latitude: '-11.645',
    longitude: '43.333',
    mostRecentDonation: '200',
    mostRecentExpenditure: '100',
    targetQuantity: '500', //represents amount of water in each dispatch to the pool area
    town: 'New York',
    country: 'Trump Land',
    continent: 'North America',
    status: 'open for bidding', //pool is in planning, collecting money, open for bidding, sent to vendor, complete
    currentFunds: '500',
    solutionType: 'water',
    goalFunds: '2600',
    needIntensity: '7',
    population: 50,
    mortalityRate: '10',
    factoids: ['Gabe likes swords', 'Gabe was in stackapella'],
    waterQuality: 'poor',
    images: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
  },
  {
    name: 'Iota',
    latitude: '35.156',
    longitude: '33.429',
    mostRecentDonation: '200',
    mostRecentExpenditure: '100',
    targetQuantity: '500', //represents amount of water in each dispatch to the pool area
    town: 'New York',
    country: 'Trump Land',
    continent: 'North America',
    status: 'open for bidding', //pool is in planning, collecting money, open for bidding, sent to vendor, complete
    currentFunds: '500',
    solutionType: 'water',
    goalFunds: '3100',
    needIntensity: '7',
    population: 50,
    mortalityRate: '10',
    factoids: ['Gabe likes swords', 'Gabe was in stackapella'],
    waterQuality: 'poor',
    images: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
  }
]

const regions = [
  {
    latitude: '17.060',
    longitude: '-61.796',
    weight: 5
  },
  {
    latitude: '26.066',
    longitude: '50.557',
    weight: 5
  },
  {
    latitude: '13.193',
    longitude: '-59.543',
    weight: 5
  },
  {
    latitude: '-11.645',
    longitude: '43.333',
    weight: 5
  },
  {
    latitude: '35.126',
    longitude: '33.429',
    weight: 5
  },
  {
    latitude: '15.414',
    longitude: '-61.370',
    weight: 5
  },
  {
    latitude: '18.109',
    longitude: '-77.297',
    weight: 5
  },
  {
    latitude: '35.937',
    longitude: '14.375',
    weight: 5
  },
  {
    latitude: '25.354',
    longitude: '51.183',
    weight: 5
  },
  {
    latitude: '13.909',
    longitude: '-60.978',
    weight: 5
  },
  {
    latitude: '12.984',
    longitude: '-61.287',
    weight: 5
  },
  {
    latitude: '43.942',
    longitude: '12.457',
    weight: 5
  },
  {
    latitude: '1.352',
    longitude: '103.819',
    weight: 5
  },
  {
    latitude: '10.691',
    longitude: '-61.222',
    weight: 5
  },
  {
    latitude: '23.424',
    longitude: '53.847',
    weight: 5
  },
  {
    latitude: '24.215',
    longitude: '-12.885',
    weight: 5
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

  const createdUsers = await Promise.all(users.map(user => User.create(user)))
  const createdDonors = await Promise.all(
    donors.map(donor => Donor.create(donor))
  )
  const createdVendors = await Promise.all(
    vendors.map(vendor => Vendor.create(vendor))
  )
  const createdRegions = await Promise.all(
    regions.map(region => Region.create(region))
  )
  const createdPools = await Promise.all(pools.map(pool => Pool.create(pool)))
  const createdDonation = await Donation.create(donations[0])
  const createdTransaction = await Transaction.create(transactions[0])
  await createdUsers[0].setDonor(createdDonors[0])
  await createdUsers[2].setVendor(createdVendors[0])
  await createdDonation.setDonor(createdDonors[0])
  await createdDonation.setPool(createdPools[0])
  await createdTransaction.setVendor(createdVendors[0])
  await createdTransaction.setPool(createdPools[0])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${createdPools.length} pools`)
  console.log(
    `seeded ${createdVendors.length + createdDonors.length + 2} other things`
  )
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
  pools,
  regions
}
