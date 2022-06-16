import React from 'react'

const Name = props => <> {props.person.name} {props.person.number} <br /> </>

const Persons = props => <div> <Name person={props.person} /> </div>

export default Persons