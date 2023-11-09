const firebaseConfig = {
  apiKey: "AIzaSyDvpi9dhfXxJzhnoOVbOJ31TuB5hR4JC6U",
  authDomain: "dailysunsetwalk.firebaseapp.com",
  projectId: "dailysunsetwalk",
  storageBucket: "dailysunsetwalk.appspot.com",
  messagingSenderId: "398182461809",
  appId: "1:398182461809:web:8946039f7e0ca2f12746d0",
  measurementId: "G-YNH1GZB14N"
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return firebaseConfig;
  }
}