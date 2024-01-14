//animation between sign-up , sign-in
const container = document.getElementById("container");
const regBtn = document.getElementById("register");
const logBtn = document.getElementById("login");

regBtn.addEventListener("click", () => {
  container.classList.add("active");
});

logBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

//Define error messeges
var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");
var data = JSON.parse(localStorage.getItem("data")) || [];

//validate the name input field
function validateName() {
  var userNameInput = document.getElementById("name");
  var userName = userNameInput.value;
  if (userName.length < 3) {
    nameError.innerHTML = "name must be min.3 characters";
    userNameInput.style.border = "2px solid red";
    return false;
  }
  nameError.innerHTML = "";
  userNameInput.style.border = "3px solid green";
  return true;
}
//validate the email input field
function validateEmail() {
  var userEmailInput = document.getElementById("email");
  var userEmail = userEmailInput.value;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var userExists = data.some(function (user) {
    return user.userEmail === userEmail;
  });

  if (userExists) {
    userEmailInput.style.border = "2px solid red";
    emailError.innerHTML = "This email is already registered";
    return false;
  }
  if (!emailRegex.test(userEmail)) {
    emailError.innerHTML =
      "Invalid email format. Please use a valid email address.";
    userEmailInput.style.border = "2px solid red";
    return false;
  }
  emailError.innerHTML = "";
  userEmailInput.style.border = "3px solid green";
  return true;
}

//validate the password input field
function validatePassword() {
  var userPasswdInput = document.getElementById("passwd");
  var userPasswd = userPasswdInput.value;
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!passwordRegex.test(userPasswd)) {
    document.getElementById("passwordError").innerHTML =
      "*Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and be at least 6 characters";
    userPasswdInput.style.border = "2px solid red";
    return false;
  }
  passwordError.innerHTML = "";
  userPasswdInput.style.border = "3px solid green";
  return true;
}

document.getElementById("regbtn").addEventListener("click", function (event) {
  event.preventDefault();
  //checks if all the inputs is validate
  if (!validateName() || !validateEmail() || !validatePassword()) {
    return;
  }
  //Define inputs
  var userNameInput = document.getElementById("name");
  var userEmailInput = document.getElementById("email");
  var userPasswdInput = document.getElementById("passwd");
  //push to data
  data.push({ userName: userNameInput.value , userEmail: userEmailInput.value , userPasswd: userPasswdInput.value });
  //reset border color after sign-up
  userPasswdInput.style.border = "";
  userEmailInput.style.border = "";
  userNameInput.style.border = "";
  //set to local storge
  localStorage.setItem("data", JSON.stringify(data));
  //reset form after sign-up
  document.querySelector("form").reset();
  //switch to sign-in form if the sign-up is done
  container.classList.remove("active");
});