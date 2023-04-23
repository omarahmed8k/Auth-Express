const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const specs = require("./src/helpers/swaggerOptions");
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Routes
app.use("/lists", require('./src/routes/lists'));
app.use("/user", require('./src/routes/user'));
app.use(require('./src/routes/auth'));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});