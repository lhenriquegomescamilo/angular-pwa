const serviceWorkerBuild = require('workbox-build');

const cacheFiles = [
    '**\/*.{html,json,js,css}',
];

serviceWorkerBuild.generateSW({
    navigateFallback: 'index.html',
    globDirectory: './dist/angular-pwa-manualy',
    globPatterns: cacheFiles,
    swDest: 'dist/angular-pwa-manualy/sw.js',
    runtimeCaching: [{
        // Match any request ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'cacheFirst',

        options: {
            // Use a custom cache name.
            cacheName: 'images',

            // Only cache 10 images.
            expiration: {
                maxEntries: 10,
            },
        },
    }],

}).then(function () {
    console.log('Service Worker generated')
});

