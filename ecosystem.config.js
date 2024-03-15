module.exports = {
    apps: [
        {
            name: 'CRM test',
            script: './src/server.js',
            env: {
                NODE_ENV: 'production',
                PORT: 8080,
                MONGODB_CONNECTION_STRING:
                    'mongodb://127.0.0.1:27017/crm_database',
                JWT_SECRET: 'thanhnam2001',
                END_POINT_ADMIN: 'create-account-admin/thanhnam'
            }
        }
    ]
};
