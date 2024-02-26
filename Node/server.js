const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors()); // To solve the cors error while running the server & client is running local-machine
// require('./startup/db')();  // Connect mongo Db
// require('./startup/sqldb')();  // To connect SQL DB
require('./startup/routes')(app);  // to initialize the routes

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`))