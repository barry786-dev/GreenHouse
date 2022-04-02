const {
  addUserProductData,
} = require('../controllers/db_userProduct_Handlers');

const postData = async (req, res) => {
  console.log(req.body);
  try {
    const result = await addUserProductData(req.body);
    console.log('this is the result', result);
    if (result) {
      res.json({ message: 'done' });
    } else {
      console.log('a device  trying to write but its serial number is not exist in user product');
      res.json({ message: 'error' });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { postData };
