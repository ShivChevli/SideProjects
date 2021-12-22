# Quick Addable JS plugin 

It is Quick and easy to use js plugin.to add this plugin into your Page just add this js
<a href="https://shivchevli.github.io/SideProjects/ReadPrograssJS/js/ReadPrograssJS.min.js">script.js</a> file into your page.

or you can built it by your own by Just adding following things into your website

For HTML
```bash
    <div class="read-total">
        <div class="read-progress" id="indicator"> 
        </div>
    </div>
```

for css
```bash
    .read-total{
        position: fixed;
        top: 0px;
        left: 0;
        width: 100%;
        height: 4px;
        z-index:5
    }
    .read-progress{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0%;
        text-decoration: line-through;
        text-decoration-style: wavy;
        transition: cubic-bezier(.45, .05, .55, .95) 0ms;
        background-color: #3983fa;
    }
```

For Javascript

```bash
    document.addEventListener("scroll", function () {
        let height = document.body.scrollHeight - window.innerHeight;
        let scroll = window.scrollY;
        var w = (scroll * 100 / height);
        document.getElementById("indicator").style.width = `${w}%`;
    });
```

Try demo Here <a href="https://shivchevli.github.io/SideProjects/ReadPrograssJS/">Demo</a>

Happy design.