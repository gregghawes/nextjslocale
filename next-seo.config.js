export default {
    titleTemplate: `%s | ${process.env.NEXT_PUBLIC_SITENAME}`,
    defaultTitle: process.env.NEXT_PUBLIC_SITENAME,
    dangerouslySetAllPagesToNoIndex: process.env.NODE_ENV !== 'production', //stop indexing when not in production
    additionalMetaTags: [
        { name: 'viewport', content: 'minimum-scale=1, initial-scale=1, width=device-width' }
    ],
    additionalLinkTags: [
        // add all your icons and manifest files here
    ]
}