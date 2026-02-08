//  CREATE STORAGE IF NOT EXIST
let usersData = localStorage.getItem("users");

if (usersData == null)
{
    localStorage.setItem("users", "");
}
// CHECK LOGIN SESSION
function checkSession()
{
    let savedUser = localStorage.getItem("currentUser");

    if (savedUser == null)
    {
        showLogin();
    }
    else
    {
        if (savedUser == "")
        {
            showLogin();
        }
        else
        {
            showDashboard(savedUser);
        }
    }
}
//  SHOW DIFFERENT SCREENS
function showLogin()
{
    document.getElementById("login-box").style.display = "block";
    document.getElementById("signup-box").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
}

function showSignup()
{
    document.getElementById("login-box").style.display = "none";
    document.getElementById("signup-box").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

function showDashboard(email)
{
    document.getElementById("login-box").style.display = "none";
    document.getElementById("signup-box").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("user-name").innerText = email;
}
// SIGNUP

function signup()
{
    let emailInput = document.getElementById("signup-email").value;
    let passwordInput = document.getElementById("signup-password").value;

    if (emailInput == "")
    {
        alert("Enter Email");
        return;
    }

    if (passwordInput == "")
    {
        alert("Enter Password");
        return;
    }

    // get stored users
    let storedText = localStorage.getItem("users");

    let usersList; // yaha se array create kar rha hu

    if (storedText == "")
    {
        usersList = [];
    }
    else
    {
        usersList = storedText.split(","); // using the in built fuction 
    }

    // check duplicate
    let alreadyExists = false;

    for (let i = 0; i < usersList.length; i++)
    {
        let singleRecord = usersList[i];

        let parts = singleRecord.split("|");

        let savedEmail = parts[0];

        if (savedEmail == emailInput)
        {
            alreadyExists = true;
        }
    }

    if (alreadyExists == true)
    {
        alert("User already registered . Please Login ! ");
        return;
    }

    // add new user
    let newRecord = emailInput + "|" + passwordInput;

    usersList.push(newRecord);

    let finalData = usersList.join(",");

    localStorage.setItem("users", finalData);

    alert("Signup successful");
    showLogin();
}
//  LOGIN
function login()
{
    let loginEmail = document.getElementById("login-email").value;
    let loginPassword = document.getElementById("login-password").value;

    

    if (loginEmail == "")
    {
        alert("Enter Email");
        return;
    }

    if (loginPassword == "")
    {
        alert("Enter Password");
        return;
    }

    let storedText = localStorage.getItem("users");

    let usersList;

    if (storedText == "")
    {
        usersList = [];
    }
    else
    {
        usersList = storedText.split(",");
    }

    let loginSuccess = false;

    for (let i = 0; i < usersList.length; i++)
    {
        let singleRecord = usersList[i];

        let parts = singleRecord.split("|");

        let savedEmail = parts[0];
        let savedPassword = parts[1];

        if (savedEmail == loginEmail)
        {
            if (savedPassword == loginPassword)
            {
                loginSuccess = true;
            }
        }
    }

    if (loginSuccess == true)
    {
        localStorage.setItem("currentUser", loginEmail);
        showDashboard(loginEmail);
    }
    else
    {
        alert("Wrong email or password");
    }
}
// LOGOUT
function logout()
{
    localStorage.removeItem("currentUser");
    showLogin();
}


// ==========================
// STEP 7 : RUN WHEN PAGE LOADS
// ==========================

window.onload = function ()
{
    checkSession();
};



