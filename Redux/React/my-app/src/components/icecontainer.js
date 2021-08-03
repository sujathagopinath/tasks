import React from 'react'
import ReactDom from 'react-dom'
import { buyice } from '../redux'
import { connect } from 'react-redux'


function Icecontainer(props) {
    return (
        <div>
            <h2>Number of Icecream -{props.numberofice}</h2>
            <button onClick={props.buyice}> Buy a Ice</button>
        </div>



    )
}

const mapStateToProps = state => {
    return {
        numberofice: state.ice.numberofice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buyice: () => dispatch(buyice())   //dispacthes the action creator from redux
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Icecontainer)
// ReactDom.render(<Cakecontainer />, document.getElementById('newone'))


