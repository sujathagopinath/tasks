import * as Hapi from '@hapi/hapi'

export interface ILoginRequest extends Hapi.Request {
    payload: {
        custName: String,
        custEmail: String
        custPassword: String,
        collections: String

    }
}

export type IAuthRequest = ILoginRequest & {
    headers: { authorization: string };

};
