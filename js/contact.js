const formContainer = document.querySelector(".cntct_mn_cntnr");
const form = document.querySelector("#cntct_form");
const fullname = document.querySelector("#fullname");
const fullnameError = document.querySelector("#fullnameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.getElementById("message");
const messageError = document.getElementById("messageError");
const successMessage = document.querySelector("#successMessage");

const srchForm = document.querySelector(".srch_br");
const inputValue = document.getElementById("input_value");
// console.log(inputValue.value);
function searchForm(event) {
  event.preventDefault();
  // console.log(inputValue.value);
  if (inputValue.value) {
    window.location.href = "blog.html?search=" + inputValue.value;
  } else {
    window.location.href = "contact.html";
  }
}
srchForm.addEventListener("submit", searchForm);

const url = "https://formspree.io/f/xbjbwrav";

function validateForm(event) {
  event.preventDefault();

  if (validateLength(fullname.value, 5) === true) {
    fullnameError.style.display = "none";
  } else {
    fullnameError.style.display = "block";
  }

  if (validateLength(subject.value, 15) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (message.value.trim().length <= 200 && message.value.trim().length >= 25) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (
    message.value.trim().length >= 25 &&
    message.value.trim().length <= 200 &&
    validateEmail(email.value) === true &&
    validateLength(subject.value, 15) === true &&
    validateLength(fullname.value, 6) === true
  ) {
    const formData = {
      author_name: fullname.value,
      author_email: email.value,
      content: message.value,
    };
    postData(url, formData);
    successMessage.innerHTML = "Message Sent!";
    formContainer.style.display = "none";
  }
}

form.addEventListener("submit", validateForm);

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
  });
  return response.json();
}
