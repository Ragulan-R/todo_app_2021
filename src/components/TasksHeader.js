import React, { useEffect } from 'react'

const TasksHeader = ({ currentListName }) => {
  useEffect(() => {
    console.log(currentListName)
  }, [currentListName])

  return (
    <div className='header'>
      <h1>{currentListName}</h1>
    </div>
  )
}

export default TasksHeader
