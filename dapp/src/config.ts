const env = process.env.NODE_ENV || 'development'

const Config = {
    nodeEnv: env,
    app: {
        name: 'NotDeadGuy',
    },
    api: {
        // baseUrl: 'https://localhost:5001',
    },
    moralis: {
        appId: '5POF6pFx2LuBeCnVL9Ex0saehrZozpgOnvJRxEau',
        serverUrl: 'https://0usr3efjltej.usemoralis.com:2053/server',
    }
}

export default Config
