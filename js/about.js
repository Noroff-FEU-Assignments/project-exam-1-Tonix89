const modalCont = document.getElementById("abt_modal");
const modalPost = document.querySelector(".modal_post");
const close = document.querySelector(".close");
modalCont.style.display = "none";
const myPhoto = document.querySelector(".my_photo");

myPhoto.onclick = function () {
  console.log(myPhoto.src);
  console.log(modalPost);
  modalCont.style.display = "flex";
  modalPost.innerHTML = `<div class="user_info"><img src="${myPhoto.src}"> </div>`;
  close.onclick = function () {
    modalCont.style.display = "none";
  };
};
