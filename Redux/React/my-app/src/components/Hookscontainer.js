import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { buycake } from '../redux';

function Hookscontainer() {
    const numberofcake = useSelector(state => state.cake.numberofcake)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>Number of Cakes -{numberofcake} </h1>
            <button onClick={() => dispatch(buycake())}>Buy A Cake</button>
        </div>
    )
}

export default Hookscontainer
