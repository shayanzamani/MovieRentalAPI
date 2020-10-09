const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: { type: String, required: true },
    isGold: { type: Boolean, default: false },
  })
);

validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.number().maxlength(12).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
