const express = require('express');

const asyncHanlder = require('../../middlewares/async-handler');
const { get } = require('../../controllers/users');

const router = express.Router();

router.get('/', asyncHanlder(async (req, res, next) => {
    const users = await get();
    res.send({ data: { users }});
  })
);

module.exports = router;