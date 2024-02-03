const bookModel = require("../models/book");
const User = require('../models/user')
module.exports = {
  add: async (req, res) => {
    try {
      const data = req.body;
      console.log(data, 'data=>');
      // Ensure authors are valid user IDs
      const isValidAuthors = await User.find({ _id: { $in: data.authors } }).countDocuments() === data.authors.length;
      if (!isValidAuthors) {
        return res.status(400).json({ message: 'Invalid author IDs' });
      }

      bookModel
        .create(data)
        .then((resdata) => {
          return res.json(helper.createResponse("Book added", resdata));
        })
        .catch((err) => {
          console.log(err);
          return res.json(
            helper.showDatabaseErrorResponse("Internal db error")
          );
        });
    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },
  update: async (req, res) => {
    try {
      let data = req.body;
      let bookId = req.params.bookId

      bookModel
        .findOneAndUpdate(
          { _id: bookId },
          data,
          { new: true }
        )
        .then((resdata) => {
          return res.json(
            helper.showSuccessResponse("Book updated")
          );
        })
        .catch((err) => {
          return res.json(
            helper.showDatabaseErrorResponse("Internal db error")
          );
        });
    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },
  list: async (req, res) => {
    try {
      var perPage = req.params.perPage || 10;
      var page = Math.max(0, req.params.page || 0);
      let filter = {}
      const { title, minPrice, maxPrice } = req.query;

      if (title || minPrice || maxPrice) {
        filter = {
          title: { $regex: new RegExp(title, 'i') },
          price: { $gte: minPrice || 0, $lte: maxPrice || 1000 }
        };
      }

      bookModel
        .find(filter)
        .populate('authors')
        .limit(perPage)
        .skip(perPage * page)
        .sort({ _id: -1 })

        .then((resdata) => {
          return res.json(
            helper.showSuccessResponse("Book List", resdata)
          );
        })
        .catch((err) => {
          console.log(err, 'err');
          return res.json(
            helper.showDatabaseErrorResponse("Internal db error")
          );
        });
    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },
  remove: async (req, res) => {
    try {
      let bookId = req.params.bookId

      bookModel
        .deleteOne({ _id: bookId })
        .then((resdata) => {
          return res.json(helper.showSuccessResponse("Book removed", {}));
        })
        .catch((err) => {
          return res.json(
            helper.showDatabaseErrorResponse("Internal db error")
          );
        });
    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },
  view: async (req, res) => {
    try {
      let bookId = req.params.bookId;

      bookModel
        .findOne({ _id: bookId }).populate('authors')
        .then((resdata) => {
          return res.json(
            helper.showSuccessResponse("Book details details", resdata)
          );
        })
        .catch((err) => {
          return res.json(
            helper.showDatabaseErrorResponse("Internal db error")
          );
        });
    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },
};
