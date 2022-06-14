import * as Hapi from '@hapi/hapi'

export interface userRequest extends Hapi.Request {
    payload: {
        listLatLon: String,
        startTime: Date,
        endTime: Date,
        compType: String,
        featureType: String,
        propertyName: String

    }
}

