import React ,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


function FetchApi(){
    const [data, setstate] = useState([])
    const Getapi=()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
//   .then((json) => console.log(json));
.then((json)=>{
    console.log(json);
    setstate(json);
})
    }
    useEffect(()=>{
        Getapi();
    },[]);
    return(
        <div>
            <h1> New Fetch API </h1>
          
            <button onClick={Getapi}>Fetch</button><br/>
            <pre>{JSON.stringify(data,null, 2)}</pre>
       

        {/* <div>
                <ul>
                    {data.map((item) => {
                        <li key={item.id}>{item.title}</li>
                    })}
                </ul>
                <pre>{JSON.stringify({ item })}</pre>

        </div> */}
        </div>
    )
}

ReactDOM.render(<FetchApi />, document.getElementById('root'));

//Fetch API

function Newfetch() {
    const [data1, setData] = useState([]);
    const [inputs, setInputs] = useState({});

    //Get method

    const Apiget = () => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setData(json)
            });
    };
    //POST method 
    const Apipost = async () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: inputs.title,
                body: inputs.body,
                userId: parseInt(inputs.userId),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    };
    const handleChange = (e) => {
        e.persist();
        setInputs((inputs) => ({
            ...inputs,
            [e.target.name]: e.target. value,
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Apipost();
        console.log(inputs);
    }
    
    return (
        <div>
            <h1>New API call</h1>
            <button onClick={getApi}>Fetch API</button>
            <div>
                <ul>
                    {data1.map((items)=>(
                        <li key={items.id}>
                            {items.userId},{items.title}</li>
                    ))}
                </ul>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="title" onChange={handleChange}></input>
                    <input type="text" name="body" placeholder="body" onChange={handleChange}></input>
                    <input type="text" name="userId" placeholder="UserId" onChange={handleChange}></input>
                    <input type="submit" value="submit" onChange={handleChange}></input>
                </form>
            </div>
        </div>
        
    )
}