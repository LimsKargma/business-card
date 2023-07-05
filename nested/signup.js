import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://tomsdb-fb622-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const usersInDB = ref(database, "users")

//signup
const usernameSignupInput = document.getElementById("username-signup-input")
const passwortSignupInput = document.getElementById("passwort-signup-input")
const passwortSignup2Input = document.getElementById("passwort-signup2-input")
const signupBtn = document.getElementById("signup-btn")

signupBtn.addEventListener("click", function () {
    let username = usernameSignupInput.value
    let passwort = passwortSignupInput.value
    let passwort2 = passwortSignup2Input.value

    onValue(usersInDB, function (snapshot) {
        if(snapshot.exists()) {
            let loginData = Object.values(snapshot.val())

            if (usernameInDB(username, loginData)) {
                if (passwortValid(passwort, passwort2)) {
                    let usersData = {
                        username: username,
                        passwort: passwort,
                        todos: ""
                    }
                    push(usersInDB, usersData)
                    clearInputFields()
                    console.log("User added")
                }
            }
        } else {
            if (passwortValid(passwort, passwort2)) {
                let usersData = {
                    username: username,
                    passwort: passwort,
                }
                push(usersInDB, usersData)
                clearInputFields()
                console.log("User added")
            }
        }
    })
    console.log("hi")
})

function usernameInDB(username, loginDataArr) {
    let safe = 0;
    for (let i = 0; i < loginDataArr.length; i++) {
        if (username === loginDataArr[i].username) {
            safe += 1
        }
    }
    if (safe == 0) {
        return true
    } else {
        return false
    }
}

function passwortValid(passwort, passwort2) {
    if (passwort == passwort2) {
        return true
    } else {
        return false
    }
}

function clearInputFields() {
    usernameSignupInput.value = ""
    passwortSignupInput.value = ""
    passwortSignup2Input.value = ""
}