import { message } from "./message/message.js";

const postCont = document.querySelector(".post_cont");
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

async function apiCall() {
  try {
    const post = await fetch(url1);
    const result = await post.json();
    console.log(result);

    const comment = await fetch(url2);
    const comResult = await comment.json();
    console.log(comResult);
    const cmmnts = ["No comments"];
    comResult.forEach((comResult) => {
      let comms = comResult.content.rendered;
      cmmnts.push(comms);
    });
    // if (comResult.length >= 1) {
    //   comResult.forEach((comResult) => {
    //     let comms = comResult.content.rendered;
    //     cmmnts.push(comms);
    //   });
    // }
    console.log(cmmnts[1]);
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
                        <div class="feat_img">
                            <img src="${feat}">
                        </div>
                        <div>
                            <a href="#" class="usr_prfl_pc"><img src="${pic}"></a>
                            <h4>${userName}</h4>
                            <div class="date"><p class="publish_date">Published Date :</p> <p class="date_date"> ${newDate}</p></div>
                        </div>
                        <hr>
                        <div>
                            <h1>${result.title.rendered}</h1>
                        </div>
                        <div class="bible">
                            <p class="verse">${verse}</p>
                            <h2>- ${verseHead}</h2>
                        </div>
                        <div>
                            ${parag}
                        </div>
                        <div>
                            <h2>Comments :</h2>
                            <div>
                               ${cmmnts[1]}
                            </div>
                        </div>
                        <div>
                            <h3>Add Comments :</h3>
                            <form>
                                <div class="required">
                                    <label>Fullname (Required)<input name="fullname" id="fullname"/></label>
                                    <div class="infoTxt">Ex. John Doe</div>
                                    <div class="formError" id="fullnameError">Please enter your fullname</div>
                                </div>
                                <div class="required">
                                    <label>Email (Required)<input name="email" id="email"/></label>
                                    <div class="infoTxt">Ex. Johndoe@yahoo.com</div>
                                    <div class="formError" id="emailError">Please enter a valid email address</div>
                                </div>
                                <div class="required">
                                    <textarea id="comments"  placeholder="Write your comments here..."></textarea>
                                    <div class="formError" id="commentError">Please write a message, maximum of 200 character</div>
                                </div>
                                <button>Submit</button>
                            </form>
                        </div>

    </div>`;
  } catch (error) {
    console.log(error);
    postCont.innerHTML = message("error", error);
  }
}

apiCall();
