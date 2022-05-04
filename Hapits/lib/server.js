'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.init = exports.server = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const joi_1 = __importDefault(require("@hapi/joi"));
const init = function () {
    return __awaiter(this, void 0, void 0, function* () {
        exports.server = hapi_1.default.server({
            port: process.env.PORT || 4000,
            host: 'localhost',
        });
        // Routes will go here
        function index(request) {
            console.log("Processing request", request);
            return "Hello!.";
        }
        const plugin = {
            name: 'example',
            register: (server, options) => __awaiter(this, void 0, void 0, function* () {
                const bind = {
                    message: 'hello'
                };
                server.bind(bind);
                server.route({
                    method: 'GET',
                    path: '/plugin',
                    handler: (_, h) => {
                        return h.response({ up: true }).code(200);
                    },
                });
            })
        };
        exports.server.route([
            {
                method: "GET",
                path: "/",
                handler: index
            },
            {
                method: ["GET", "POST"],
                path: "/method",
                handler: (request, reply) => {
                    return ("Got " + request.method + " method");
                }
            },
            {
                method: "GET",
                path: "/questions/{id}",
                handler: (request, reply) => {
                    return ("Question requested is: " + request.params.id);
                }
            },
            {
                method: "GET",
                path: "/users/{userId?}",
                handler: (request, reply) => {
                    if (request.params.userId) {
                        return ("user id is: " + request.params.userId);
                    }
                    else {
                        return ("will show user collection");
                    }
                }
            },
            // {
            //     method: 'GET',
            //     path: '/',
            //     handler: (_, h: Hapi.ResponseToolkit) => {
            //         return h.response({ up: true }).code(200)
            //     },
            // }
            {
                method: 'POST',
                path: '/validate',
                options: {
                    validate: {
                        payload: joi_1.default.object({
                            username: joi_1.default.string().required(),
                            password: joi_1.default.string().required(),
                        }),
                    }
                },
                handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log("request", request.payload);
                    }
                    catch (error) {
                        return h.response('error').code(500);
                    }
                }),
            }
        ]);
        exports.server.register(plugin);
        return exports.server;
    });
};
exports.init = init;
const start = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Listening on port 4000");
        return exports.server.start();
    });
};
exports.start = start;
process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
