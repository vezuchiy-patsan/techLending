import i18next from "i18next";
import I18nXHR from 'i18next-xhr-backend'
import locI18next from 'loc-i18next'
import LngDetector from 'i18next-browser-languagedetector'
import 'animate.css';
import telMask from "./utils/telMask";
import { CountUp } from "countup.js";
import countUp from "./animation/countUp";



const url = document.location.pathname;

if (url.includes('/en/')) {
    // Инициализация i18next
    i18next
        .use(I18nXHR)
        .use(LngDetector)
        .init({
            fallbackLng: 'en',
            whitelist: ['en'],
            preload: ['en'],
            ns: 'users',
            defaultNS: 'users',
            fallbackNS: false,
            debug: false,
            backend: {
                loadPath: '/i18n/{{lng}}/{{ns}}.json',
            },
            lng: 'en',
        }, function (err, t) {
            if (err) return console.error('error: ', err);
            // Инициализация locI18next после инициализации i18next
            const loci18n = locI18next.init(i18next, {
                selectorAttr: 'data-i18n',
                optionsAttr: 'data-i18n-options',
                useOptionsAttr: true
            });
            loci18n('body');

        });
}

var element = document.querySelector(".loading-text-words:last-child");
element.addEventListener("animationiteration", function () {
    const loader = document.querySelector(".loading");
    if (!loader.classList.contains("loader_none")) {
        
        setTimeout(countUp(), 200);
        loader.classList.add("loader_none");
    }
}, false);



telMask();

function createLightboxWithProps(type, sources) {
    let lightbox = new FsLightbox();
    lightbox.props.type = type;
    lightbox.props.sources = sources;
    return lightbox;
}

const lightbox = () => {
    const imagesSources = {
        "azs": {
            sources: ["../images/gallery/azs/new_azs1.png", "../images/gallery/azs/new_azs2.png",
                "../images/gallery/azs/new_azs3.png"],
        },
        "mon": {
            sources: ["../images/gallery/monitoring/mon3.png",
                "../images/gallery/monitoring/mon4.png", "../images/gallery/monitoring/mon5.png", "../images/gallery/monitoring/mon6.png"],
        },
        "ware": {
            sources: ["../images/gallery/warehouse/ware1.png",
                "../images/gallery/warehouse/ware2.png", "../images/gallery/warehouse/ware3.png"],
        }
    }

    const imgPills = document.getElementById("pills-tabContentService");
    const images = imgPills.querySelectorAll(".services__section_block_img img");

    for (const key in imagesSources) {
        if (imagesSources.hasOwnProperty(key)) {
            const imgSources = imagesSources[key].sources;
            // Создание экземпляра FsLightbox для каждого набора изображений
            const lightbox = createLightboxWithProps("image", imgSources);

            imagesSources[key].lightbox = lightbox;
        }
    }

    [...images].forEach((img) => {
        img.addEventListener("click", function () {
            imagesSources[this.dataset.id].lightbox.open();
        })

    });


};

document.addEventListener("DOMContentLoaded", lightbox);



// export { loci18n as loci18n, i18next as i18n };

