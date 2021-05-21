/** @type {import('bili').Config} */
module.exports = {
    banner: true,
    output: {
        extractCSS: false,
        path: './dist'
    },
    plugins: {
        vue: true,
        babel: false
    },
    input: './src/components/BlockEditor/index.js'
};