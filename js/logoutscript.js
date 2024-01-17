function loggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

document.getElementById("userIcon").addEventListener("click", function(){
    if (loggedIn()) {
      showLoggedInPopup();
    } else {
      window.location.href = "login.html";
    }
  });
  
  function showLoggedInPopup() {
    var loggedInPopup = document.getElementById("loggedInPopup");
    var loggedInUserName = document.getElementById("loggedInUserName");
  
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      loggedInUserName.textContent = loggedInUser.userName;
  
      loggedInPopup.style.display = "block";
  
      setTimeout(function () {
        loggedInPopup.style.display = "none";
      }, 5000);
    }
  }

  function logout() {
    localStorage.removeItem("loggedInUser");
  
    window.location.href = "index.html";
  }