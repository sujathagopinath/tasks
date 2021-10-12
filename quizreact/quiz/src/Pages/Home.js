import './Home.css';
import React, { useState } from 'react'
import { Button, Card, MenuItem, TextField } from '@material-ui/core';
import Categories from '../Data/Categories';
import { useHistory } from 'react-router';
import ErrorMessage from '../components/ErrorMessage';

const Home = ({ name, setName, fetchQuestions }) => {
    const [category, setCategory] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [error, setError] = useState(false)

    const history = useHistory();

    const handleSubmit = () => {
        if (!category || !difficulty || !name) {
            setError(true);
            return;
        }
        else {
            setError(false)
            fetchQuestions(category, difficulty);
            history.push('/quiz')

        }
    }
    return (
        <div className='content'>
            <div className='settings'>
                <span className='head'>QUIZ TIME</span>
                <Card className="newcard">
                    <div className="settings_select">
                        {error && <ErrorMessage>Fill the fields with(*)</ErrorMessage>}
                        <TextField
                            style={{ marginBottom: 25 }}
                            label="Enter the Name"
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            select
                            label="Select category"
                            style={{ marginBottom: 25 }}
                            variant="outlined"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            {
                                Categories.map((cat) => (
                                    <MenuItem key={cat.category} value={cat.value}>
                                        {cat.category}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField
                            select
                            label="Select Difficulty"
                            style={{ marginBottom: 25 }}
                            variant="outlined"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            required
                        >
                            <MenuItem key="Easy" value="easy">Easy</MenuItem>
                            <MenuItem key="Medium" value="medium">Medium</MenuItem>
                            <MenuItem key="Difficult" value="difficult">Hard</MenuItem>

                        </TextField>
                        <Button variant="outlined" color="secondary"
                            onClick={handleSubmit}>Start Quiz</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Home
