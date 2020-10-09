const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Rental = mongoose.model(
  "Rental",
  mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: { type: String, required: true, minlength: 5, maxlength: 50 },
        phone: { type: String, required: true },
        isGold: { type: Boolean, default: false },
      }),
      required: true,
    },
    movie: {
      type: mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
          get: (v) => Math.round(v),
          set: (v) => Math.round(v),
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0 },
  })
);

validateRental = (rental) => {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
};

exports.Rental = Rental;
exports.validate = validateRental;
