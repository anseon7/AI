// Firebase 구성
const firebaseConfig = {
    apiKey: "AIzaSyCEZ-xj8y3bAQ3Zio5YPiYdZaC_QaXWLaE",
    authDomain: "anseon-9290d.firebaseapp.com",
    projectId: "anseon-9290d",
    storageBucket: "anseon-9290d.firebasestorage.app",
    messagingSenderId: "535053222594",
    appId: "1:535053222594:web:aaa38ab697c5408126f15b",
    measurementId: "G-SPJ64HKB4C"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firestore 데이터베이스 초기화
const db = firebase.firestore();

// 타임스탬프 설정 활성화
db.settings({ timestampsInSnapshots: true });

// Firebase Authentication 초기화
const auth = firebase.auth(); 