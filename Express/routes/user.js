const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send(200);
})
router.get('/users', (req, res) => {
    res.status(200).send(users);
})
module.exports = router;