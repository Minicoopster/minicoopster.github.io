
function init() {
    document.querySelectorAll("img").forEach(img => img.addEventListener("click", activate));
    document.querySelector("button").addEventListener("click", newRound);
    document.addEventListener("keyup", clickNext);
}

function activate(event) {
    document.querySelectorAll('#' + event.target.id + '.active')
        .forEach(img => img.className = img.className.replace(" active", ""));
    event.target.className += " active";
}

function newRound() {
    let roundCounter = document.querySelector("input");
    roundCounter.value = Number(document.querySelector("input").value) + 1;

    let strong = document.querySelectorAll("img.strong.active");
    let waning = document.querySelectorAll("img.waning.active");

    strong.forEach(elem => {
        elem.className = elem.className.replace(" active", "");
        document.querySelector("#" + elem.id + ".waning").className += " active";
    });

    waning.forEach(elem => {
        elem.className = elem.className.replace(" active", "");
        document.querySelector("#" + elem.id + ".consumed").className += " active";
    });
}

function clickNext(event) {
    if (event.code === "Enter" || event.code === "Space") {
        document.querySelector("button").click();
    }
}


window.addEventListener("load", init);