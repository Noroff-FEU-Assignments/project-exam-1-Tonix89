import { subscribe } from "./subscription/subscribe.js";

subscribe();

const form = document.querySelector("#feedback_form");
const message = document.getElementById("message");
const messageError = document.getElementById("messageError");
const successMessage = document.querySelector("#successMessage");
const formContainer = document.querySelector(".cntct_mn_cntnr");
const xprcnError = document.getElementById("xprcnError");

const srchForm = document.querySelector(".srch_br");
const inputValue = document.getElementById("input_value");
// console.log(inputValue.value);

const emoji = document.querySelectorAll(".fdbck_emojis button");
// console.log(emoji);
const label = document.querySelectorAll(".old");
// console.log(label);

emoji.forEach((emojiBtn) => {
  emojiBtn.onclick = function () {
    for (let i = 0; i < label.length; i++) {
      const emojiId = label[i].id;
      if (emojiBtn.value === emojiId) {
        document.getElementById(emojiBtn.value).style.fontSize = "40px";
        let txtarea = document.querySelector("textarea");
        txtarea.placeholder = "I feel " + emojiId + " because...";
        continue;
      } else {
        document.getElementById(emojiId).style.fontSize = "20px";
      }
    }
    return emojiBtn.value;
  };
});

function searchForm(event) {
  event.preventDefault();
  // console.log(inputValue.value);
  if (inputValue.value) {
    window.location.href = "devotion.html?search=" + inputValue.value;
  } else {
    window.location.href = "feedback.html";
  }
}
srchForm.addEventListener("submit", searchForm);

const url =
  "https://www.tonix.site/daily-devotion/wp-json/contact-form-7/v1/contact-forms/201/feedback";

function validateForm(event) {
  event.preventDefault();
  let txtarea = document.querySelector("textarea");
  //   console.log(txtarea.placeholder);
  let x = "";
  if (txtarea.placeholder) {
    x = txtarea.placeholder;
    xprcnError.style.display = "none";
  } else {
    xprcnError.style.display = "block";
  }
  if (message.value.trim().length <= 200 && message.value.trim().length >= 25) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (
    message.value.trim().length >= 25 &&
    message.value.trim().length <= 200 &&
    txtarea.placeholder
  ) {
    const data = new FormData();
    data.append("your-subject", "Feedback");
    data.append("your-experience", txtarea.placeholder);
    data.append("your-message", message.value);
    postData(data);
    successMessage.innerHTML = "Feedback Sent. Thank you!";
    formContainer.style.display = "none";
  }
}
form.addEventListener("submit", validateForm);

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
