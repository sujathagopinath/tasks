import axios from 'axios'

export const viewusers = async () => {
    return await axios.get (`${process.env.SERVER_API}`)
}