import { message } from "./message/message.js";
import { getUser } from "./home/modal.js";

const latestPost = document.querySelector(".blg_post_cont");
const showMore = document.querySelector(".show_more");
const hideAll = document.querySelector(".hide_all");
hideAll.className = "hideBtn";

const modalCont = document.getElementById("modal");
const modalPost = document.querySelector(".modal_post");
const close = document.querySelector(".close");
modalCont.style.display = "none";

const url1 = "https://tonix.site/daily-devotion/wp-json/wp/v2/posts";
console.log(url1);

async function apiCall() {
  try {
    const post = await fetch(url1);
    const result = await post.json();
    console.log(result);

    latestPost.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      const post = result[i];
      const content = post.content.rendered;
      console.log(content);
      const pic = post._links.author[0].href;
      console.log(pic);

      latestPost.innerHTML = `<div class="hide">${content}</div>`;
      gravatarApi(pic, post);
    }
  } catch (error) {
    console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}

apiCall();

async function gravatarApi(pic, post) {
  try {
    console.log(post.id);
    const parag = document.querySelector(
      ".wp-block-group__inner-container"
    ).innerHTML;
    console.log(parag);
    const userGravatar = await fetch(pic);
    const gravatarResult = await userGravatar.json();
    console.log(gravatarResult);

    const userName = gravatarResult.name;

    console.log(userName);

    const userProfile = gravatarResult.avatar_urls[96];
    console.log(userProfile);

    let newDate = post.date;
    newDate = new Date(newDate).toUTCString();
    newDate = newDate.split(" ").slice(0, 4).join(".");

    latestPost.innerHTML += `<div class="blg_mn_pst_cntnr">
        <div class="blg_pst_hd pst_hd">
        <button class="usr_prfl_pc" value="${post.author}"><label><img src="${userProfile}"></label></button>
          <h4>${userName}</h4>
        </div>
        <div>
            <div>
                <div class="date"><p class="publish_date">Published Date :</p> <p class="date_date"> ${newDate}</p></div>
                <h1 class="blg_title">${post.title.rendered}</h1>
                <hr>
                <div class="blg_paragraph">
                    ${parag}
                </div>
            </div>
            <div class="blg_pst_cta pst_cta">
                <a href="blogspecific.html?id=${post.id}" class="rd_nw_cta blg_cta">Read Now</a>
            </div>
        </div>
    </div>`;
    const authName = document.querySelectorAll(".blg_title");
    console.log(authName);
    const usrPc = document.querySelectorAll(".usr_prfl_pc");
    console.log(usrPc);
    usrPc.forEach((userX) => {
      userX.onclick = function () {
        const userId = userX.value;
        const url2 =
          "https://tonix.site/daily-devotion/wp-json/wp/v2/users/" + userId;
        console.log(url2);
        userInfo(url2);
      };
    });

    hidePost();
    hiddenPost();
  } catch (error) {
    console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}

async function userInfo(url2) {
  try {
    const userData = await fetch(url2);
    const userResult = await userData.json();
    console.log(userResult);

    modalCont.style.display = "flex";

    getUser(userResult, modalCont, modalPost, close);
  } catch (error) {
    console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}

function hidePost() {
  const posted = document.querySelectorAll(".blg_mn_pst_cntnr");
  console.log(posted);
  console.log(hideAll);
  hideAll.className = "hideBtn";

  for (let i = 0; i < posted.length; i++) {
    if (i >= 3) {
      posted[i].className = "blg_hide";
    }
  }
}

function hiddenPost() {
  let y = 0;
  console.log(showMore);

  showMore.onclick = function () {
    showPost((y += parseInt(showMore.value)));
  };

  hideAll.onclick = function () {
    document.querySelector(".hideBtn").className = "show_more";
    y = 0;
    hidePost();
  };

  const blogHide = document.querySelectorAll(".blg_hide");
  console.log(blogHide);

  function showPost(x) {
    console.log(x);
    for (let i = 0; i < blogHide.length; i++) {
      if (i < x) {
        blogHide[i].className = "blg_mn_pst_cntnr";
      }
      if (x >= blogHide.length) {
        document.querySelector(".hideBtn").className = "hide_all";
        showMore.className = "hideBtn";
      }
    }
  }
}
