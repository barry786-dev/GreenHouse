const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create product schema

const productSchema = new Schema(
  {
    productName: {
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
    productDescription: {
      type: String,
      minLength: [
        10,
        `product description must be more than 9 characters, you entered only: ${
          'VALUE'.length
        }`,
      ],
      maxLength: [
        200,
        'product description should be not more than 200 characters',
      ],
      default: 'No Description',
    },
    userId: {
      type: String,
      default: 'null',
    },
  },
  { collection: 'Products' }
);
const Products = mongoose.model('products', productSchema);

module.exports = Products;
