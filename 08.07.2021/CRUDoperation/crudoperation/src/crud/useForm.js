import { useState } from "react";

const useForm = () => {
    const [state, setstate] = useState({});

    const handleChange = e => {
        setstate(state => ({ ...state, [e.target.name]: e.target.value }))
    }

    return [state, handleChange];
}

export default useForm;