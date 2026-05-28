// ══════════════════════════════════════
// CONFIGURATION FIREBASE
// ══════════════════════════════════════

const firebaseConfig = {
  apiKey: "AIzaSyAVMqWbOiAgcSFcLcq2Ey8wAZBFG0R3Pb4",
  authDomain: "carte-rush-angers.firebaseapp.com",
  databaseURL: "https://carte-rush-angers-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "carte-rush-angers",
  storageBucket: "carte-rush-angers.firebasestorage.app",
  messagingSenderId: "801849970970",
  appId: "1:801849970970:web:0fd31fc626c93331ab9ca3",
  measurementId: "G-X8QVTBSQ1V"
};

// Initialiser Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const carteRef = db.ref('carte');

console.log('✅ Firebase initialisé avec succès');