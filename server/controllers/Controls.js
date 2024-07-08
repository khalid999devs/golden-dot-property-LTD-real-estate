const {
  clients,
  clientproperties,
  Sequelize,
  properties,
} = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');
const { generateLast12MonthsData } = require('../utils/analytics');

const getDashboardAnalytics = async (req, res) => {
  let last12MonthBooking = await generateLast12MonthsData(clients);
  last12MonthBooking = last12MonthBooking.map((item) => {
    return { label: item.month, bookings: item.count };
  });

  let propertyBasedBookings = await clientproperties.findAll({
    attributes: [
      'heading',
      [Sequelize.fn('COUNT', Sequelize.col('heading')), 'count'],
    ],
    group: ['heading'],
  });
  let propertyBookingCountObj = {
    labels: [],
    data: [],
  };
  propertyBasedBookings.forEach((record) => {
    propertyBookingCountObj.labels.push(record.heading);
    propertyBookingCountObj.data.push(record.dataValues.count);
  });

  const allBookingsCount = await clients.count();

  const categoryBasedCounts = await properties.findAll({
    attributes: [
      [
        Sequelize.literal("JSON_UNQUOTE(JSON_EXTRACT(category, '$.value'))"),
        'categoryValue',
      ],
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
    ],
    group: ['categoryValue'],
    raw: true,
  });

  res.json({
    succeed: true,
    result: {
      last12MonthBooking,
      propertyBasedBookings: propertyBookingCountObj,
      allBookingsCount,
      categoryBasedCounts,
    },
  });
};

module.exports = { getDashboardAnalytics };
