import React from "react";

type GreetProps = {
    name: string
    count: number
    isLoggedin:boolean
}
const Greet = (props:GreetProps) => {
    
    return (
        <div>
            {
                props.isLoggedin?`welcome ${props.name} you have count of  ${props.count}`: "welcome guest"
            }
       </div> 
    )
}

export default Greet