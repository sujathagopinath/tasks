import React from 'react'
import { Userconsumer } from './userContext'

class ComponentF extends React.Component {
    render() {
        return (

            <Userconsumer>
                {
                    (username) => {
                        return <div>Hello {username} </div> // passing function as child to the consumer
                    }
                }
            </Userconsumer>
        )
    }
}

export default ComponentF
