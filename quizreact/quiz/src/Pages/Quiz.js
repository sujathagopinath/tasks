import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core';
import './Quiz.css';
import Questions from './Questions';
let category
const Quiz = ({ name, score, questions, setScore }) => {
    const [options, setOptions] = useState()
    const [currQues, setCurrQues] = useState(0)
    useEffect(() => {
        setOptions(
            questions && Shuffle([
                questions[currQues]?.correct_answer,
                ...questions[currQues]?.incorrect_answers,
            ])
        )
    }, [questions, currQues]);
    const Shuffle = (options) => {
        return options.sort(() => Math.random() - 0.5)
    }
    return (

        <div className="quiz">
            <h4 className="header">Time to Answer </h4>
            <span className="subtitle">{name}</span>
            {
                questions ?
                    (
                        <>
                            <div className="quizInfo">
                                <span>{questions[currQues]?.category}</span>
                                <span>score:{score}</span>
                            </div>
                            <Questions
                                currQues={currQues}
                                setCurrQues={setCurrQues}
                                questions={questions}
                                options={options}
                                correct={questions[currQues]?.correct_answer}
                                score={score}
                                setScore={setScore}
                            />
                        </>
                    )
                    : (
                        <CircularProgress
                            style={{ margin: 100 }}
                            color="inherit"
                            size={150}
                            thickness={1}
                        />
                    )
            }
        </div >
    )
}

export default Quiz
