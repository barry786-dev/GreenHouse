const { log } = require('console');
const { mongoose } = require('mongoose');
const Products = require('../models/db_productSchema');
const Users = require('../models/db_userSchema');
const User_Product = require('../models/db_userProduct_Schema');
const { ghDbConnect } = require('../models/db_mongo');

/**
 *
 * @param {String} collectionModelName pass it as String
 * @param  {...any} searchConditions pass object as {key:value}, each object has one search parameter
 * * separate each object with comma
 * @returns {Promise<Object>}
 *  a promise resolve an object with the founded document or empty object if not found
 */
async function checkDocument(collectionModelName, ...searchConditions) {
  const searchObj = searchConditions.reduce((obj, item) => {
    const key = Object.keys(item);
    return { ...obj, [key]: item[key] };
  });
  try {
    await ghDbConnect();
    const result = await eval(collectionModelName).findOne(searchObj);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = { checkDocument };
