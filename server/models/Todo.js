const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
    todo: { type: String, required: true }
});

module.exports = mongoose.model("Todo", TodoListSchema);