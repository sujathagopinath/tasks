import React, { useState, useEffect } from "react";
import axios from "axios";

type Dataprops = {
  fetchData: boolean;
};

const Customaxios = (props: Dataprops) => {
  const [data, setData] = useState(null);
  const [val, setVal] = useState("");
  const [fetchData, setFetch] = useState(false);

  useEffect(() => {
    if (fetchData) {
      const payload = {
        method: "POST",
        body: JSON.stringify({ title: val }),
      };
      console.log(payload);

      axios
        .post("https://jsonplaceholder.typicode.com/posts", payload)
        .then((res) => setData(res.data.id));
    }
  }, [props.fetchData]);
  return (
    <>
      {data && <h1>Your data: {data}</h1>}
      <input
        placeholder="Title of Post"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button onClick={() => setFetch(true)}>Save Data</button>
    </>
  );
};

export default Customaxios;
