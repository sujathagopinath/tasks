import { ResponseToolkit } from "@hapi/hapi";
import { dbConfig } from '../config/settings'
import { IAuthRequest } from "../interfaces";

const jwt = require("jsonwebtoken");

export const tokenMiddleware = async (request: IAuthRequest, h: ResponseToolkit, next: any) => {
    let token;
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")
    ) {
        try {
            let token = request.headers.authorization.split(" ")[1];
            jwt.verify(token, dbConfig._instance.jwt.jwt_key, (error: any, decoded: any) => {
                if (error) {
                    return h.response(error).code(404)
                }
                request.pre.decoded = decoded.custId;
            });
        } catch (error: any) {
            return h.response(error).code(404)

        }
    }

    if (!token) {
        return h.response('Not Authorised').code(401)

    }
};



