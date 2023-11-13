import "server-only";
import admin from "firebase-admin";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
  databaseURL: string;
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  if (admin.apps.length > 0) {
    return admin.app();
  }
 
  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey: params.privateKey,
  });
 
  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
    databaseURL: params.databaseURL,
  });
}
 
export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
    databaseURL: process.env.FIREBASE_DATABASE_URL as string,
  };
 
  return createFirebaseAdminApp(params);
}




