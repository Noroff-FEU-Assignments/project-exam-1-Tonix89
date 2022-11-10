import { message } from "./message/message.js";
import { changeScreen } from "./home/changescreen.js";
import { screenSize } from "./home/screen-size.js";

const screenWidth = window.innerWidth;
const mql = window.matchMedia("(max-width: 600px)");

const latestPost = document.querySelector(".post_cont");
const url = "https://tonix.site/daily-devotion/wp-json/wp/v2/posts";
console.log(url);

async function apiCall() {
  try {
    const post = await fetch(url);
    const result = await post.json();

    console.log(result.length);
    latestPost.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      const post = result[i];
      const content = post.content.rendered;
      console.log(content);
      const pic = post._links.author[0].href;
      if (i <= 6) {
        console.log(pic);
        latestPost.innerHTML = `<div class="hide">${content}</div>`;
        gravatarApi(pic, post);
      }
    }
  } catch (error) {
    console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}

apiCall();

mql.addEventListener("change", changeScreen, false);

async function gravatarApi(pic, post) {
  try {
    const verse = document.querySelector(".wp-block-quote cite").innerHTML;
    console.log(verse);
    const verseHead = document.querySelector(".wp-block-quote h2").innerHTML;
    console.log(verseHead);
    console.log(post.length);
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

    latestPost.innerHTML += `<div class="ndx_mn_pst_cntnr fade">
                          <div class="pst_hd">
                            <a href="#" class="usr_prfl_pc"><img src="${userProfile}"></a>
                            <h4>${userName}</h4>
                            <h1>${post.title.rendered}</h1>
                          </div>
                          <div class="bible">
                            <p class="verse">${verse}</p>
                            <h2>- ${verseHead}</h2>
                          </div>
                          <div class="pst_cta">
                            <a href="blogspecific.html?id=${post.id}" class="rd_nw_cta">Read Now</a>
                            <div class="date"><p class="publish_date">Published Date :</p> <p class="date_date"> ${newDate}</p></div>
                          </div>
              </div>`;
    screenSize(screenWidth);
  } catch (error) {
    console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}
