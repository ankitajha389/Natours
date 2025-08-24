

const Booking = require('../models/bookingModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

// ✅ Admin: All bookings
exports.getAllBookings = factory.getAll(Booking);

// ✅ One booking by ID
exports.getBooking = factory.getOne(Booking);

// ✅ Create booking
exports.createBooking = factory.createOne(Booking);

// ✅ Update booking
exports.updateBooking = factory.updateOne(Booking);

// ✅ Delete booking
exports.deleteBooking = factory.deleteOne(Booking);

// ✅ 🆕 Get bookings of logged-in user
exports.getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('tour');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      data: bookings
    }
  });
});
