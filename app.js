//required module
const express = require('express');
const logger = require('morgan')
const mongoConnection = require('./db_connections/monogDb')
app = express();
app.use(logger('dev'));

app.use(express.json());


// mongoConnection
mongoConnection()
helper = require('./helper/helper');
require('./routes/mainRoutes')(app);
const PORT = process.env.SERVER_PORT || 3000


app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)

})

