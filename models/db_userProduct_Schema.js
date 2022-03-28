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
      light: [
        {
          value: { type: Number, default: 0 },
          date: { type: Date, default: Date.now },
        },
      ],
      SoilHumidity: [
        {
          value: { type: Number, default: 0 },
          date: { type: Date, default: Date.now },
        },
      ],
      pump: [
        {
          value: { type: Number, enum: [0, 1], default: 0 },
          date: { type: Date, default: Date.now },
        },
      ],
    },
    settings: {
      light: {
        minValue: { type: Number, default: 0 },
        startOn: [
          {
            hours: {
              type: Number,
              required: true,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              required: true,
              min: 0,
              max: 59,
            },
            seconds: {
              type: Number,
              required: true,
              min: 0,
              max: 59,
            },
          },
        ],
        startOff: [
          {
            hours: {
              type: Number,
              required: true,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              required: true,
              min: 0,
              max: 59,
            },
            seconds: {
              type: Number,
              required: true,
              min: 0,
              max: 59,
            },
          },
        ],
      },
      SoilHumidity: {
        minValue: { type: Number, default: 0 },
      },
      pump: {
        period: { type: Number, min: 0, default: 24 }, // in hours
        runTime: { type: Number, min: 1, default: 1 }, //in seconds
      },
    },
  },
  { collection: 'User_Product' }
);
const User_Product = mongoose.model('User_Product', productSchema);

module.exports = User_Product;
