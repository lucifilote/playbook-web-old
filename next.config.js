require('dotenv').config();

module.exports = {
    env: {
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        DATABASE_URL: process.env.DATABASE_URL,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        TYPE: process.env.TYPE,
        PRIVATE_KEY_ID: process.env.PRIVATE_KEY_ID,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        CLIENT_EMAIL: process.env.CLIENT_EMAIL,
        CLIENT_ID: process.env.CLIENT_ID,
        AUTH_URI: process.env.AUTH_URI,
        TOKEN_URI: process.env.TOKEN_URI,
        AUTH_PROVIDER_X509_CERT_URL: process.env.AUTH_PROVIDER_X509_CERT_URL,
        CLIENT_X509_CERT_URL: process.env.CLIENT_EMAIL
    },
}