# Book Store Application - Backend

This repository contains the backend implementation for a Book Store Application. The application focuses on user management, book management, purchase history, and revenue tracking for authors.

## Logic for Computing sellCount

The `sellCount` is computed dynamically based on the purchase history. Whenever a user makes a purchase, the `sellCount` for the corresponding book is incremented by the quantity purchased. This logic ensures an accurate count of the number of copies sold for each book.

## Mechanism for Sending Email Notifications

The application utilizes the Node.js `nodemailer` library for sending email notifications. Two types of email notifications are implemented:

1. **Purchase Confirmation Email to Users:**
   - Sent to users after a successful purchase.
   - Includes details such as the purchased book title, quantity, and total price.

2. **Revenue Notification Email to Authors:**
   - Sent to authors whenever one of their books is purchased.
   - Includes details like the purchase date, book title, quantity sold, and total revenue generated.

Email notifications are sent asynchronously using background jobs or message queues to avoid blocking the main application thread. This ensures a responsive user experience even during email processing.

## Database Design and Implementation Choices

### User Management:

- User authentication and authorization are implemented using JWT (JSON Web Tokens).
- Different roles are assigned to users (Author, Admin, Retail User) for varying levels of access.

### Book Management:

- MongoDB is used as the database, and Mongoose is used as the ODM (Object-Document Mapper).
- The `Book` model includes a `sellCount` field, computed dynamically based on the purchase history.

### Purchase History:

- Purchase records are stored in the database using the `PurchaseHistory` model.
- Unique purchase IDs follow the format {{YEAR}}-{{MONTH}}-{{numeric increment id}}.
- Proper synchronization is implemented to handle race conditions during purchase creation.

### Revenue Tracking:

- Authors' revenue is tracked by summing the prices of their books sold.
- Email notifications are sent to authors with revenue details (current month, current year, total revenue).

### Additional Features:

- Search and filtering options for books based on title and price.
- Secure payment processing for book purchases.
- Email notifications for new book releases, with a limit of 100 emails per minute to handle rate conditions.

## Usage

To run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Sanjay2000/book-store.git`
2. Install dependencies: `npm install`
3. Set up environment variables (e.g., MongoDB URI, email service credentials).
4. Start the server: `npm start`

