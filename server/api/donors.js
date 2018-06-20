const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const {Donor} = require('../db/models');
module.exports = router;

router.get('/', asyncHandler(async(req, res) => {
    const donors = await Donor.findAll();
    res.json(donors);
}));

router.get('/:id', asyncHandler(async(req, res) => {
    const donor = await Donor.findById(req.params.id);
    res.json(donor);
}));

router.post('/', asyncHandler(async(req, res) => {
    const donor = await Donor.create(req.body);
    res.json(donor);
}));

router.put('/:id',  asyncHandler(async(req, res) => {
    const [, donor] = await Donor.update(req.body, {
         where: {
            id: req.params.id
        },
        returning: true,
    });
    res.json(donor);
}));

router.delete('/:id', asyncHandler(async(req, res) => {
    await Donor.destroy({where: {
        id: req.params.id
    }});
    res.send(req.params.id);
}));
