import React from 'react'

const Header = () => <h1> Web development curriculum </h1>

const Part = ({ cor }) => <p> {cor.name} {cor.exercises} </p>

const Content = ({ course }) => {

  const total = course.parts.reduce((s, p) => s + p.exercises, 0)

  return (
    <div>
      <h2> {course.name} </h2>

      {course.parts.map(cor => 
        <Part key={cor.id} cor={cor} />
      )}
      
      <p> <b> total of {total} exercises </b> </p>
    </div>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      <Header />
      {courses.map(course => 
        <Content key={course.id} course={course} />
      )}
    </div>
  )
}

export default Course