import React from 'react'

const Header = ({ course }) => {                                   
  return (                                                         
    <h1>{course.name}</h1>                                         
  )                                                                
}                                                                  
                                                                   
const Total = ({ course }) => {                                    
  const values = course.parts.map(part => part.exercises)          
  const sum = values.reduce((total, amount) => total + amount)  
  return(                                                 
    <p>Number of exercises: {sum}</p>                     
  )                                                       
}                                                         
                                                          
const Part = (props) => {                                 
  return (                                                
    <p>                                                   
      {props.part.name} {props.part.exercises}            
    </p>                                                  
  )                                                       
}                                                         
                                                          
const Content = ({ course }) => {                         
  return (                                                
    <div>                                                             
      {course.parts.map(part => <Part key={part.id} part={part} />)}  
    </div>                                                
  )                                                       
}

const Course = ({ course }) => {    
  return(    
    <>    
      <Header course={course} />    
      <Content course={course} />    
      <Total course={course} />    
    </>    
  )    
}    
   
export default Course
