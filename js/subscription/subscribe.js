const subsForm = document.querySelector("#subscribe_form");
const yourname = document.querySelector("#yourname");
const yournameError = document.querySelector("#yournameError");
const youremail = document.querySelector("#youremail");
const youremailError = document.querySelector("#youremailError");
export function subscribe() {
  const userUrl = "https://www.tonix.site/daily-devotion/wp-json/wp/v2/users";

  function validateForm(event) {
    event.preventDefault();

    if (validateLength(yourname.value, 4) === true) {
      yournameError.style.display = "none";
    } else {
      yournameError.style.display = "block";
    }

    if (validateEmail(youremail.value) === true) {
      youremailError.style.display = "none";
    } else {
      youremailError.style.display = "block";
    }

    if (
      validateEmail(youremail.value) === true &&
      validateLength(yourname.value, 4) === true
    ) {
      const formData = {
        username: yourname.value,
        email: youremail.value,
        password: "asdf!23456",
      };
      console.log(formData);
      subsData(userUrl, formData).then((response) => {
        console.log(response);
        if (response.message) {
          document.querySelector(
            ".response-error"
          ).innerHTML = `<h3>${response.message}</h3>`;
        } else {
          document.querySelector(".subs_thanks").style.display = "flex";
          document.querySelector(".subsForm_cont").style.display = "none";
        }
      });
    }
  }

  subsForm.addEventListener("submit", validateForm);

  function validateLength(value, len) {
    if (value.trim().length >= len) {
      return true;
    } else {
      return false;
    }
  }

  function validateEmail(youremail) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(youremail);
    return patternMatches;
  }

  async function subsData(userUrl, formData) {
    const response = await fetch(userUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic ZGRldm86NGNNcCBnWWxDIE9CS0sgeHNESiBCYVMyIGhOcVk=",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(formData),
    });
    return response.json();
  }
}
