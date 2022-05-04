import * as Hapi from '@hapi/hapi'

export interface ILoginRequest extends Hapi.Request {
    payload: {
        designation: String,
        empname: String
        age: Number,
    }
}