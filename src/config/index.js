import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebaseConfig } from "../../firebase-config.js";

const firebaseApp = initializeApp(getFirebaseConfig());
const analytics = getAnalytics(app);