const Todo = require('../models/Todo');

const create = async (todo) => {
    try {
        const result = await Todo.create({ todo });
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const retrieve = async () => {
    try {
        const results = await Todo.find().select('-__v');
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const update = async (_id, obj) => {
    try {
        const result = await Todo.findByIdAndUpdate(_id, { $set: obj }, { new: true });
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const remove = async (_id) => {
    try {
        const result = await Todo.findByIdAndDelete(_id);
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const removeAll = async () => {
    try {
        const result = await Todo.deleteMany({});
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = { create, retrieve, update, remove, removeAll }