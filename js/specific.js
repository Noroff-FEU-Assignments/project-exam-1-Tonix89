import { message } from "./message/message.js";
import { getUser } from "./home/modal.js";

const postCont = document.querySelector(".spcfc_post_cont");
const cmmntsCont = document.querySelector(".cmmnts_cont");
document.querySelector(".cmmnts_sctn").className = "hide_section";

const modalCont = document.getElementById("spcfc_modal");
const modalPost = document.querySelector(".modal_post");
const close = document.querySelector(".close");
modalCont.style.display = "none";

const submitMessage = document.querySelector(".cmmnt_sbmt_mssg");
const commentSection = document.querySelector(".add_cmmnt_sctn");
const commentForm = document.getElementById("add_comment");
const fullname = document.getElementById("fullname");
const fullnameError = document.getElementById("fullnameError");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const usrComments = document.getElementById("comments");
const commentError = document.getElementById("commentError");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

console.log(params);

const id = params.get("id");

console.log(id);

const url1 = "https://tonix.site/daily-devotion/wp-json/wp/v2/posts/" + id;
console.log(url1);

const url2 =
  "https://tonix.site/daily-devotion/wp-json/wp/v2/comments?post=" + id;

console.log(url2);

async function commentApi() {
  try {
    const comment = await fetch(url2);
    const comResult = await comment.json();
    console.log(comResult);

    if (comResult.length === 0) {
      cmmntsCont.innerHTML = `<div class="pst_cmmnt">
                              <p>No comments</p>        
                      </div>`;
    } else {
      for (let i = 0; i < comResult.length; i++) {
        const y = comResult[i].content.rendered;
        console.log(y);
        cmmntsCont.innerHTML += `<div class="cmmnts_cont">
                          <div class="pst_cmmnt">
                            ${y}
                            <h4>- ${comResult[i].author_name}</h4>
                          </div>             
                      </div>`;
      }
    }
  } catch (error) {
    console.log(error);
    postCont.innerHTML = message("error", error);
  }
}

commentApi();

async function postApi() {
  try {
    const post = await fetch(url1);
    const result = await post.json();
    console.log(result);

    postCont.innerHTML = `<div class="hide">${result.content.rendered}</div>`;

    const pic = document.querySelector(".wp-block-post-author__avatar img").src;
    console.log(pic);
    const feat = document.querySelector(
      ".wp-block-post-featured-image img"
    ).src;
    console.log(feat);
    const userName = document.querySelector(
      ".wp-block-post-author__name"
    ).innerHTML;
    let newDate = result.date;
    newDate = new Date(newDate).toUTCString();
    newDate = newDate.split(" ").slice(0, 4).join(".");
    const verse = document.querySelector(".wp-block-quote cite").innerHTML;
    console.log(verse);
    const verseHead = document.querySelector(".wp-block-quote h2").innerHTML;
    console.log(verseHead);
    const parag = document.querySelector(
      ".wp-block-group__inner-container"
    ).innerHTML;

    postCont.innerHTML += `<div class="blg_spcfc_pst">
                            <div class= "feat_cont">
                            <button class="feat_img"><label><img src="${feat}"></label></button>
                            </div>
                            <div class="auth_date">
                              <button class="usr_prfl_pc" value="${result.author}"><label><img src="${pic}"></label></button>
                                <div>
                                    <h4>${userName}</h4>
                                    <div class="date">
                                        <p class="publish_date">Published Date :</p> <p class="date_date"> ${newDate}</p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div>
                                <h1>${result.title.rendered}</h1>
                            </div>
                            <div class="bible">
                                <p class="verse">${verse}</p>
                                <h2>- ${verseHead}</h2>
                            </div>
                            <div class="parag">
                                ${parag}
                            </div>
                    </div>`;
    const featImg = document.querySelector(".feat_img");
    featImg.onclick = function () {
      console.log(featImg);
      console.log(modalPost);
      modalCont.style.display = "flex";
      modalPost.innerHTML = `<div class="user_info"><img src="${feat}"> </div>`;
      close.onclick = function () {
        modalCont.style.display = "none";
      };
    };

    const usrPc = document.querySelector(".usr_prfl_pc");
    console.log(usrPc);
    usrPc.onclick = function () {
      const url3 =
        "https://tonix.site/daily-devotion/wp-json/wp/v2/users/" + usrPc.value;
      console.log(url3);
      userInfo(url3);
    };

    document.querySelector(".hide_section").className = "cmmnts_sctn";
    document.title = "My Devotion" + "|" + verseHead + "|" + userName;
  } catch (error) {
    console.log(error);
    postCont.innerHTML = message("error", error);
  }
}

postApi();

async function userInfo(url3) {
  try {
    const userData = await fetch(url3);
    const userResult = await userData.json();
    console.log(userResult);

    modalCont.style.display = "flex";

    getUser(userResult, modalCont, modalPost, close);
  } catch (error) {
    console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}

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
    submitMessage.innerHTML = `<p>Your comment is waiting for review</p>`;
    commentSection.style.display = "none";
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
