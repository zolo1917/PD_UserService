// import serviceAccount from "../../firebase-admin.json";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app;
let firebaseDb: any;
export const initializieFirebaseApp = (serviceAccount: any) => {
  try {
    console.log("initializing firestore");
    app = initializeApp({
      credential: cert(<ServiceAccount>serviceAccount),
      projectId: "my-test-apps-424418",
    });
    console.log("Initialization complete");
    firebaseDb = getFirestore(app, "firestore-base");
    return app;
  } catch (err) {
    console.log(err);
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
      console.log(resp);
    });
};
