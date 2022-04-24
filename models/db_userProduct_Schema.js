const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create product schema

const UserProductSchema = new Schema(
  {
    productNameByUser: {
      type: String,
      trim: true,
      required: [true, 'product name is required'],
      minLength: [
        2,
        `product name must be more than 2 characters, you entered only: ${
          'VALUE'.length
        }`,
      ],
      maxLength: [30, ' product name should be not more than 30 characters'],
      match: [
        /^[a-zA-Z0-9]+$/gi,
        'Product name can not have special characters',
      ],
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
            _id: false,
            value: { type: Number },
            date: { type: Date },
          },
        ],
        _id: false,
        default: [{ value: 0, date: Date.now() }],
      },
      SoilHumidity: {
        type: [
          {
            _id: false,
            value: { type: Number },
            date: { type: Date },
          },
        ],
        _id: false,
        default: [{ value: 0, date: Date.now() }],
      },
      pump: {
        type: [
          {
            _id: false,
            value: { type: Number, enum: [0, 1] },
            date: { type: Date },
          },
        ],
        _id: false,
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
