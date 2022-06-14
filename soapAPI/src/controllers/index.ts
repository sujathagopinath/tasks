import { Request, ResponseToolkit } from '@hapi/hapi'
import { userRequest } from '../interfaces'
import { soapCall } from '../soap'
class personDetails {

    async getData(request: Request, h: ResponseToolkit) {
        const client = await soapCall
        const cornerPointdata = new Promise((resolve, reject) => {
            client.CornerPoints((err: any, data: any) => {
                if (err)
                    reject(err)
                const response = h.response(data);
                return resolve(response)
            })
        })
        return cornerPointdata
    }

    async postData(request: userRequest, h: ResponseToolkit) {
        const client = await soapCall
        const gmlTimeSeries = new Promise((resolve, reject) => {
            client.GmlTimeSeries(request.payload, (err: any, data: any) => {
                console.log(request.payload)
                if (err)
                    reject(err)
                const res = h.response(data)
                return resolve(res)

            })
        })
        return gmlTimeSeries
    }
}

export const Details = new personDetails()