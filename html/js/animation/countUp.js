import { CountUp } from "countup.js";

export default () => {
    const listCount = document.querySelectorAll("section.countAnimate .count");
    const countUpFn = {};
    const options = {
        separator: ' ',
        duration: 3,

    };


    listCount.forEach((val, key) => {
        const inner = parseInt(val.innerText.replace(/\s/g, ""));
        if(val.classList.contains('geograph_count')) {
            options.enableScrollSpy = true;
            options.duration = 2;
        }
        if(inner < 100) options.duration = 4;
        countUpFn[`count${key}`] = new CountUp(val, inner,  options );
        
    })

    for (const [key, value] of Object.entries(countUpFn)) {
        if (!value.error) {
            value.start();
        } else {
            console.error(value.error);
        }
    }

}

