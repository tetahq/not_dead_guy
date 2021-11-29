const aliases = (prefix = `src`) => ({
    components: `${prefix}/components`,
    providers: `${prefix}/providers`,
    hooks: `${prefix}/hooks`,
    styles: `${prefix}/styles`,
    utils: `${prefix}/utils`,
    types: `${prefix}/types`,
    lib: `${prefix}/lib`,
    helpers: `${prefix}/helpers`,
})

module.exports = aliases
