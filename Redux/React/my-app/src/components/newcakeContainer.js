import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { buycake } from '../redux'
import { connect } from 'react-redux'


function NewCakeContainer(props) {
    const [number, setNumber] = useState(1)
    return (
        <div>
            <h2>Number of Cakes -{props.numberofcake}</h2>
            <input type="text" value={number} onChange={e => setNumber(e.target.value)} />
            <button onClick={() => props.buycake(number)}> Buy new Cake</button>
        </div>



    )
}

const mapStateToProps = state => {
    return {
        numberofcake: state.cake.numberofcake
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buycake: number => dispatch(buycake(number))   //dispacthes the action creator from redux
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCakeContainer)
// ReactDom.render(<Cakecontainer />, document.getElementById('newone'))


