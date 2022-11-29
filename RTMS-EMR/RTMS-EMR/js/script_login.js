// Admin Login Authentication

//Default username: rtms-emr@gmail.com
//Default password: @123456

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Initialize Firebase

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDX93EmBiVDaxrX2CGR2lVSuMOEGbR4iOw",
    authDomain: "medms-8c37b.firebaseapp.com",
    databaseURL: "https://medms-8c37b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "medms-8c37b",
    storageBucket: "medms-8c37b.appspot.com",
    messagingSenderId: "1009953914713",
    appId: "1:1009953914713:web:63b81d4b706f8d04719648"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const user = auth.currentUser;

var login = document.getElementById("login");
var logout = document.getElementById("logout");

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

    } else {
        // User is signed out
    }
});

if (logout != null) {
    logout.addEventListener('click', (e) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            alert('User has logged out!');
            window.location.href = "login.html";
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
        });
    });
}

if (login != null) {
    login.addEventListener('click', (e) => {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const dt = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: dt,
                })
                alert('Login Success');
                window.location.href = "homepage.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage);
            });
    });
}



