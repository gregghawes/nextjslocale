module.exports = {
    reactStrictMode: true,
    trailingSlash: true, // this will add a trailing slash to then end of the URl (this is better for Google Search Console URL properties)
    i18n: {
        locales: ['en-us', 'en-gb'], //do these lowercase so that the URL isn't capitalised 
        defaultLocale: 'en-us', //the default locale will appear on the root domain
        localeDetection: false, //setting this to true will do a JS redirect based on the users geo
        // domains: [ //if other languages are on seperate domains
        //     {
        //       domain: 'example.com',
        //       defaultLocale: 'en-US',
        //     },
        //     {
        //       domain: 'example.nl',
        //       defaultLocale: 'nl-NL',
        //     },
        //     {
        //       domain: 'example.fr',
        //       defaultLocale: 'fr',
        //       // an optional http field can also be used to test
        //       // locale domains locally with http instead of https
        //       http: true,
        //     },
        // ],
    }
}