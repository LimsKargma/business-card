import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://tomsdb-fb622-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const usersInDB = ref(database, "users")

//login
const usernameInput = document.getElementById("username-input")
const passwortInput = document.getElementById("passwort-input")
const loginBtn = document.getElementById("login-btn")

loginBtn.addEventListener("click", function () {
    let username = usernameInput.value
    let passwort = passwortInput.value
    
    onValue(usersInDB, function (snapshot) {
        let loginData = Object.values(snapshot.val())
        let keysData = Object.keys(snapshot.val())
        console.log(loginData.length)
        passwortCorrect(username, passwort, loginData, keysData)
    })
})

function passwortCorrect(username, passwort, loginArr, keysDataArr) {
    for (let i = 0; i < loginArr.length; i++) {
        if (username === loginArr[i].username && passwort === loginArr[i].passwort) {
            console.log("Logged in")
            localStorage.clear()
            localStorage.setItem("token", keysDataArr[i])
            window.location.href = "home.html"
        }
    }
}
