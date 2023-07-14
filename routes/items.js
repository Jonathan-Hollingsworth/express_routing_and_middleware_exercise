const express = require('express')
const items = require('../fakeDb')
const ExpressError = require('../errors')
const router = new express.Router()

router.get("/", function(req, res, next){
    try {
        return res.json(items);
    } catch (error) {
        return next(error);
    }
});

router.post("/", function(req, res, next){
    try {
        const newItem = req.body
        if(!newItem.name || !newItem.price){
            throw new ExpressError("New item is missing required information", 400)
        }
        if(items.find(i => i.name === newItem.name)) {
            throw new ExpressError("New item cannot share a name with a current one", 400);
        }
        items.push(newItem)
        return res.json({"added":newItem});
    } catch (error) {
        return next(error);
    }
});

router.get("/:name", function(req, res, next){
    try {
        const item = items.find(i => i.name === req.params.name);
        if (!item) {
            throw new ExpressError("Item not found", 404)
        }
        return res.json(item);
    } catch (error) {
        return next(error);
    }
});

router.patch("/:name", function(req, res, next){
    try {
        const update = req.body
        if(!update.name || !update.price){
            throw new ExpressError("Update requires both a name and a price", 400)
        }
        const item = items.find(i => i.name === req.params.name);
        if (!item) {
            throw new ExpressError("Item not found", 404)
        }
        item.name = update.name
        item.price = update.price
        return res.json({"updated":item});
    } catch (error) {
        return next(error);
    }
});

router.delete("/:name", function(req, res, next) {
    try {
        const item = items.find(i => i.name === req.params.name);
        if (!item) {
            throw new ExpressError("Item not found", 404)
        }
        const idx = items.findIndex(i => i === item);
        items.splice(idx, 1);
        return res.json({ message: "Deleted" });
    } catch (error) {
        return next(error);
    }
});

module.exports = router