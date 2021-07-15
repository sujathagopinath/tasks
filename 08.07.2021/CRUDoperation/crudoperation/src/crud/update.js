import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { updateName, getName } from './api';
import Loading from './loading';
import FormElement from './form';


const Update = ({ history, match }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadName();
    }, []);
    const loadName = () => {
        getName(match.params.id).then((d) =>
            setName(d.data.name));
    };
    console.log("params", match.params.id);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateName(match.params.id, { name }).then((res) => {
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is updated`);
            history.push("/");

        }).catch((err) => {
            setLoading(false);
            console.log("error", err);
            if (err.response.status === 400) toast.error(err.response.data);

        });

    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {loading ? (
                        <Loading />) : (

                        <h4>Update Data</h4>)}
                    <FormElement handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />

                </div>
            </div>

        </div>
    )
}
export default Update;