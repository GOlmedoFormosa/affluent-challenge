const express = require('express');

const { get } = require('../../controllers/dates');
const asyncHanlder = require('../../middlewares/async-handler');

const router = express.Router();

router.get('/', asyncHanlder( async(req, res, next) => {
    const dates = await get();
    res.send({ data: { dates }});
  })
);

module.exports = router;