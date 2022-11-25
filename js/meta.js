export function metaTags(verseHead, userName, link, verse, feat) {
  document.querySelector(".hide_section").className = "cmmnts_sctn";
  document.title = "My Devotion" + "|" + verseHead + "|" + userName;
  document
    .querySelector("meta[property='og:url']")
    .setAttribute("content", link);
  document
    .querySelector("meta[property='og:title']")
    .setAttribute("content", document.title);
  document
    .querySelector("meta[property='og:description']")
    .setAttribute("content", verse);
  document
    .querySelector("meta[property='og:image']")
    .setAttribute("content", feat);
  document
    .querySelector("meta[property='og:image:secure_url']")
    .setAttribute("content", feat);
}
