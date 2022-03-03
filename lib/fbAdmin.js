import * as firebaseAdmin from "firebase-admin";

const privateKey = JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY);
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;

// Initializes firebase-admin application if one is not already created.
// Prevents duplicate applications running
// Initializes firebase application if one is not already created.
// Prevents duplicate applications running
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey,
      clientEmail,
      projectId,
    }),
    databaseURL: `https://${projectId}.firebaseio.com`,
  });
}

export { firebaseAdmin };
