class Link {
    constructor(name) {
        this.cookiename = name;
    }
    setcookie(value, days) {
        this.cookievalue = value;
        this.cookiedays = days;

        const d = new Date();
        d.setTime(d.getTime() + this.cookiedays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = this.cookiename + "=" + this.cookievalue + ";" + expires + ";path=/";
    }
    getcookie() {
        let mycookiename = this.cookiename + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(mycookiename) == 0) {
                return c.substring(mycookiename.length, c.length);
            }
        }
        return null;
    }
    checkcookie() {
        let cookiedata = this.getcookie();
        let geturl = new URLSearchParams(window.location.search);
        let link = geturl.get("k");
        if (link == "/init") {
            this.initlinkcookie();
        } else {
            if (cookiedata != null && cookiedata.charAt(0) == "h" && cookiedata.charAt(1) == "t") {
                showdiv.style.height = 0;
                this.loadcookie();
            } else {
                this.initlinkcookie();
            }
        }
    }
    loadcookie() {
        let cookiedata = this.getcookie();
        if (cookiedata != null && cookiedata.charAt(0) == "h" && cookiedata.charAt(1) == "t") {
            var script = document.createElement("script");
            script.onload = function () {
                obj = JSON.parse(data);
            };
            script.src = cookiedata;
            document.getElementsByTagName("head")[0].appendChild(script);
            showdiv.style.height = "fit-content";
            showtext.innerHTML = "Datenbank geladen!";
            console.log(this.getcookie());
        }
    }
    initlinkcookie() {
        showtext.innerHTML = "Bitte Initialisierung durchführen!";
        searchbar.placeholder = "Bitte Link einfügen!";
        gobutton.onclick = function () {
            initlink();
        };
        const onsuccess = (decodedText, decodedResult) => {
            this.setcookie(decodedText, 90);
            cam.stopfilm();
            this.loadcookie();
            gobutton.onclick = function () {
                ManualID();
            };
            searchbar.placeholder = "ID-Eingeben..";
        };
        cam.film(onsuccess);
    }
}