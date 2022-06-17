import React from 'react'

const Name = props => (
        <>
            {props.person.name} {props.person.number} <button onClick={props.handleDelete}> delete </button> <br /> 
        </>
)

const Persons = props => <div> <Name person={props.person} handleDelete={props.handleDelete} /> </div>

export default Persons