import { Button } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import "./Result.css"

const Results = ({ name, score }) => {
    const history = useHistory();

    useEffect(() => {
        if (!name) {
            history.push("/")
        }

    }, [name, history])
    return (
        <div className="result">
            <span>Answered score:{score}</span>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ alignSelf: "center", marginTop: 20 }}
                href="/"
            >
                Go to Home
            </Button>
        </div>
    )
}

export default Results;