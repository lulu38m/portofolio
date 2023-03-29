var typed = new Typed(".multiple-skills", {
    strings: ["skills", "abilities"],
    typeSpeed: 100,
    backSpeed: 100,
    backdelay: 1500,
    loop: true,
})

function setProgress(progress, progressBar) {
    let width = 0;
    const animate = () => {
        if (width < progress) {
            width++;
            progressBar.style.width = width + '%';
            window.requestAnimationFrame(animate);
        }
    };
    window.requestAnimationFrame(animate);
}

const progressBar1 = document.querySelector('.progress-bar1');
setProgress(50, progressBar1);

const progressBar2 = document.querySelector('.progress-bar2');
setProgress(75, progressBar2);

const progressBar3 = document.querySelector('.progress-bar3');
setProgress(25, progressBar3);

const progressBar4 = document.querySelector('.progress-bar4');
setProgress(30, progressBar4);

const progressBar5 = document.querySelector('.progress-bar5');
setProgress(20, progressBar5);

const progressBar6 = document.querySelector('.progress-bar6');
setProgress(10, progressBar6);

const flagButton = document.getElementById('flagButton');
const flagImg = flagButton.querySelector('img');
const angFlag = 'assets/img/AngFlag.png';
const frFlag = 'assets/img/FrFlag.png';

flagButton.addEventListener('click', () => {
    if (flagImg.src.includes(angFlag)) {
        flagImg.src = frFlag;
    } else {
        flagImg.src = angFlag;
    }
});

const url = 'src/data/lang/';
let languageData;
let language;

const lang_fr = "fr";
const lang_en = "en";

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function init(lang) {
    if (lang != null) {
        localStorage.setItem("language", lang);
    } else if (localStorage.getItem("language") == null) {
        let language = navigator.language;
        if (language.toString().includes(lang_fr)) {
            localStorage.setItem("language", lang_fr);
        } else {
            localStorage.setItem("language", lang_en);
        }
    }
    language = localStorage.getItem("language");

    readTextFile(url + language + ".json", function(text) {
        languageData = JSON.parse(text);
        document.title = languageData["title"]
        loadPage();
    });
}

function loadPage() {
    let collection = document.body.getElementsByTagName("*");
    for (const element of collection) {
        if (element.dataset?.lang !== undefined) {
            const key = element.dataset.lang;
            console.log(languageData, languageData[key]);
            if (languageData[key] != null) {
                if (element.children.length) {
                    element.firstChild.nodeValue = languageData[key];
                } else {
                    element.innerHTML = languageData[key];
                }
            }
        }
    }
}

function changeLanguage(lang) {
    init(lang);
}

window.onload = function () {
    init(null);
}