import admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require('./firebase-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export default admin;