const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseHistorySchema = new Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    purchaseDate: { type: Date },
    price: { type: Number },
    quantity: { type: Number },
});

module.exports = mongoose.model('PurchaseHistory', PurchaseHistorySchema);