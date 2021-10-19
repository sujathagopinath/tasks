import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ErrorMessage from './ErrorMessage';
import './Question.css'

const Questions = ({
    currQues,
    setCurrQues,
    questions,
    options,
    correct,
    score,
    setScore,
}) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const history = useHistory();

    const handleSelect = (i) => {
        if (selected === i && selected === correct) {
            return 'select'
        }
        else if (selected === i && selected !== correct) {
            return "wrong"
        }
        else if (i === correct) {
            return 'select'

        }
    }
    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) setScore(score + 1);
        setError(false);
    }

    const handleNext = () => {
        if (currQues > 5) {
            history.push("/result");
        }
        else if (selected) {
            setCurrQues(currQues + 1);
            setSelected();
        }
        else {
            setError("select any option")
        }
    }
    return (
        <div className="question">
            <h2> Question : {currQues + 1}</h2>
            <div className="singlequestion">
                <h2>{questions[currQues]?.question}</h2>
            </div>
            <div className="options">
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {options &&
                    options.map((i) => (
                        <button
                            className={`singleoption ${selected && handleSelect(i)}`}
                            key={i}
                            onClick={() => handleCheck(i)}
                            disabled={selected}
                        >
                            {i}
                        </button>
                    ))
                }
            </div>
            <div className="controls">
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={{ width: 185 }}
                    href="/"
                >
                    Quit
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ width: 185 }}
                    onClick={handleNext}
                >
                    {currQues > 5 ? "Submit" : "Next Question"}
                </Button>
            </div>
        </div>
    )
}

export default Questions
