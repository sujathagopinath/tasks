import Hapi from '@hapi/hapi'

const plugin: Hapi.Plugin<any> = {
    name: 'app',
    register: async function (server: Hapi.Server) {
        server.route({
            method: 'GET',
            path: '/',
            handler: (_, h: Hapi.ResponseToolkit) => {
                return h.response({ up: true }).code(200)
            },
        })
    },
}

export default plugin