const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

const loginForm = document.getElementById("logInForm");
const loginUserName = document.getElementById("username");
const loginPassWord = document.getElementById("userpassword");
const loginMessage = document.getElementById("message1");
loginMessage.innerHTML = "";

let users = JSON.parse(localStorage.getItem('users')) || [];

loginForm.addEventListener("submit", login);

function login(event) {
    event.preventDefault();
    const userNameValue = loginUserName.value;
    const userPasswordValue = loginPassWord.value;
    const userExists = users.find(user => user.userName === userNameValue && user.userPassword === userPasswordValue);
    if (userExists) {
        //alert("Login successful");
        loginMessage.innerHTML = "Welcome back, " + userNameValue + "!";
        window.location.href = "game.html";
    } else {

        loginMessage.innerHTML = "Login failed. User not found or incorrect password, You are taken to sign up";

    }
}

loginMessage.innerHTML = "full in your information to log in";
const signUpForm = document.getElementById("signUpForm");
const newUserName = document.getElementById("newusername");
const newPassWord = document.getElementById("newpassword");
const signupMessage = document.getElementById("message2");
signupMessage.innerHTML = "";

signUpForm.addEventListener("submit", signup);

function signup(event) {
    event.preventDefault();
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const correctPassword = passwordReg.test(newPassWord.value);

    if (!correctPassword) {
        signupMessage.innerHTML = "The password is wrong. Please enter another password.";
        return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const existsUserName = savedUsers.find((item) => item.userName === newUserName.value);
    if (existsUserName) {
        signupMessage.innerHTML = "The username already exists.";
    } else {
        const newUser = {
            userName: newUserName.value,
            userPassword: newPassWord.value
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        signupMessage.innerHTML = "Sign up successful. Please log in.";
    }
}

