const PurchaseHistory = require("../models/PurchaseHistory");
const Book = require('../models/book')
const { sendPurchaseEmail, sendRevenueEmail } = require('../helper/mailService');

module.exports = {
    purchaseHistory: async (req, res) => {
        try {
            const { bookId, quantity } = req.body;
            let userId = req.user.id

            // Fetch book details to calculate the total price
            const book = await Book.findById({_id:bookId});
            if (!book) return res.status(404).json({ message: 'Book not found' });

            const totalPrice = book.price * quantity;

            // Create a new purchase record
            const purchaseObj = {
                purchaseId: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${Date.now()}`,
                bookId,
                userId,
                purchaseDate: new Date(),
                price: totalPrice,
                quantity,
            };

            // Update sellCount for the purchased book
            await Book.findByIdAndUpdate(bookId, { $inc: { sellCount: quantity } });

            // Save the purchase record
            await PurchaseHistory.create(purchaseObj);

            // Send purchase confirmation email to the user
            const userEmail = req.user.email;
            const purchaseEmailSubject = 'Purchase Confirmation';
            const purchaseEmailText = `Thank you for your purchase of ${quantity} ${book.title}(s). Your total is $${totalPrice}.`;

            sendPurchaseEmail(userEmail, purchaseEmailSubject, purchaseEmailText);

            // Notify authors about the purchase
            const authorEmails = book.authors.map(authorId => authorId.email);
            const revenueEmailSubject = 'New Purchase Notification';
            const revenueEmailText = `Your book "${book.title}" has been purchased!`
                + `\n\nRevenue Details:`
                + `\n- Purchase Date: ${new Date().toLocaleDateString()}`
                + `\n- Book Title: ${book.title}`
                + `\n- Quantity Sold: ${quantity}`
                + `\n- Total Revenue: $${totalPrice}`;

            sendRevenueEmail(authorEmails, revenueEmailSubject, revenueEmailText);

            return res.json(
                helper.showSuccessResponse("Book buy successFully")
            );

        } catch (error) {
            console.log(error);
            return res.json(
                helper.showInternalServerErrorResponse("Internal server error")
            );
        }

    },

    listPurchageHistory: async (req, res) => {
        try {
            let user = req.user.id

            const purchaseHistory = await PurchaseHistory.find({ userId: user }).populate('bookId');

            return res.json(
                helper.showSuccessResponse("purchase history list", purchaseHistory)
            );


        } catch (error) {
            return res.json(
                helper.showInternalServerErrorResponse("Internal server error")
            );

        }

    },

    viewPurchaseDetails: async (req, res) => {
        try {
            let user = req.user.id
            let purchageId = req.params.purchaseId

            const purchaseHistory = await PurchaseHistory.findOne({ userId: user, _id: purchageId }).populate('bookId');

            return res.json(
                helper.showSuccessResponse("Purchase history details", purchaseHistory)
            );


        } catch (error) {
            return res.json(
                helper.showInternalServerErrorResponse("Internal server error")
            );

        }

    }
};
