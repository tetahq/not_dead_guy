const path = require(`path`)
const alias = require(`./aliases`)

const SRC = `./src`
const aliases = alias(SRC)

const resolvedAliases = Object.fromEntries(Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)]))

module.exports = {
    webpack: {
        alias: resolvedAliases,
    },

    style: {
        postcss: {
            mode: 'extends' /* (default value) */ || 'file',
            plugins: [require('postcss-import'), require('postcss-custom-media')],
            env: {
                autoprefixer: {
                    /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */
                    flexbox: 'no-2009',
                },
                stage: 3 /* Any valid stages: https://cssdb.org/#staging-process. */,
                features: {
                    /* Any CSS features: https://preset-env.cssdb.org/features. */
                    'custom-properties': false,
                },
            },
            loaderOptions: {
                /* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */
            },
        },
    },
}
