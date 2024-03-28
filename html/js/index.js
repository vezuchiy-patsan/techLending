import i18next from "i18next";
import I18nXHR from 'i18next-xhr-backend'
import locI18next from 'loc-i18next'
import LngDetector from 'i18next-browser-languagedetector'


// Инициализация i18next
i18next
    .use(I18nXHR)
    .use(LngDetector)
    .init({
        fallbackLng: 'en',
        whitelist: ['en', 'ru'],
        preload: ['en', 'ru'],
        ns: 'users',
        defaultNS: 'users',
        fallbackNS: false,
        debug: true,
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
        loci18n('.users');

    });


// export { loci18n as loci18n, i18next as i18n };

