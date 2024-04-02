import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

export default function telMask() {
    const input = document.getElementById("tel");

    const iti = intlTelInput(input, {
        initialCountry: "auto",
        strictMode: false,
        autoPlaceholder: "aggressive",
        showSelectedDialCode: false,
        utilsScript: "../js/utils/mask/utils.js", //ленивая загрузка
        geoIpLookup: function (callback) {
            fetch("https://ipapi.co/json")
                .then(function (res) { return res.json(); })
                .then(function (data) { callback(data.country_code); })
                .catch(function () { callback(); });
        }
    });

    // Слушаем изменения в поле ввода номера телефона
    input.addEventListener('input', function () {
        var formattedNumber = intlTelInputUtils.formatNumber(iti.getNumber(), iti.getSelectedCountryData().iso2, iti.getSelectedCountryData().iso2 === 'ru' ? intlTelInputUtils.numberFormat.NATIONAL : intlTelInputUtils.numberFormat.INTERNATIONAL);
        input.value = formattedNumber;
    });
};



