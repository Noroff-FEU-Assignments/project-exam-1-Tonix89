import { message } from "./message/message.js";

const latestPost = document.querySelector(".blg_post_cont");
const showMore = document.querySelector(".show_more");
console.log(showMore);

const url = "http://tonix.site/daily-devotion/wp-json/wp/v2/posts";
console.log(url);

async function apiCall() {
  try {
    const post = await fetch(url);
    const result = await post.json();

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
          <a href="#" class="usr_prfl_pc"><img src="${userProfile}"></a>
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
                <div class="rd_nw_cta">Read Now</div>
            </div>
        </div>
    </div>`;

    const posted = document.querySelectorAll(".blg_mn_pst_cntnr");
    console.log(posted);
  } catch (error) {
    console.log(error);
    latestPost.innerHTML = message("error", error);
  }
}
