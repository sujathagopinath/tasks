import axios from 'axios'

axios.interceptors.request.use(
    (req) => {
        return req
    },
    (err) => {
        return Promise.reject(err)
    }
)

axios.interceptors.request.use(
    (res) => {
        let data = res?.data?.posts
        // if (res.status == 200) {
        //     console.log("success")
        // }
        return data
    },
    (err) => {
        return Promise.reject(err)
    }
)


