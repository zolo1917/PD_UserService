// import serviceAccount from "../../firebase-admin.json";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getLogger } from "./config";

let app;
let firebaseDb: any;
const logger = getLogger();
export const initializieFirebaseApp = (serviceAccount: any) => {
  try {
    logger.info("initializing firestore");
    app = initializeApp({
      credential: cert(<ServiceAccount>serviceAccount),
      projectId: "my-test-apps-424418",
    });
    logger.info("Initialization complete");
    firebaseDb = getFirestore(app, "firestore-base");
    return app;
  } catch (err) {
    logger.info(err);
  }
};
export const getFirestoreInstance = () => firebaseDb;
export const updateDataInDB = async () => {
  const userRef = firebaseDb.collection("Users");
  await userRef
    .doc("test1")
    .set({
      name: "test",
      password: "test",
      createdDate: new Date(),
    })
    .then((resp: any) => {
      logger.info(resp);
    });
};
