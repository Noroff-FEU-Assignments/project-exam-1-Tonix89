export function message(messageType = "success", message = "") {
  return `<div ${messageType}">${message}</div>`;
}
