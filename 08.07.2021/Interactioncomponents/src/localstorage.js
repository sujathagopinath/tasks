import { useState } from "react";

function Uselocalstorage(key, initialValue) {
    const [Storedvalue, setStoredvalue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
    })

    const setValue = value => {
        try {
            setStoredvalue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }
    return [Storedvalue, setValue]
}
export default Uselocalstorage;