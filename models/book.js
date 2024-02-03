const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const bookSchema = new Schema({
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Reference to the User model
    sellCount: { type: Number },
    title: { type: String, unique: true },
    description: { type: String },
    price: { type: Number, min: 100, max: 1000 },
    slug:{type:String}
});



bookSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});
module.exports = mongoose.model('Book', bookSchema);