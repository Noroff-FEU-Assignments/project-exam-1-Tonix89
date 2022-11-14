const modalCont = document.getElementById("abt_modal");
const modalPost = document.querySelector(".modal_post");
const close = document.querySelector(".close");
modalCont.style.display = "none";
const myPhoto = document.querySelector(".my_photo");

const srchForm = document.querySelector(".srch_br");
const searchButton = document.getElementById("srch_bttn");
function searchForm(event) {
  event.preventDefault();

  searchButton.onclick = function () {
    window.location.href = "blog.html";
  };
}
srchForm.addEventListener("submit", searchForm);

myPhoto.onclick = function () {
  // console.log(myPhoto.src);
  // console.log(modalPost);
  modalCont.style.display = "flex";
  modalPost.innerHTML = `<div class="user_info"><img src="${myPhoto.src}"> </div>`;
  close.onclick = function () {
    modalCont.style.display = "none";
  };
};
