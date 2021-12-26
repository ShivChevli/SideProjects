document.addEventListener("DOMContentLoaded", function () {
    var r = document.querySelector(":root");
    console.log(r.style.setProperty("--text-color", "#fff"));
    console.log(r.style.setProperty("--bg-color-main", "#610CFF"));
    console.log(r.style.setProperty("--bg-color-alter", "#fff"));
    console.log(r.style.setProperty("--text-alter", "#000"));
    console.log(r.style.setProperty("--item", "#dddddd"));

    document.getElementById('theme').onclick = function () {

        if (r.style.getPropertyValue("--text-color") == "#fff") {
            r.style.setProperty("--text-color", "#a85EeF");
            r.style.setProperty("--bg-color-main", "#292929");
            r.style.setProperty("--bg-color-alter", "#121212");
            r.style.setProperty("--text-alter", "#d0d0d0");
            r.style.setProperty("--item", "#444444");
        }
        else {
            r.style.setProperty("--text-color", "#fff");
            r.style.setProperty("--bg-color-main", "#610CFF");
            r.style.setProperty("--bg-color-alter", "#ffff");
            r.style.setProperty("--text-alter", "#000");
            r.style.setProperty("--item", "#dddddd");
        }
        // console.log(r.style.setProperty("--text-color", "#000"));
    }

    document.querySelectorAll(".pdf").forEach(pdf => {
        pdf.onclick = function () {
            console.log(pdf.children[0]);
            pdf.children[0].height = "720px";
            pdf.children[0].width = "1200px";
        }
    });

    const date = new Date();
    document.getElementById("date").innerText = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    document.querySelectorAll(".add").forEach(btn => {
        btn.onclick = function () {
            console.log(btn);
            document.getElementById("single-section").style.display = "none";
            document.getElementById("multi-section").style.display = "block";
        }
    })

})

function createSuggestions(data) {

    let div = document.createElement("div");
    div.classList.add("suggetion-list-item");
    div.innerHTML = `\
        <p class='text'>${data}</p>\
        <button class='add button-remove' >\
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>\
                <path d='M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z'></path>\
            </svg>\
        </button >`;
    document.querySelector(".suggetion-container").appendChild(div);
}

function createListItem(data) {
    let div = document.createElement("div");
    div.classList.add("suggetion-list-item");
    div.innerHTML = `\
        <p class='text'>${data}</p>\
        <button class='add button-remove' >\
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>\
                <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                <path
                    d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z">
                </path>
            </svg>\
        </button >`;
    document.querySelector(".single-container").appendChild(div);
}

function createRecentList(data) {
    let div = document.createElement("div");
    div.classList.add("suggetion-list-item");
    div.innerHTML = `\
        <p class='text'>${data}</p>\
        <button class='add button-remove' >\
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>\
                <path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path>\
            </svg>\
        </button >`;
    document.querySelector(".single-container").appendChild(div);
}

function createFormElement(type, name, lable = "", id = "") {
    let div = document.createElement("div");
    div.classList.add("form-element-box");
    let formDiv = document.createElement("div");
    formDiv.classList.add("form-control");
    formDiv.innerHTML = `<input type="${type}" class="from-element" name="${name}">`;
    if (lable != "") {
        let l = document.createElement('label');
        l.classList.add('from-lable');
        l.innerHTML = lable;
        div.appendChild(l);
        l.id = id;
    }
    div.appendChild(formDiv);
    document.querySelector(".section2").appendChild(div);
}