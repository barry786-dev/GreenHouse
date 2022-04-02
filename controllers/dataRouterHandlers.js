const postData = (req, res) => {
  console.log(req.body);
  
  res.json({ message: 'done' });
};

module.exports = { postData };
