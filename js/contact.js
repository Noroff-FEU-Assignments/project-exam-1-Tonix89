import { subscribe } from "./subscription/subscribe.js";

subscribe();

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
    window.location.href = "devotion.html?search=" + inputValue.value;
  } else {
    window.location.href = "contact.html";
  }
}
srchForm.addEventListener("submit", searchForm);

const url =
  "https://www.tonix.site/daily-devotion/wp-json/contact-form-7/v1/contact-forms/182/feedback";

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
    const data = new FormData();
    data.append("your-name", fullname.value);
    data.append("your-email", email.value);
    data.append("your-subject", subject.value);
    data.append("your-message", message.value);
    postData(data);
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

async function postData(data) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data,
  });
  return response.json();
}
