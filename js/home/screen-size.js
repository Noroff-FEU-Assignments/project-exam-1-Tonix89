export function screenSize(screenWidth) {
  const hide = document.querySelectorAll(".ndx_mn_pst_cntnr");
  console.log(hide.length);
  const slideLeft = document.querySelector(".sld_lf_cn");
  console.log(slideLeft);
  const slideRight = document.querySelector(".sld_rght_cn");
  console.log(slideRight);
  let y = 0;
  let z = 1;

  console.log(screenWidth);

  if (screenWidth >= 600) {
    largeScreen();
  } else {
    smallScreen();
  }
}

function largeScreen() {
  const hide = document.querySelectorAll(".ndx_mn_pst_cntnr");
  console.log(hide.length);
  const slideLeft = document.querySelector(".sld_lf_cn");
  console.log(slideLeft);
  const slideRight = document.querySelector(".sld_rght_cn");
  console.log(slideRight);
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
    console.log(x, w);
    if (w > hide.length) {
      y = 0;
      z = 1;
      console.log(y, z);
    }
    if (x < 0) {
      z = hide.length - 1;
      y = 1;
      console.log(y, z);
    }
    console.log(y, z);
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
  console.log(hide.length);
  const slideLeft = document.querySelector(".sld_lf_cn");
  console.log(slideLeft);
  const slideRight = document.querySelector(".sld_rght_cn");
  console.log(slideRight);
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
    console.log(x);
    if (x === hide.length) {
      y = hide.length - 1;
      console.log(y);
    }
    if (x < 0) {
      y = 0;
    }
    console.log(y);
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
