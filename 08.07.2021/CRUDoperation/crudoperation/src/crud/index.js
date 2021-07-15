import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createName, getNames, removeName } from './api';
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Loading from './loading';
import FormElement from './form';
const Crud = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [names, setNames] = useState([]);

    useEffect(() => {
        loadNames();

    }, []);

    console.log("process.env.REACT_API_APP", process.env.REACT_API_APP);

    const loadNames = () => {
        getNames().then((name) => setNames(name.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createName({ name }).then((res) => {
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is created`);
            loadNames();
        })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }
    const handleRemove = (id, name) => {
        if (window.confirm("Are you sure want to delete ?")) {
            setLoading(true);
            removeName(id).then((res) => {
                setLoading(false);
                toast.error(`${name} is deleted`);
                loadNames();
            })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);

                })
        }

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {loading ? (
                        <Loading />) : (
                        <>
                            <h4 className="text-center">CRUD Operation</h4>
                            <FormElement handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                            />
                            <div className="border row mx-8 align-items-center">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <b>Name</b>
                                    </li>
                                </ul>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <b>Id</b>
                                    </li>
                                </ul>

                                <ul>
                                    <li className="list-group-item">
                                        <b>Action</b>
                                    </li>
                                </ul>
                            </div>
                            {names && names.map((t) => (
                                <div className="border row mx-6 align-items-center" key={t.id}>

                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            {t.name}
                                        </li>
                                    </ul>

                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            {t.id}
                                        </li>
                                    </ul>


                                    <span onClick={() => handleRemove(t.id, t.name)}>
                                        <DeleteOutlined className="text-success" style={{ width: '60px' }} />

                                    </span>
                                    <Link to={`/update/${t.id}`}>
                                        <span onClick={() => console.log("")}>
                                            <EditOutlined className="text-warning" style={{ width: '50px' }} />

                                        </span>
                                    </Link>

                                </div>
                            ))}
                        </>
                    )}

                </div>

            </div>

        </div>
    )
}
export default Crud;