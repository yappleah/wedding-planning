/* JavaScript to sign in clients and logout clients.
If the client does not have sign in information, need to register them.
We can have a forgot password button. Remember me checkbox. 
Need register link to a new page. When clicked to register, replace current page with new page.
After registration, link to home page. client can choose to log in again.*/
'use strict';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const usernameRegex = /^[a-z0-9_-]{5,15}$/;

let userName = window.localStorage.getItem("userName");

window.addEventListener('load', addLoginButton, false);

/**
 * Adds a login button to the page. After user logged in, the button will be log out button
 */
function addLoginButton() {
  let userButton = document.createElement("button");
  userButton.className = "btnLogin-popup";
  if(!userName) {
    userButton.textContent = "Log in";
    userButton.addEventListener("click", openLoginModal);
  }else{
    userButton.textContent = "Log out";
    userButton.addEventListener("click", logOut);
  }
  let referenceNode = document.getElementsByClassName("language-selector")[0].childNodes[0];
  referenceNode.parentNode.insertBefore(userButton, referenceNode);
}

/**
 * Creates a login modal.
 */
function createLoginModal() {  
  let forgetPasswordPage = "#";
  let modalHtml = `
      <div id="loginModal">
          <div class="wrapper">
              <span class="close"><ion-icon name="close"></ion-icon></span>
              <div class="form-box login">
                  <h4>Log in to Sweet Symphony</h4>
                  <form action="#" id="login-form">
                      <div class="input-box">
                          <span class="icon"><ion-icon name="person-circle"></ion-icon></span>
                          <input type="Text" id="username" required autocomplete="off">
                          <label for="username">User name</label> 
                      </div>
                      <div class="input-box">
                          <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                          <input type="password" id="password" required>
                          <label for="password">Password</label>
                      </div>
                      <div class="remember-forgot">
                          <label><input type="checkbox" id="rememberMe">Remember me</label>
                          <a href="${forgetPasswordPage}">Forgot Password?</a>
                      </div>
                      <span id="msgBox"></span>
                      <button type="submit" class="btn">Log in</button>
                      <div class="login-register">
                          <p>Don't have an account? <a href="#" class="register-link">Register</a></p>
                      </div>
                  </form>
              </div>

              <div class="form-box register">
                  <h4>Registration</h4>
                  <form action="#" id="register-form">
                      <div class="input-box">
                          <span class="icon"><ion-icon name="person-circle"></ion-icon></span>
                          <input type="Text" id="regUsername" required autocomplete="off">
                          <label for="regUsername">User name</label> 
                      </div>
                      <div class="input-box">
                          <span class="icon"><ion-icon name="mail"></ion-icon></span>
                          <input type="email" id="email" required autocomplete="off">
                          <label for="email">Email</label> 
                      </div>
                      <div class="input-box">
                          <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                          <input type="password" id="regPassword" required autocomplete="off">
                          <label for="regPassword">Password</label>
                      </div>
                      <div class="input-box">
                          <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                          <input type="password" id="confirmPassword" required autocomplete="off">
                          <label for="confirmPassword">Confirm Password</label>
                      </div>
                      <div class="remember-forgot">
                          <label><input type="checkbox" id="agreeTerms">I agree to the terms & conditions</label>
                      </div>
                      <span id="msgBoxReg"></span>
                      <button type="submit" class="btn" disabled="true">Register</button>
                      <div class="login-register">
                          <p>Already have an account? <a href="#" class="login-link">Log in</a></p>
                      </div>
                  </form>
              </div>
              
          </div>
      </div>
  `;

  document.getElementsByClassName("web-header")[0].insertAdjacentHTML('afterend', modalHtml);
}

createLoginModal();

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', ()=> {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
});

let modal = document.getElementById("loginModal");
let closeButton = document.getElementsByClassName("close")[0];

// Close login modal when click the close button.
closeButton.onclick = function() {
  modal.style.display = "none";
}

// Close login modal when click any where outside the model.
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openLoginModal() {
  modal.style.display = "block";
}

const agreeTerms = document.getElementById('agreeTerms');
const regBtn = document.querySelectorAll('.btn')[1];

agreeTerms.addEventListener('change', function(e) {
  e.preventDefault();

  if (agreeTerms.checked) {
    regBtn.disabled = false;
  } else {
    regBtn.disabled = true;
  }

});

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let msgBox = document.getElementById("msgBox");
  let profilePage = "user_profile.html";
  let esto = document.getElementsByClassName("esto")[0];
  msgBox.innerHTML = "";

  try {
    if (!((username === "isabella123" && username === "john123" && username === "mary123") || password === "admin")) throw "Wrong username or password";
        window.localStorage.setItem("userName", username);

        var clientInfo = {};
        let storageKey = "userInfo";
        /**
         * loads client data from clients.json file
         */
        function loadClientData() {
            let xhr = new XMLHttpRequest();
            if (xhr) {
                xhr.open("get", 'data/clients.json');

                // passing data to the server
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        let json = xhr.responseText;
                        const obj = JSON.parse(json);
                        let filteredData = obj.filter(function(i) {
                            return i.userName === username;
                        });
                        let storedData = window.localStorage.getItem(storageKey);
                        if (storedData === null) {
                            window.localStorage.setItem(storageKey, JSON.stringify(filteredData[0]));
                            storedData = window.localStorage.getItem(storageKey);
                        }
                        clientInfo = JSON.parse(storedData);
                        getPersonalInfo();
                    }
                }
                xhr.send();
            }
        }

        if (window.location.pathname === "/reservation.html" && esto) {
          loadClientData();
          window.location.href = "check_out.html";
        }else{
          window.location.href = profilePage;
        }
        
  } catch (error) {
    msgBox.innerHTML = error;
  }
});

document.getElementById("register-form").addEventListener("submit", function(event) {
  event.preventDefault();

  let username = document.getElementById("regUsername").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("regPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let msgBoxReg = document.getElementById("msgBoxReg");
  msgBoxReg.innerHTML = "";

  try {
    if (username === "isabella123" || username === "john123" || username === "mary123") throw "Username exists";
    if (email === "me@email.com" || email === "johnsmith@gmail.com" || email === "mary@brown.com" ) throw "Email address exists";
    if (password === username ) throw "Password can not be same as username";
    if (!usernameRegex.test(username) ) throw "Username must be between 5 and 15 characters long, containing only lowercase letters, numbers, underscores, and dashes";
    if (!passwordRegex.test(password) ) throw "Password must be minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    if (confirmPassword !== password ) throw "Passwords must be same";
    alert("Registration successful! Please log in.");
    document.querySelector('.wrapper').classList.remove('active');
  } catch (error) {
    msgBoxReg.innerHTML = error;
  }
});

function logOut() {
  window.localStorage.removeItem("userName");
  window.localStorage.removeItem("userInfo");
  if (window.location.pathname === "/user_profile.html" || window.location.pathname === "/check_out.html") {
    window.location.href = "index_en.html";
  }else{
    window.location.reload();
  }
}