'use strict';

let userIcon = "filled";

if(userName) {
  addUserBanner();
}

function addUserBanner() {
  
  let message = "";        // the greeting message
  let today;          // an instance (object) of the Date object
  let theHour;        // extracted from the today current hour

  /* 2. Initialization Phase */
  today = new Date();

  /* 3. Processing Phase */
  // extract hour from the today object
  theHour = today.getHours();
  // alert(theHour);

  // determine whether it is morning 
  if (theHour < 12) {
      message = "Good morning ";
  } // end if block

  // determine whether it is after 12 am
  if (theHour >= 12) {
      // convert to 12-hour format 
      theHour = theHour - 12;

      // determine whether it is before 6 pm
      if (theHour < 6) {
        message = "Good afternoon ";
      } // end inner if block
      else {
          // if the hour is after 6 pm 
          message = "Good evening ";
      } // end else block
  } 

  let userBanner = document.createElement("div");
  userBanner.className = "user-banner";

  let userBannerLeft = document.createElement("div");
  userBannerLeft.className = "user-banner-left";
  let textContentLeft = message;
  userBannerLeft.textContent = textContentLeft ;
  userBanner.appendChild(userBannerLeft);

  let heartIconSpan = document.createElement("span");
  heartIconSpan.className = "banner-icon";
  heartIconSpan.innerHTML = '<ion-icon name="heart"></ion-icon>';
  userBannerLeft.insertAdjacentElement('beforeend', heartIconSpan);
  

  let userProfileLink = document.createElement("a");
  userProfileLink.href = "user_profile.html";
  userProfileLink.className = "banner-user-name";
  userProfileLink.textContent = userName;
  userProfileLink.title = "Click to view your profile";
  userBannerLeft.insertAdjacentElement('beforeend', userProfileLink);

  let userIconSpan = document.createElement("span");
  userIconSpan.className = "banner-icon";
  userIconSpan.innerHTML = '<ion-icon name="happy"></ion-icon>';
  userIconSpan.setAttribute("id", "user-icon");
  userBannerLeft.insertAdjacentElement('beforeend', userIconSpan);

  let userBannerRight = document.createElement("div");
  userBannerRight.className = "user-banner-right";
  userBanner.appendChild(userBannerRight);

  let tropyIconSpan = document.createElement("span");
  tropyIconSpan.innerHTML = '<ion-icon name="trophy"></ion-icon>';
  tropyIconSpan.className = "banner-icon";
  tropyIconSpan.setAttribute("id", "tropy");
  userBannerRight.insertAdjacentElement('beforeend', tropyIconSpan);

  let messageRight = document.createElement("span");
  messageRight.textContent = "points to next level: ";
  userBannerRight.insertAdjacentElement('beforeend', messageRight);

  let pointsToNextLevel = document.createElement("span");
  userBannerRight.insertAdjacentElement('beforeend', pointsToNextLevel);

  if(window.localStorage.getItem("userInfo")){
    let clientInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    let userPoint = parseInt(clientInfo.totalPoint);

    if (userPoint >= 100000){// diamond account
      tropyIconSpan.innerHTML = '<ion-icon name="diamond"></ion-icon>';
      messageRight.textContent = "You are a diamond client!";

    } else if (userPoint >= 50000) {// golden account
      tropyIconSpan.style.color = 'gold';
      pointsToNextLevel.textContent = 100000 - userPoint;

    } else if ( userPoint > 25000 ){// silver account
      tropyIconSpan.style.color = 'silver';
      pointsToNextLevel.textContent = 50000 - userPoint;
    
    } else {
      tropyIconSpan.style.color = 'BurlyWood';
      pointsToNextLevel.textContent = 25000 - userPoint;
      
    };
  }

  document.getElementsByClassName("web-header")[0].insertAdjacentElement('afterend', userBanner);

  setInterval(changeIcon, 2000);
}

function changeIcon() {
  // check the value of the icon 
  if (userIcon == 'filled') {
      document.getElementById('user-icon').innerHTML = '<ion-icon name="happy"></ion-icon>';

      // change the icon value to outline
      userIcon = 'outline';
  } else {
      if (userIcon == 'outline') {
          document.getElementById('user-icon').innerHTML = '<ion-icon name="happy-outline"></ion-icon>';

          // change the icon value to filled
          userIcon = 'filled';
      }
  }
}

