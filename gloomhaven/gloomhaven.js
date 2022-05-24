const x = window.matchMedia("(max-width: 600px)")

function init() {
    document.querySelectorAll("img").forEach(img => img.addEventListener("click", activate));
    document.querySelector("button").addEventListener("click", newRound);
    document.addEventListener("keyup", clickNext);
    showVerticalTable(x)
    x.addListener(showVerticalTable)
}

function activate(event) {
    document.querySelectorAll('#' + event.target.id + '.active')
        .forEach(img => img.className = img.className.replace(" active", ""));
    document.querySelectorAll('#' + event.target.id + '.' + event.target.className)
        .forEach(img => img.className += " active");
}

function newRound() {
    let roundCounter = document.querySelector("input");
    roundCounter.value = Number(document.querySelector("input").value) + 1;

    let strong = document.querySelectorAll("img.strong.active");
    let waning = document.querySelectorAll("img.waning.active");
    console.log(strong)
    console.log(waning)
    strong.forEach((elem, index) => {
        elem.className = elem.className.replace(" active", "");
        document.querySelectorAll("#" + elem.id + ".waning")
            .forEach(img => img.className.contains("active") ? pass : img.className += " active");
    });

    waning.forEach((elem, index) => {
        elem.className = elem.className.replace(" active", "");
        document.querySelectorAll("#" + elem.id + ".consumed")
            .forEach(img => img.className.contains("active") ? pass : img.className += " active");
    });
}

function clickNext(event) {
    if (event.code === "Enter" || event.code === "Space") {
        document.querySelector("button").click();
    }
}

function showVerticalTable(x) {
    if (x.matches) {
        document.querySelector(".tokenvertgrid").style.display = "block"
        document.querySelector(".tokengrid").style.display = "none"
    } else {
        document.querySelector(".tokenvertgrid").style.display = "none"
        document.querySelector(".tokengrid").style.display = "block"
    }
}


window.addEventListener("load", init);