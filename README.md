
## Node.js API for User Registration, Authentication, and Game Data with RabbitMQ Event Processing
This Node.js API project provides user registration, authentication, and game data management using Express, MySQL, MongoDB, and RabbitMQ for event processing.

#### Table of Contents
* Features
* Prerequisites
* Getting Started
* Installation
* Configuration
* Database Setup
* RabbitMQ Setup
### Usage
* User Registration and Authentication
* Game Data API
* RabbitMQ Event Processing
* User registration with securely hashed passwords.
* JWT-based authentication.
* MongoDB for game data storage.
* CRUD operations for game data.
* RabbitMQ event processing for user registration events.
* Error handling and request validation.
* Separation of routes, controllers, and services.
### Prerequisites
##### Before you begin, ensure you have met the following requirements:

* Node.js and npm installed.
* MySQL database server.
* MongoDB server.
* RabbitMQ server

### Getting Started
* Installation
* Clone the repository:

        git clone https://bitbucket.org/backenddev404/tfg_task.git
        cd tfg_task
### Install dependencies:
            npm install
### Configuration
Create a .env file in the project root and configure the following environment variables:

# MySQL database configuration
     DB_HOST=your_mysql_host
     DB_PORT=your_mysql_port
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_NAME=your_mysql_database

# MongoDB configuration
    MONGO_URI=your_mongodb_connection_uri

# RabbitMQ configuration
    RABBITMQ_URL=your_rabbitmq_connection_url
    
# JWT configuration
     JWT_KEY=secret_key
# Database Setup
### Create a MySQL database.
### RabbitMQ Setup
* Ensure RabbitMQ is installed and running.
* Configure RabbitMQ with the appropriate settings in your .env file.
# Usage
* User Registration and Authentication
* Register a user by making a POST request to /api/v1/user/register.
* Authenticate a user by making a POST request to /api/v1/user/login to receive a JWT token.
* Game Data API
* Create, retrieve, update, and delete game data using the relevant API endpoints.
* RabbitMQ Event Processing
* The RabbitMQ event publisher sends a message whenever a user registers.
* The event subscriber listens for events and logs them in a file.

#  Happy Coding  ):

