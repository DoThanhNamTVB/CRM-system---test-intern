const customerRouter = require('./customerRoute');
const productRouter = require('./productRoute');
const customer_productRouter = require('./customer_productRoute');
const adminRouter = require('./adminRoute');
const { isAuthentication } = require('../middlware/authentication');
const initRoutes = (app) => {
    // app.use('/api', isAuthentication);

    app.use('/api/customers', isAuthentication, customerRouter);
    app.use('/api/products', isAuthentication, productRouter);
    app.use('/api/customer-products', isAuthentication, customer_productRouter);
    app.use('/api/user', adminRouter);
};

module.exports = initRoutes;
