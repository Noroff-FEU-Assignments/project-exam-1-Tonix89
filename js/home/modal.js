export function getUser(userResult, modalCont, modalPost, close) {
  modalPost.innerHTML = `<div class="user_info">
                          <img src="${userResult.avatar_urls[96]}">
                          <h2>${userResult.name}</h2>
                          <h3>About the author :</h3>
                          <p>${userResult.description}</p>
              </div>`;
  modalCont.style.position = "fixed";
  modalCont.style.width = "80%";
  close.onclick = function () {
    modalCont.style.display = "none";
  };
}
