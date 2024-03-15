const express = require('express');
const app = express();
require('dotenv').config();
const { connectDB } = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middlware/errorHandler');
const initRoutes = require('./routes/index');
const port = process.env.PORT;

//middleware express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware http logger
app.use(morgan('dev'));

//middleware cors
app.use(cors());

// connect database
connectDB();

// // Admin-bro
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');
AdminBro.registerAdapter(AdminBroMongoose);

//Model
const customer = require('./models/customer');
const product = require('./models/product');
const customer_product = require('./models/customer_product');
const admin = require('./models/admin');

const run = async () => {
    const mongooseDb = await mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING
    );

    const AdminBroOtions = {
        databases: [mongooseDb],
        resources: [customer, product, customer_product, admin],
        rootPath: '/admin'
    };
    const adminBro = new AdminBro(AdminBroOtions);
    const router = AdminBroExpress.buildRouter(adminBro);
    app.use(adminBro.options.rootPath, router);
};

// api end-point
app.get('/', (req, res) => {
    res.send('Make by DoThanhNamTVB - thanhnamtvb@gmail.com');
});
initRoutes(app);

// middleware error handler
// app.use(notFound);
app.use(errorHandler);
//listen server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

run();
