module.exports = {
    pages: {
        platform: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'platform.html',
        },

        tutor: {
            entry: 'tutor/src/main.js',
            template: 'tutor/public/index.html',
            filename: 'tutor.html',
        }
    },
    lintOnSave: false,   
}