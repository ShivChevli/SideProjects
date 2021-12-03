document.addEventListener("DOMContentLoaded", () => {

    let msg = document.querySelector(".message");

    document.querySelector('form').onsubmit = function () {
        console.log(this.color.value);
        let d = BlockCreator(this.color.value);
        console.log(d);

        document.querySelector("main").appendChild(d);

        spanArr = document.querySelectorAll(".closeBTN");

        spanArr.forEach(span => {
            span.onclick = function () {
                this.parentElement.remove();
            }
        });

        document.querySelectorAll(".edit-color").forEach(input => {
            input.oninput = function () {
                this.parentElement.style.backgroundColor = input.value;
                this.parentElement.children[0].innerText = input.value;
            }
        });


        document.querySelectorAll("label").forEach(lable => {
            lable.onclick = async function () {
                navigator.clipboard.writeText(this.innerText).
                    then(value => {
                        alert(`Color code Copied : ${this.innerText}`);
                        console.log("Success");
                    })
                    .catch(error => { console.log("Error " + error) });
            }

            lable.onmouseenter = function () {
                msg.style.display = "block";
            }
            lable.onmouseleave = function () {
                msg.style.display = "None";
            }
        })

        return false;
    };


    document.querySelectorAll(".closeBTN").forEach(span => {
        // console.log(span);
        span.onclick = function () {
            this.parentElement.remove();
        }
    });

    document.querySelectorAll(".edit-color").forEach(input => {
        input.oninput = function () {
            this.parentElement.style.backgroundColor = input.value;
            console.log(this.parentElement.children[0].innerText = input.value);
        }
    });

    document.querySelectorAll(".edit-color").forEach(input => {
        input.parentElement.style.backgroundColor = input.value;
        console.log(input.parentElement.children[0].innerText = input.value);
    });

    document.querySelectorAll("label").forEach(lable => {
        lable.onclick = async function () {
            navigator.clipboard.writeText(this.innerText).
                then(value => {
                    alert(`Color code Copied : ${this.innerText}`);
                    console.log("Success");
                })
                .catch(error => { console.log("Error " + error) });
        }
    })
})

function capture() {
    html2canvas(document.querySelector("main")).then(canvas => {
        var data = canvas.toDataURL("download/png");
        console.log(data);
        let img = document.createElement('img');
        img.src = data;
        let section = document.querySelector(".ScreenShot-display");
        section.appendChild(img);
        section.style.display = "flex";
        document.getElementById("download").href = data;
    });
}

document.querySelector(".close-section").onclick = function () {
    this.parentElement.style.display = "none";
    this.parentElement.lastChild.remove();
}

function BlockCreator(c) {
    let div = document.createElement('div');
    div.classList.add('plate');
    div.style.background = c;
    let lable = document.createElement("label");
    lable.innerText = c;
    div.appendChild(lable);
    let closebtn = document.createElement('span');
    closebtn.innerText = "x";
    closebtn.classList.add('closeBTN');
    div.appendChild(closebtn);

    let color = document.createElement('input');
    color.type = "color";
    color.value = c;
    color.classList.add("edit-color");
    div.appendChild(color);
    return div;
}
