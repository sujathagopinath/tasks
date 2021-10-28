import React, { useState } from "react";
import axios from "axios";

const Images = () => {
    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });

    const handleInputChange = (e) => {
        setuserInfo({
            ...userInfo,
            file: e.target.files[0],
            filepreview: URL.createObjectURL(e.target.files[0])
        })
    }

    const [issucces, setsuccess] = useState("")
    const Submit = async () => {
        const formdata = new FormData();
        formdata.append('avatar', userInfo.file);

        axios.post("http://localhost:8000/imageupload", formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(res => {
                console.warn("res", res);
                if (res.data.issucces === 1) {
                    setsuccess("Image upload successfully");
                }

            })
    }
    return (
        <div>
            <h2>Upload Images</h2>
            {issucces !== null ? <h4> {issucces} </h4> : null}
            <div className="form-row">
                <label className="text-white">Select Image :</label>
                <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
            </div>
            <div>
                <button type="submit" className="btn btn-dark" onClick={() => Submit()}>Upload</button>
            </div>
            {userInfo.filepreview !== null ?
                <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                : null}
        </div >
    )
}

export default Images