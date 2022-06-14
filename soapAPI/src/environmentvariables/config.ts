import convict from 'convict'

export const Config = convict({
    env: {
        doc: "The application environment.",
        format: ["development", "local", "test"],
        default: "local",
        env: "NODE_ENV"
    },

    hapi: {
        host: {
            doc: "hapi_host",
            format: String,
            default: 'localhost'
        },
        port: {
            doc: "hapi_port",
            format: Number,
            default: 1000
        }
    },

});

var env = Config.get('env');
Config.loadFile('./src/environmentvariables/' + env + '.json');
Config.validate({ allowed: 'strict' });