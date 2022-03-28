class Link {
    constructor(name) {
        this.name = name;
    }
    setdata(value) {
        localStorage.setItem(this.name, value);
    }
    getdata() {
        return localStorage.getItem(this.name);
    }
    checklink() {
        let link = this.getdata();
        let geturl = new URLSearchParams(window.location.search);
        let link = geturl.get("k");
        if (link == "/init") {
            this.initlink();
        } else {
            if (link != null && link.charAt(0) == "h" && link.charAt(1) == "t") {
                showdiv.style.height = 0;
                this.loadlink();
            } else {
                this.initlink();
            }
        }
    }
    loadlink() {
        let link = this.getdata();
        if (link != null && link.charAt(0) == "h" && link.charAt(1) == "t") {
            var script = document.createElement("script");
            script.onload = function () {
                obj = JSON.parse(data);
            };
            script.src = link;
            document.getElementsByTagName("head")[0].appendChild(script);
            showdiv.style.height = "fit-content";
            showtext.innerHTML = "Datenbank geladen!";
        }
    }
    initlink() {
        showtext.innerHTML = "Bitte Initialisierung durchführen!";
        searchbar.placeholder = "Bitte Link einfügen!";
        gobutton.onclick = function () {
            initlink();
        };
        const onsuccess = (decodedText, decodedResult) => {
            this.setdata(decodedText);
            cam.stopfilm();
            this.loadlink();
            gobutton.onclick = function () {
                ManualID();
            };
            searchbar.placeholder = "ID-Eingeben..";
        };
        cam.film(onsuccess);
    }
}
