const queryString = document.location.search;

const params = new URLSearchParams(queryString);

//console.log(params);

const id = params.get("id");

//console.log(id);

const url =
  "https://www.tonix.site/daily-devotion/wp-json/wp/v2/comments?post=" + id;
const submitMessage = document.querySelector(".cmmnt_sbmt_mssg");
const commentSection = document.querySelector(".add_cmmnt_sctn");
const commentForm = document.getElementById("add_comment");
const fullname = document.getElementById("fullname");
const fullnameError = document.getElementById("fullnameError");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const usrComments = document.getElementById("comments");
const commentError = document.getElementById("commentError");
const submitButton = document.querySelector(".btn");
const loader = document.querySelector(".spcfc_ldr");

function validateComment(event) {
  event.preventDefault();

  if (validateLength(fullname.value, 5) === true) {
    fullnameError.style.display = "none";
  } else {
    fullnameError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (
    usrComments.value.trim().length <= 200 &&
    usrComments.value.trim().length >= 25
  ) {
    commentError.style.display = "none";
  } else {
    commentError.style.display = "block";
  }

  if (
    usrComments.value.trim().length <= 200 &&
    usrComments.value.trim().length >= 25 &&
    validateEmail(email.value) === true &&
    validateLength(fullname.value, 5) === true
  ) {
    const formData = {
      author_name: fullname.value,
      author_email: email.value,
      content: usrComments.value,
    };
    //console.log(url);
    //console.log(formData);
    postData(url, formData);
  }
}
commentForm.addEventListener("submit", validateComment);

function validateLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).then((data) => {
    // console.log(data);
    submitButton.style.display = "none";
    loader.style.display = "flex";
    setTimeout(function () {
      location.reload(true);
    }, 5000);
  });
  return response.json();
}
