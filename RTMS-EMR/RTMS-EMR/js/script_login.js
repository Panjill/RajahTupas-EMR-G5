// Admin Login Authentication

//Default username: rtms-emr@gmail.com
//Default password: @123456

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, get, ref, set, update, child, remove } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
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

var submitBtn = document.getElementById("submitBtn");
//Patient Information to Firebase
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${month}/${day}/${year}`;

//Submit Patient to Firebase
if (submitBtn != null) {
    submitBtn.addEventListener('click', (e) => {

        var patientID = document.getElementById("patientID").value;
        var firstName = document.getElementById("firstName").value;
        var middleName = document.getElementById("middleName").value;
        var lastName = document.getElementById("lastName").value;
        var birthDate = document.getElementById("birthDate").value;
        var age = document.getElementById("age").value;
        var sex = document.getElementById("sex").value;
        var religion = document.getElementById("religion").value;
        var maritalStatus = null;

            if (document.getElementById('single').checked) {
                maritalStatus = document.getElementById('single').value;
            }
            else if (document.getElementById('married').checked) {
                maritalStatus = document.getElementById('married').value;
            }
            else if (document.getElementById('divorced').checked) {
                maritalStatus = document.getElementById('divorced').value;
            }
            else if (document.getElementById('separated').checked) {
                maritalStatus = document.getElementById('separated').value;
            }
            else if (document.getElementById('widowed').checked) {
                maritalStatus = document.getElementById('widowed').value;
            }

        var streetAddress = document.getElementById("streetAddress").value;
        var zipCode = document.getElementById("zipCode").value;
        var City = document.getElementById("city").value;
        var ProvinceState = document.getElementById("state-code").value;
        var Country = document.getElementById("country").value;
        var occupation = document.getElementById("occupation").value;
        var mobileNo = document.getElementById("mobileNo").value;
        var telephoneNo = document.getElementById("telephoneNo").value;

        if (patientID == "" || firstName == "" || middleName == "" || lastName == "" || birthDate == "" ||
            age == "" || sex == "" || religion == "" || country == "" || city == "" ||
            streetAddress == "" || zipCode == "" || occupation == "" || mobileNo == "") {

            alert("Please fill-up required information");
        }

        else {
            patientID = String(patientID).padStart(6,'0');

            set(ref(database, 'patient/' + patientID), {
                FirstName: firstName,
                MiddleName: middleName,
                LastName: lastName,
                PatientID: patientID,
                RegisteredDate: currentDate,
                BirthDate: birthDate,
                Age: age,
                Sex: sex,
                Religion: religion,
                MaritalStatus: maritalStatus,
                StreetAddress: streetAddress,
                ZipCode: zipCode,
                City: City,
                ProvinceState: ProvinceState,
                Country: Country,
                Occupation: occupation,
                MobileNumber: mobileNo,
                TelephoneNumber: telephoneNo
            });
            alert("Registered Successfully");
            window.location.href = "register-patient.html"
        }
    });     
}

//Create Patient Card to List
const patientCard = document.querySelector('.main-cards');

function createPatient([patientID, firstName, middleName, lastName, currentDate]){
    patientID = String(patientID).padStart(6,'0');
    let code = `
        <a id="" class="card w3-hover-shadow w3-animate-left" href="manage-patient.html?${patientID}">
            <div class="card-inner">
                <div class="card-container">
                    <img src="graphics/patient-icon.png" alt="Avatar" draggable="false" class="w3-left w3-circle picture-size">
                    <div>
                        <p id="nameValue">${firstName} ${middleName} ${lastName}</p>
                    </div>
                </div>
            </div>
            <div class="div-grid">
                <p id="idTag">ID:</p>
                <p id="idValue">${patientID}</p>
                <p id="dateRegistered">${currentDate}</p>
            </div>
        </a>
    `;
    if(patientCard != null)
    {
        patientCard.innerHTML += code;
    }
}

window.onload = getPatient();

function loadPatientList(thePatientList) {

    thePatientList.forEach(element => {
        let createCard = [element.PatientID, element.FirstName, element.MiddleName, element.LastName, element.RegisteredDate];
        createPatient(createCard);
    })
};

function getPatient() {
    const dbref = ref(database);

    get(child(dbref, "patient"))
    .then((snapshot)=>{
        var patientList = [];

        snapshot.forEach(childSnapshot => {
            patientList.push(childSnapshot.val());
        });

        loadPatientList(patientList);
    })
}

var managePatient = document.getElementById("updateBtn");
window.onload = getPatientManage();

function getPatientManage(){

    if(managePatient != null){
            var idVal = String(window.location);
            idVal = idVal.slice(-6);
            var patientID = document.getElementById("mpatientID");
            var firstName = document.getElementById("mfirstName");
            var middleName = document.getElementById("mmiddleName");
            var lastName = document.getElementById("mlastName");
            var birthDate = document.getElementById("mbirthDate");
            var age = document.getElementById("mage");
            var sex = document.getElementById("msex");
            var religion = document.getElementById("mreligion");
            var maritalStatus = null;
            var streetAddress = document.getElementById("mstreetAddress");
            var zipCode = document.getElementById("mzipCode");
            var City = document.getElementById("mCity");
            var ProvinceState = document.getElementById("mProvinceState");
            var getProvinceStateID = null;
            var Country = document.getElementById("mCountry");
            var getCountryID = null;
            var occupation = document.getElementById("moccupation");
            var mobileNo = document.getElementById("mmobileNo");
            var telephoneNo = document.getElementById("mtelephoneNo");

            const dbref = ref(database);

            get(child(dbref,"patient/"+ idVal)).then((snapshot)=>{
           
                if(snapshot.exists()){
                patientID.innerHTML = String(snapshot.val().PatientID).padStart(6,'0');
                firstName.value = snapshot.val().FirstName;
                middleName.value = snapshot.val().MiddleName;
                lastName.value = snapshot.val().LastName;
                birthDate.value = snapshot.val().BirthDate;
                age.value = snapshot.val().Age;
                sex.value = snapshot.val().Sex;
                religion.value = snapshot.val().Religion;
                if(snapshot.val().MaritalStatus == 'single')
                {
                    document.getElementById('msingle').checked = true;
                }
                else if(snapshot.val().MaritalStatus == 'married')
                {
                    document.getElementById('mmarried').checked = true;
                }
                else if(snapshot.val().MaritalStatus == 'divorced')
                {
                    document.getElementById('mdivorced').checked = true;
                }
                else if(snapshot.val().MaritalStatus == 'separated')
                {
                    document.getElementById('mseparated').checked = true;
                }
                else if(snapshot.val().MaritalStatus == 'widowed')
                {
                    document.getElementById('mwidowed').checked = true;
                }

                streetAddress.value = snapshot.val().StreetAddress;
                zipCode.value = snapshot.val().ZipCode;
                City.value = snapshot.val().City;
                getProvinceStateID = snapshot.val().ProvinceState;
                getCountryID = snapshot.val().Country;
                occupation.value = snapshot.val().Occupation;
                mobileNo.value = snapshot.val().MobileNumber;
                telephoneNo.value = snapshot.val().TelephoneNumber;

                
            }
            else{
                
                alert("No data found");
            }
        })
        .catch((error) => {
            alert("unsuccessful, error"+error);
        });
    }
}

/*
// get data
if (getData != null) {
    getData.addEventListener('click', (e) => {
        var patientID = document.getElementById('patientID').value;

        const starCountRef = ref(database, 'patient/' + patientID);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val(); // data = all data on firebse
            document.getElementById('email').value = data.email;
        });
    });
}
*/

// update data

// Create Announcement Board

const board = document.querySelector('.main-board');

window.onload = getBoard();

function loadBoard(theBoard) {

    theBoard.forEach(element => {
        let createBoard = [element.Subject, element.Body, element.DatePublished];
        showBoard(createBoard);
    })
};

function showBoard([subject, body, datePublished]){
    
    let code = `
    <div id="boardcontainer" class="board-container">
        <div class="board-page w3-animate-right w3-hover-shadow">
            <h4 id="subject"><strong>${subject}</strong>
            <a id="removeBoard" class="btnboard" href="#">
            <span class="material-icons-outlined">delete</span></a></h4>
            <p id="body">${body}</p><br>
            <p style="text-align: right; font-size: 14px;">Date Published:${datePublished}</p>
        </div>
    </div>
    `;
    if(board != null)
    {
        board.innerHTML += code;
    }
}

var boardcontainter = document.getElementById("removeBoard");

if(boardcontainter != null)
{
    boardcontainter.addEventListener('click', (e) => {
        alert("clicked");
        
    })
}


function getBoard() {
    const dbref = ref(database);

    get(child(dbref, "announcement"))
    .then((snapshot)=>{
        var theBoard = [];

        snapshot.forEach(childSnapshot => {
            theBoard.push(childSnapshot.val());
        });

        loadBoard(theBoard);
    })
}

var addBoard = document.getElementById("addBoard");

if(addBoard != null)
{
    addBoard.addEventListener('click', (e) => {
    addBoard.style.display = "none";
    document.getElementById("board-display").style.display = "block";
    });
}

var sendBoard = document.getElementById("sendBoard");

if (sendBoard != null) {
    sendBoard.addEventListener('click', (e) => {
        var boardSubject = document.getElementById("boardsubject").value;
        var boardBody = document.getElementById("boardbody").value;

        if(boardSubject == "" || boardBody == "") {
            alert("Missing Content");
        }
        else{
            set(ref(database, 'announcement/' + boardSubject), {
                Subject: boardSubject,
                Body: boardBody,
                DatePublished: currentDate
            });
        alert("Announcement Published");
        window.location.href = "homepage.html";
        addBoard.style.display = "inline-block";
        }
    });
};

var updateData = document.getElementById("updateBtn");

if (updateData != null) {
    updateData.addEventListener('click', (e) => {
  
        var patientID = document.getElementById("mpatientID").innerHTML;
        var firstName = document.getElementById("mfirstName").value;
        var middleName = document.getElementById("mmiddleName").value;
        var lastName = document.getElementById("mlastName").value;
        var birthDate = document.getElementById("mbirthDate").value;
        var age = document.getElementById("mage").value;
        var sex = document.getElementById("msex").value;
        var religion = document.getElementById("mreligion").value;
        var maritalStatus = null;

            if (document.getElementById('msingle').checked) {
                maritalStatus = document.getElementById('msingle').value;
            }
            else if (document.getElementById('mmarried').checked) {
                maritalStatus = document.getElementById('mmarried').value;
            }
            else if (document.getElementById('mdivorced').checked) {
                maritalStatus = document.getElementById('mdivorced').value;
            }
            else if (document.getElementById('mseparated').checked) {
                maritalStatus = document.getElementById('mseparated').value;
            }
            else if (document.getElementById('mwidowed').checked) {
                maritalStatus = document.getElementById('mwidowed').value;
            }

        var streetAddress = document.getElementById("mstreetAddress").value;
        var zipCode = document.getElementById("mzipCode").value;
        var City = document.getElementById("mCity").value;
        var ProvinceState = document.getElementById("mProvinceState").value;
        var Country = document.getElementById("mCountry").value;
        var occupation = document.getElementById("moccupation").value;
        var mobileNo = document.getElementById("mmobileNo").value;
        var telephoneNo = document.getElementById("mtelephoneNo").value;

        if (patientID == "" || firstName == "" || middleName == "" || lastName == "" || birthDate == "" ||
        age == "" || sex == "" || religion == "" || Country == "" || City == "" || ProvinceState == "" ||
        streetAddress == "" || zipCode == "" || occupation == "" || mobileNo == "") {

        alert("Please fill-up required information");
        }
        else {
            update(ref(database, 'patient/' + patientID), {
                FirstName: firstName,
                MiddleName: middleName,
                LastName: lastName,
                PatientID: patientID,
                RegisteredDate: currentDate,
                BirthDate: birthDate,
                Age: age,
                Sex: sex,
                Religion: religion,
                MaritalStatus: maritalStatus,
                StreetAddress: streetAddress,
                ZipCode: zipCode,
                City: City,
                ProvinceState: ProvinceState,
                Country: Country,
                Occupation: occupation,
                MobileNumber: mobileNo,
                TelephoneNumber: telephoneNo
            });
            alert('Patient Information Updated');
            window.location.href = "list-patient.html"
        }
    });
}

var removeData = document.getElementById("deleteBtn");

// remove data
if (removeData != null) {
    removeData.addEventListener('click', (e) => {
        var patientID = document.getElementById("mpatientID").innerHTML;
        if (patientID != null)
        {
            remove(ref(database, 'patient/' + patientID));
            alert('Patient Information Removed');
            window.location.href = "list-patient.html"
        }
        else
        {
            alert("Unsuccessful, please try again!");
        }
    });
}

//Patient Information to Firebase End

//Authorization Part

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
                update(ref(database, 'users/' + user.uid), {
                    last_login: currentDate,
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



