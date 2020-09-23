const softwareTriggerEl = document.querySelector(".software-tab");
const analyticsTriggerEl = document.querySelector(".analytics-tab");
const publicationsTriggerEl = document.querySelector(".publications-tab");

function getTabularContent() {
    softwareTriggerEl.addEventListener("click", function () {
        console.log("hello")
        return "hello world these are my software projects"
    })
    analyticsTriggerEl.addEventListener("click", function () {
        return "hello world these are my software projects"
    })
    publicationsTriggerEl.addEventListener("click", function () {
        return "hello world these are my software projects"
    })
}

export default getTabularContent();



