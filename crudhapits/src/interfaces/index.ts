import * as Hapi from '@hapi/hapi'

export interface ILoginRequest extends Hapi.Request {
    payload: {
        designation: String,
        empname: String
        age: Number,
    }
}
export interface AddRequest extends Hapi.Request {
    payload: {
        name: String,
        email: String,
        redis: any
    }
}

export interface Config {
    port: Number,
    host: any
}