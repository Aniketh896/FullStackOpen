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
      <p>
        <b> total of {total} exercises </b>
      </p>
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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App