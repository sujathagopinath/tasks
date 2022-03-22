import React from "react";

type ListProps = {
    names: {
        firstname: string
        lastname:string
    }[]

}

export const PeopleList = (props:ListProps) => {
    return (
        <div>
            {
                props.names.map(name => {
                    return (
                        <h3 key={name.firstname}>
                    {name.firstname} {name.lastname}
                </h3> 
                    )
                   
                })
            
            }
        </div>
    )
}