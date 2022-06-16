const Header = ({ course }) => <h1> {course.name} </h1>

const Part = ({ cor }) => <p> {cor.name} {cor.exercises} </p>

const Content = ({ course }) => {
  
  let totalSum = 0;

  for (let i in course.parts) {
    totalSum += course.parts[i].exercises;
  }

  return (
    <div>
      {course.parts.map(cor => 
        <Part key={cor.id} cor={cor} />
      )}
      <p>
        <b> total of {totalSum} exercises </b>
      </p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
  }

  return <Course course={course} />
}

export default App