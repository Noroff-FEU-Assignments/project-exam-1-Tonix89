export function screenSize(screenWidth) {
  if (screenWidth >= 600) {
    largeScreen();
  } else if (screenWidth >= 450 && screenWidth <= 599) {
    smallScreen();
  } else {
    mobileScreen();
  }
}

function largeScreen() {
  const hide = document.querySelectorAll(".ndx_mn_pst_cntnr");
  //console.log(hide.length);
  const slideLeft = document.querySelector(".sld_lf_cn");
  // console.log(slideLeft);
  const slideRight = document.querySelector(".sld_rght_cn");
  // console.log(slideRight);
  let y = 0;
  let z = 1;

  for (let i = 0; i < hide.length; i++) {
    hide[i].style.display = "none";
    if (i >= y && i <= z) {
      slideLeft.style.display = "none";
      slideRight.style.display = "block";
      hide[i].style.display = "grid";
    }
  }

  slideRight.onclick = function () {
    show((y += parseInt(slideRight.value)), (z += parseInt(slideRight.value)));
  };

  slideLeft.onclick = function () {
    show((y += parseInt(slideLeft.value)), (z += parseInt(slideLeft.value)));
  };

  function show(x, w) {
    //console.log(x, w);
    if (w > hide.length) {
      y = 0;
      z = 1;
      //console.log(y, z);
    }
    if (x < 0) {
      z = hide.length - 1;
      y = 1;
      //console.log(y, z);
    }
    //console.log(y, z);
    if (z + 1 == hide.length) {
      slideRight.style.display = "none";
    } else {
      slideRight.style.display = "block";
    }
    if (y === 0) {
      slideLeft.style.display = "none";
    } else {
      slideLeft.style.display = "block";
    }
    for (let i = 0; i < hide.length; i++) {
      hide[i].style.display = "none";
      if (i >= y && i <= z) {
        hide[i].style.display = "grid";
      }
    }
  }
}

function smallScreen() {
  const hide = document.querySelectorAll(".ndx_mn_pst_cntnr");
  //console.log(hide.length);
  const slideLeft = document.querySelector(".sld_lf_cn");
  //console.log(slideLeft);
  const slideRight = document.querySelector(".sld_rght_cn");
  //console.log(slideRight);
  let y = 0;

  for (let i = 0; i < hide.length; i++) {
    hide[i].style.display = "none";
    if (i === y) {
      hide[i].style.display = "grid";
      slideLeft.style.display = "none";
      slideRight.style.display = "block";
    }
  }

  slideRight.onclick = function () {
    show((y += parseInt(slideRight.value) - 1));
  };

  slideLeft.onclick = function () {
    show((y += parseInt(slideLeft.value) + 1));
  };

  function show(x) {
    //console.log(x);
    if (x === hide.length) {
      y = hide.length - 1;
      //console.log(y);
    }
    if (x < 0) {
      y = 0;
    }
    //console.log(y);
    if (y + 1 === hide.length) {
      slideRight.style.display = "none";
    } else {
      slideRight.style.display = "block";
    }
    if (y === 0) {
      slideLeft.style.display = "none";
    } else {
      slideLeft.style.display = "block";
    }
    for (let i = 0; i < hide.length; i++) {
      hide[i].style.display = "none";
      if (i === y) {
        hide[i].style.display = "grid";
      }
    }
  }
}

function mobileScreen() {
  const hide = document.querySelectorAll(".ndx_mn_pst_cntnr");
  //console.log(hide.length);
  document.querySelector(".sld_lf_cn").style.display = "none";
  document.querySelector(".sld_rght_cn").style.display = "none";
  let y = 0;
  const indexMain = document.querySelectorAll(".ndx_mn_pst_cntnr");
  for (let i = 0; i < indexMain.length; i++) {
    indexMain[i].addEventListener("touchstart", (e) => {
      let callOnce = true;
      if (callOnce) {
        console.log(y);
        const startTouchScreenX = e.changedTouches[0].screenX;
        const startTouchScreenY = e.changedTouches[0].screenY;
        console.log(startTouchScreenX);
        // console.log(startTouchScreenY);
        // console.log(e);
        callOnce = false;
        indexMain[i].addEventListener("touchend", (e) => {
          if (!callOnce) {
            const stopTouchScreenX = e.changedTouches[0].screenX;
            const stopTouchScreenY = e.changedTouches[0].screenY;
            console.log(stopTouchScreenX);
            // console.log(stopTouchScreenY);
            // console.log(e);
            if (startTouchScreenX >= 800 && stopTouchScreenX <= 700) {
              show(++y);
            }
            if (startTouchScreenX <= 700 && stopTouchScreenX >= 800) {
              show(--y);
            }
          }
        });
      }
    });
  }

  for (let i = 0; i < hide.length; i++) {
    hide[i].style.display = "none";
    if (i === y) {
      hide[i].style.display = "grid";
    }
  }

  function show(x) {
    console.log(x);
    // console.log(hide.length);
    if (x === hide.length) {
      y = hide.length - 1;
      // console.log(y);
    }
    if (x < 0) {
      y = 0;
    }
    console.log(y);
    for (let i = 0; i < hide.length; i++) {
      hide[i].style.display = "none";
      if (i === y) {
        hide[i].style.display = "grid";
      }
    }
  }
}
