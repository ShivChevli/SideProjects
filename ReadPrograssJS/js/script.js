document.addEventListener("DOMContentLoaded", function () {

    let b = document.getElementsByTagName("body")[0];

    let divp = document.createElement("div");
    let divc = document.createElement("div");

    divp.style.cssText = "position: fixed;top: 0px;left: 0;width: 100%;height: 4px;z-index:5";

    divp.appendChild(divc);

    divc.style.cssText = "position: absolute;top: 0;left: 0;height: 100%;width: 0%;text-decoration: line-through; text-decoration-style: wavy;transition: cubic-bezier(.45, .05, .55, .95) 0ms;background-color: #3983fa;"
    divc.id = "indicator";
    b.appendChild(divp);

    document.addEventListener("scroll", function () {
        let height = document.body.scrollHeight - window.innerHeight;
        let scroll = window.scrollY;
        var w = (scroll * 100 / height);
        divc.style.width = `${w}%`;
    });

})