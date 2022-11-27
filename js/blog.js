import { message } from "./message/message.js";
import { getUser } from "./home/modal.js";

const blogPost = document.querySelector(".blg_post_cont");
const totalResult = document.querySelector(".total_result");
const showMore = document.querySelector(".show_more");
const searchCont = document.querySelector(".search_cont");
const hideAll = document.querySelector(".hide_all");
hideAll.className = "hideBtn";

const modalCont = document.getElementById("modal");
const modalPost = document.querySelector(".modal_post");
const close = document.querySelector(".close");
modalCont.style.display = "none";

const url1 =
  "https://tonix.site/daily-devotion/wp-json/wp/v2/posts?per_page=100";
//console.log(url1);

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

//console.log(params);

const search = params.get("search");

// console.log(search);
let callOnce = false;

async function apiCall() {
  try {
    const postApi = await fetch(url1);
    const result = await postApi.json();
    console.log(result);

    blogPost.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      const post = result[i];
      const content = new DOMParser().parseFromString(
        post.content.rendered,
        "text/html"
      ).body.childNodes;
      console.log(content);
      // console.log(content);
      const authorLink = post._links.author[0].href;
      const author = await fetch(authorLink);
      const authorResult = await author.json();

      const userName = authorResult.name;
      console.log(userName);

      const userPic = authorResult.avatar_urls[96];
      console.log(userPic);

      const catLink = post._links["wp:term"][0].href;
      const catApi = await fetch(catLink);
      const catResult = await catApi.json();

      let newDate = post.date;
      newDate = new Date(newDate).toUTCString();
      newDate = newDate.split(" ").slice(0, 4).join(".");

      blogPost.innerHTML += `<div class="blg_mn_pst_cntnr">
        <div class="blg_pst_hd pst_hd">
        <button class="usr_prfl_pc" value="${post.author}"><label><img src="${userPic}"></label></button>
          <h4>${userName}</h4>
        </div>
        <div>
            <div>
                <div class="date"><p class="publish_date">Published Date :</p> <p class="date_date"> ${newDate}</p></div>
                <h1 class="blg_title">${post.title.rendered}</h1>
                <hr>
                <div class="blg_paragraph">
                    ${content[4].innerHTML}
                </div>
            </div>
            <div class="blg_pst_cta pst_cta">
                <a href="blogspecific.html?id=${post.id}" class="rd_nw_cta blg_cta">Read Now</a>
            </div>
            <div class="hidden">${catResult[0].name}</div>
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
      if (search) {
        hiddenFilteredPost();
      } else {
        hidePost();
      }

      // blogPost.innerHTML = `<div class="hide">${content}</div>`;
      // gravatarApi(pic, post);
    }
  } catch (error) {
    //console.log(error);
    blogPost.innerHTML = message("error", error);
  }
}
apiCall();

// async function gravatarApi(pic, post) {
//   try {
//     // console.log(post.id);
//     const parag = document.querySelector(
//       ".wp-block-group__inner-container"
//     ).innerHTML;
//     const category = document.querySelector(".taxonomy-category").innerHTML;
//     //console.log(parag);
//     const userGravatar = await fetch(pic);
//     const gravatarResult = await userGravatar.json();
//     //console.log(gravatarResult);

//     const userName = gravatarResult.name;

//     //console.log(userName);

//     const userProfile = gravatarResult.avatar_urls[96];
//     //console.log(userProfile);

//     let newDate = post.date;
//     newDate = new Date(newDate).toUTCString();
//     newDate = newDate.split(" ").slice(0, 4).join(".");

//     blogPost.innerHTML += `<div class="blg_mn_pst_cntnr">
//         <div class="blg_pst_hd pst_hd">
//         <button class="usr_prfl_pc" value="${post.author}"><label><img src="${userProfile}"></label></button>
//           <h4>${userName}</h4>
//         </div>
//         <div>
//             <div>
//                 <div class="date"><p class="publish_date">Published Date :</p> <p class="date_date"> ${newDate}</p></div>
//                 <h1 class="blg_title">${post.title.rendered}</h1>
//                 <hr>
//                 <div class="blg_paragraph">
//                     ${parag}
//                 </div>
//             </div>
//             <div class="blg_pst_cta pst_cta">
//                 <a href="blogspecific.html?id=${post.id}" class="rd_nw_cta blg_cta">Read Now</a>
//             </div>
//             <div class="hidden">${category}</div>
//         </div>
//     </div>`;
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
//     if (search) {
//       hiddenFilteredPost();
//     } else {
//       hidePost();
//     }
//   } catch (error) {
//     console.log(error);
//     blogPost.innerHTML = message("error", error);
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
    blogPost.innerHTML = message("error", error);
  }
}

function hidePost() {
  const posted = document.querySelectorAll(".blg_mn_pst_cntnr");
  // console.log(posted.length);
  //console.log(hideAll);
  hideAll.className = "hideBtn";
  for (let i = 0; i < posted.length; i++) {
    if (i >= 10) {
      posted[i].className = "blg_hide";
    }
  }
  hiddenPost();
}

function hiddenFilteredPost() {
  const posted = document.querySelectorAll(".blg_mn_pst_cntnr");
  // console.log(posted.length);
  //console.log(hideAll);
  hideAll.className = "hideBtn";
  for (let i = 0; i < posted.length; i++) {
    const authorName =
      posted[i].childNodes[1].children[1].innerHTML.toUpperCase();
    const blogTitle =
      posted[i].childNodes[3].children[0].children[1].innerHTML.toUpperCase();
    // console.log(blogTitle);
    const categories =
      posted[i].lastElementChild.lastElementChild.innerText.toUpperCase();
    // console.log(categories);
    if (posted.length === 0) {
      searchCont.style.display = "flex";
    }
    if (
      authorName.indexOf(search.toUpperCase()) > -1 ||
      blogTitle.indexOf(search.toUpperCase()) > -1 ||
      categories.indexOf(search.toUpperCase()) > -1
    ) {
      posted[i].className = "filtered";
      continue;
    } else {
      posted[i].className = "blg_filtered_hide";
    }
  }
  filteringPost();
}

function filteringPost() {
  const filteredPost = document.querySelectorAll(".filtered");
  if (filteredPost.length === 0) {
    searchCont.style.display = "flex";
    showMore.style.display = "none";
  }
  if (filteredPost.length >= 1 && filteredPost.length <= 2) {
    searchCont.style.display = "none";
    showMore.style.display = "none";
    for (let i = 0; i < filteredPost.length; i++) {
      filteredPost[i].style.margin = "20px";
    }
  }
  if (filteredPost.length >= 3) {
    showMore.style.display = "flex";
    for (let i = 0; i < filteredPost.length; i++) {
      if (i >= 3) {
        filteredPost[i].className = "blg_hide";
      }
      hiddenPost();
    }
  }
  if (!callOnce) {
    countResult(filteredPost);
  }
}

function hiddenPost() {
  let y = 0;
  //console.log(showMore);

  showMore.onclick = function () {
    showPost((y += parseInt(showMore.value)));
  };

  hideAll.onclick = function () {
    document.querySelector(".hideBtn").className = "show_more";
    y = 0;
    if (search) {
      callOnce = true;
      hiddenFilteredPost();
    } else {
      hidePost();
    }
  };

  const blogHide = document.querySelectorAll(".blg_hide");
  // console.log(blogHide);

  function showPost(x) {
    //console.log(x);
    if (search) {
      for (let i = 0; i < blogHide.length; i++) {
        if (i < x) {
          blogHide[i].className = "filtered";
        }
        if (x >= blogHide.length) {
          document.querySelector(".hideBtn").className = "hide_all";
          showMore.className = "hideBtn";
          document.querySelector(".hideBtn").style.display = "none";
        }
      }
    } else {
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
}

function countResult(filteredPost) {
  const hiddenBlog = document.querySelectorAll(".blg_hide");
  const totalSearchResult = hiddenBlog.length + filteredPost.length;
  totalResult.innerHTML = `<h3>Total result for "${search}" = ${totalSearchResult}</h3>`;
}
