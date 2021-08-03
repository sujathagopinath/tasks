import React from 'react'
import ReactDom from 'react-dom'
import { buycake } from '../redux'
import { connect } from 'react-redux'


function Cakecontainer(props) {
    return (
        <div>
            <h2>Number of Cakes -{props.numberofcake}</h2>
            <button onClick={props.buycake}> Buy a Cake</button>
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
        buycake: () => dispatch(buycake())   //dispacthes the action creator from redux
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cakecontainer)
// ReactDom.render(<Cakecontainer />, document.getElementById('newone'))


