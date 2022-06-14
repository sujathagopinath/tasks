import * as soap from 'soap'

export const soapCall: any = new Promise((resolve, reject) => {
    soap.createClient(__dirname + '/../' + '/src/weather.wsdl', (err: any, client: any) => {
        if (err) {
            reject(err)
        }
        else {
            resolve(client)
        }
    })
})








