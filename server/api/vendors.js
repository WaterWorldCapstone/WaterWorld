const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const {Vendor} = require('../db/models');
module.exports = router;

router.get('/', asyncHandler(async(req, res) => {
    const vendors = await Vendor.findAll();
    res.json(vendors);
}));

router.get('/:id', asyncHandler(async(req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    res.json(vendor);
}));

router.post('/', asyncHandler(async(req, res) => {
    const vendor = await Vendor.create(req.body);
    res.json(vendor);
}));

router.put('/:id',  asyncHandler(async(req, res) => {
    const [, vendor] = await Vendor.update(req.body, {
         where: {
            id: req.params.id
        },
        returning: true,
    });
    res.json(vendor);
}));

router.delete('/:id', asyncHandler(async(req, res) => {
    await Vendor.destroy({where: {
        id: req.params.id
    }});
    res.send(req.params.id);
}));
