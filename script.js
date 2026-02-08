// ===== INITIALIZE STORAGE =====
if (localStorage.getItem("users") === null) {
  localStorage.setItem("users", ""); // empty string if no users
}

// ===== CHECK SESSION =====
function checkSession() {
  let currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    showDashboard(currentUser);
  } else {
    showLogin();
  }
}

// ===== UI CONTROL FUNCTIONS =====
function showLogin() {
  document.getElementById("login-box").style.display = "block";
  document.getElementById("signup-box").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
}

function showSignup() {
  document.getElementById("login-box").style.display = "none";
  document.getElementById("signup-box").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

function showDashboard(email) {
  document.getElementById("login-box").style.display = "none";
  document.getElementById("signup-box").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("user-name").innerText = email;
}

// ===== SIGNUP FUNCTION =====
function signup() {
  let email = document.getElementById("signup-email").value.trim();
  let password = document.getElementById("signup-password").value.trim();

  if (email === "" || password === "") {
    alert("Please fill all fields!");
    return;
  }

  let usersText = localStorage.getItem("users");
  let users = usersText ? usersText.split(",") : [];

  // Check if user already exists
  for (let i = 0; i < users.length; i++) {
    let data = users[i].split("|");
    if (data[0] === email) {
      alert("User already exists!");
      return;
    }
  }

  // Add new user
  users.push(email + "|" + password);
  localStorage.setItem("users", users.join(","));

  alert("Signup successful! Please login.");
  showLogin();
}

// ===== LOGIN FUNCTION =====
function login() {
  let email = document.getElementById("login-email").value.trim();
  let password = document.getElementById("login-password").value.trim();

  if (email === "" || password === "") {
    alert("Please fill all fields!");
    return;
  }

  let usersText = localStorage.getItem("users");
  let users = usersText ? usersText.split(",") : [];
  let found = false;

  for (let i = 0; i < users.length; i++) {
    let data = users[i].split("|");
    if (data[0] === email && data[1] === password) {
      found = true;
      break;
    }
  }

  if (found) {
    localStorage.setItem("currentUser", email);
    showDashboard(email);
  } else {
    alert("Invalid Email or Password!");
  }
}

// ===== LOGOUT FUNCTION =====
function logout() {
  localStorage.removeItem("currentUser");
  showLogin();
}

// ===== CALL CHECK SESSION ON PAGE LOAD =====
window.onload = checkSession;

