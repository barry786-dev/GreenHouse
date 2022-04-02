const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create product schema

const UserProductSchema = new Schema(
  {
    productNameByUser: {
      type: String,
      required: [true, 'product name is required'],
      minLength: [
        2,
        `product name must be more than 2 characters, you entered only: ${
          'VALUE'.length
        }`,
      ],
      maxLength: [30, ' product name should be not more than 30 characters'],
    },
    serialNumber: {
      type: String,
      unique: true,
      required: [true, 'serialNumber is required'],
      length: [12, 'serialNumber must be 12 characters'],
      match: [
        /^([A-Z]{2})([0-9]{3})([A-Z]{1})([0-9]{6})/,
        'this is not valid serial Number',
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      default: null,
    },
    data: {
      light: {
        type: [
          {
            value: { type: Number },
            date: { type: Date },
          },
        ],
        default: [{ value: 0, date: Date.now() }],
      },
      SoilHumidity: {
        type: [
          {
            value: { type: Number },
            date: { type: Date },
          },
        ],
        default: [{ value: 0, date: Date.now() }],
      },
      pump: {
        type: [
          {
            value: { type: Number, enum: [0, 1] },
            date: { type: Date },
          },
        ],
        default: [{ value: 0, date: Date.now() }],
      },
    },
    settings: {
      SoilHumidityS: {
        minValue: { type: Number, default: 0 },
        period: { type: Number, min: 0, default: 24 }, // in hours
        runTime: { type: Number, min: 1, default: 1 }, //in seconds
      },
    },
  },
  { collection: 'User_Product' }
);
const User_Product = mongoose.model('User_Product', UserProductSchema);

module.exports = User_Product;
