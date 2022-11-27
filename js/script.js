import { message } from "./message/message.js";
import { changeScreen } from "./home/changescreen.js";
import { screenSize } from "./home/screen-size.js";
import { getUser } from "./home/modal.js";

const screenWidth = window.innerWidth;
const mql = window.matchMedia("(max-width: 600px)");

const modalCont = document.getElementById("modal");
const modalPost = document.querySelector(".modal_post");
const close = document.querySelector(".close");
modalCont.style.display = "none";

const srchForm = document.querySelector(".srch_br");
const inputValue = document.getElementById("input_value");
// console.log(inputValue.value);
function searchForm(event) {
  event.preventDefault();
  // console.log(inputValue.value);
  if (inputValue.value) {
    window.location.href = "devotion.html?search=" + inputValue.value;
  } else {
    window.location.href = "index.html";
  }
}
srchForm.addEventListener("submit", searchForm);

const latestPost = document.querySelector(".post_cont");
const url1 = "https://tonix.site/daily-devotion/wp-json/wp/v2/posts?per_page=6";
// console.log(url1);

async function apiCall() {
  try {
    const postApi = await fetch(url1);
    const result = await postApi.json();

    // console.log(result);
    latestPost.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      const post = result[i];
      console.log(post);

      const content = new DOMParser().parseFromString(
        post.content.rendered,
        "text/html"
      ).body.childNodes;
      console.log(content);

      const authorLink = post._links.author[0].href;
      // console.log(authorLink);

      getPost(content, post, authorLink);

      // if (i <= 5) {
      //   // console.log(pic);
      //   latestPost.innerHTML = `<div class="hide">${content}</div>`;
      //   gravatarApi(authorPic, post);
      // }
    }
  } catch (error) {
    console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}

apiCall();

mql.addEventListener("change", changeScreen, false);

async function getPost(content, post, authorLink) {
  try {
    const author = await fetch(authorLink);
    const authorResult = await author.json();

    const userName = authorResult.name;
    console.log(userName);

    const userPic = authorResult.avatar_urls[96];
    console.log(userPic);

    console.log(post.title.rendered);

    console.log(content[0].innerHTML);

    console.log(content[2].innerHTML);

    let newDate = post.date;
    newDate = new Date(newDate).toUTCString();
    newDate = newDate.split(" ").slice(0, 4).join(".");

    latestPost.innerHTML += `<div class="ndx_mn_pst_cntnr fade">
                          <div class="pst_hd">
                            <button class="usr_prfl_pc" value="${post.author}"><label><img src="${userPic}"></label></button>
                            <h4>${userName}</h4>
                            <h1>${post.title.rendered}</h1>
                          </div>
                          <div class="bible">
                            <p class="verse">${content[2].innerHTML}</p>
                            <h2>- ${content[0].innerHTML}</h2>
                          </div>
                          <div class="pst_cta">
                            <a href="blogspecific.html?id=${post.id}" class="rd_nw_cta">Read Now</a>
                            <div class="date"><p class="publish_date">Published Date :</p> <p class="date_date"> ${newDate}</p></div>
                          </div>
              </div>`;
    const usrPc = document.querySelectorAll(".usr_prfl_pc");
    //console.log(usrPc);
    usrPc.forEach((userX) => {
      userX.onclick = function () {
        const userId = userX.value;
        const url2 =
          "https://tonix.site/daily-devotion/wp-json/wp/v2/users/" + userId;
        //console.log(url2);
        userInfo(url2);
      };
    });
    screenSize(screenWidth);
  } catch (error) {
    //console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}

// async function gravatarApi(authorPic, post) {
//   try {
//     const verse = document.querySelector(".wp-block-quote cite").innerHTML;
//     // console.log(verse);
//     const verseHead = document.querySelector(".wp-block-quote h2").innerHTML;
//     // console.log(verseHead);
//     // console.log(post.author);
//     // const userGravatar = await fetch(pic);
//     // const gravatarResult = await userGravatar.json();

//     // console.log(gravatarResult);
//     // const userName = gravatarResult.name;
//     // console.log(userName);

//     // const userProfile = gravatarResult.avatar_urls[96];
//     // console.log(userProfile);

//     let newDate = post.date;
//     newDate = new Date(newDate).toUTCString();
//     newDate = newDate.split(" ").slice(0, 4).join(".");

//     latestPost.innerHTML += `<div class="ndx_mn_pst_cntnr fade">
//                           <div class="pst_hd">
//                             <button class="usr_prfl_pc" value="${post.author}"><label><img src="${authorPic}"></label></button>

//                             <h1>${post.title.rendered}</h1>
//                           </div>
//                           <div class="bible">
//                             <p class="verse">${verse}</p>
//                             <h2>- ${verseHead}</h2>
//                           </div>
//                           <div class="pst_cta">
//                             <a href="blogspecific.html?id=${post.id}" class="rd_nw_cta">Read Now</a>
//                             <div class="date"><p class="publish_date">Published Date :</p> <p class="date_date"> ${newDate}</p></div>
//                           </div>
//               </div>`;
//     const usrPc = document.querySelectorAll(".usr_prfl_pc");
//     //console.log(usrPc);
//     usrPc.forEach((userX) => {
//       userX.onclick = function () {
//         const userId = userX.value;
//         const url2 =
//           "https://tonix.site/daily-devotion/wp-json/wp/v2/users/" + userId;
//         //console.log(url2);
//         userInfo(url2);
//       };
//     });
//     screenSize(screenWidth);
//   } catch (error) {
//     // console.log(error);
//     latestPost.innerHTML = message("error", error);
//   }
// }

async function userInfo(url2) {
  try {
    const userData = await fetch(url2);
    const userResult = await userData.json();
    //console.log(userResult);

    modalCont.style.display = "flex";

    getUser(userResult, modalCont, modalPost, close);
  } catch (error) {
    //console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}
