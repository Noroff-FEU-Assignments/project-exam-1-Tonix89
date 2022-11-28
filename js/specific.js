import { message } from "./message/message.js";
import { getUser } from "./home/modal.js";
import { subscribe } from "./subscription/subscribe.js";

subscribe();

const postCont = document.querySelector(".spcfc_post_cont");
const cmmntsCont = document.querySelector(".cmmnts_cont");
document.querySelector(".cmmnts_sctn").className = "hide_section";

const modalCont = document.getElementById("spcfc_modal");
const modalPost = document.querySelector(".modal_post");
const close = document.querySelector(".close");
modalCont.style.display = "none";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

//console.log(params);

const id = params.get("id");

// console.log(id);

const fbShare = document.querySelector(".fblink");
const link = window.location.href;
fbShare.innerHTML = `
<div class="fb-share-button" data-href="${link}" data-layout="button_count" data-size="large" data-lazy="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${link}%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>`;
// fbShare.innerHTML = `<div class="fb-share-button"
// data-href="${link}"
// data-layout="button_count">
// </div>`;

const srchForm = document.querySelector(".srch_br");
const inputValue = document.getElementById("input_value");
// console.log(inputValue.value);
function searchForm(event) {
  event.preventDefault();
  // console.log(inputValue.value);
  if (inputValue.value) {
    window.location.href = "devotion.html?search=" + inputValue.value;
  } else {
    window.location.href = "blogspecific.html?id=" + id;
  }
}
srchForm.addEventListener("submit", searchForm);

const url1 = "https://tonix.site/daily-devotion/wp-json/wp/v2/posts/" + id;
// //console.log(url1);

const url2 =
  "https://tonix.site/daily-devotion/wp-json/wp/v2/comments?post=" + id;
// console.log(url2);

async function postApi() {
  try {
    const postApi = await fetch(url1);
    const result = await postApi.json();
    console.log(result);

    const featImgLink = result._links["wp:featuredmedia"][0].href;
    console.log(featImgLink);
    const featImgApi = await fetch(featImgLink);
    const featImgResult = await featImgApi.json();
    console.log(featImgResult.source_url);

    const authorLink = result._links.author[0].href;
    const authorApi = await fetch(authorLink);
    const authorResult = await authorApi.json();
    console.log(authorResult);

    const content = new DOMParser().parseFromString(
      result.content.rendered,
      "text/html"
    ).body.childNodes;
    console.log(content);

    const userPic = authorResult.avatar_urls[96];
    const userName = authorResult.name;
    console.log(result.title.rendered);

    console.log(content[0].innerHTML);

    console.log(content[2].innerHTML);

    const parag = result.content.rendered;

    let newDate = result.date;
    newDate = new Date(newDate).toUTCString();
    newDate = newDate.split(" ").slice(0, 4).join(".");

    document.querySelector(".hide_section").className = "cmmnts_sctn";

    metaUpdate(content, featImgResult, userName);

    postCont.innerHTML = `<div class="blg_spcfc_pst">
                            <div class= "feat_cont">
                            <button class="feat_img"><label><img src="${featImgResult.source_url}"></label></button>
                            </div>
                            <div class="auth_date">
                              <button class="usr_prfl_pc" value="${result.author}"><label><img src="${userPic}"></label></button>
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
                                <p class="verse">${content[2].innerHTML}</p>
                                <h2>- ${content[0].innerHTML}</h2>
                            </div>
                            <div class="parag">
                                ${parag}
                            </div>
                    </div>`;

    document.querySelector(".parag h2").remove();
    document.querySelector(".parag pre").remove();

    const featImg = document.querySelector(".feat_img");

    featImg.onclick = function () {
      //console.log(featImg);
      // console.log(modalPost);
      modalCont.style.display = "flex";
      modalPost.innerHTML = `<div class="featured_image"><img src="${featImgResult.source_url}"> </div>`;
      close.onclick = function () {
        modalCont.style.display = "none";
      };
    };

    const usrPc = document.querySelector(".usr_prfl_pc");
    // console.log(usrPc);
    usrPc.onclick = function () {
      const url3 =
        "https://tonix.site/daily-devotion/wp-json/wp/v2/users/" + usrPc.value;
      //console.log(url3);
      userInfo(url3);
    };
  } catch (error) {
    // console.log(error);
    postCont.innerHTML = message("error", error);
  }
}

postApi();

async function userInfo(url3) {
  try {
    const userData = await fetch(url3);
    const userResult = await userData.json();
    //console.log(userResult);

    modalCont.style.display = "flex";

    getUser(userResult, modalCont, modalPost, close);
  } catch (error) {
    // console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}

async function commentApi() {
  try {
    const comment = await fetch(url2);
    const comResult = await comment.json();
    //console.log(comResult);

    if (comResult.length === 0) {
      cmmntsCont.innerHTML = `<div class="pst_cmmnt">
                              <p>No comments</p>        
                      </div>`;
    } else {
      for (let i = 0; i < comResult.length; i++) {
        const y = comResult[i].content.rendered;
        //console.log(y);
        cmmntsCont.innerHTML += `<div class="cmmnts_cont">
                          <div class="pst_cmmnt">
                            ${y}
                            <h4>- ${comResult[i].author_name}</h4>
                          </div>             
                      </div>`;
      }
    }
  } catch (error) {
    // console.log(error);
    postCont.innerHTML = message("error", error);
  }
}

commentApi();

function metaUpdate(content, featImgResult, userName) {
  document.title = "My Devotion" + "|" + content[0].innerHTML + "|" + userName;
  document
    .querySelector("meta[property='og:url']")
    .setAttribute("content", link);
  document
    .querySelector("meta[property='og:title']")
    .setAttribute("content", document.title);
  document
    .querySelector("meta[property='og:description']")
    .setAttribute("content", content[2].innerHTML);
  document
    .querySelector("meta[property='og:image']")
    .setAttribute("content", featImgResult.source_url);
}
