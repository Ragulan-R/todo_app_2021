import React from 'react'

// THE TODO/TASK LIST ITEMS

const List = ({ tasks, setTasks, setEditTask }) => {
  const handleDelete = ({ id }) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  const handleComplete = (task) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === task.id) {
          return { ...item, completed: !task.completed }
        }
        return item
      })
    )
  }
  const handleEdit = ({ id }) => {
    const findTask = tasks.find((task) => task.id === id)
    setEditTask(findTask)
  }

  return (
    <div>
      {tasks.map((task) => (
        <li className='listItem' key={task.id}>
          <input
            type='text'
            value={task.title}
            className={`itemText ${task.completed ? 'complete' : ''}`}
            onChange={(event) => event.preventDefault()}
          />
          <div>
            <button
              aria-label='complete button'
              className='completeButton'
              onClick={() => handleComplete(task)}
            >
              <i className='fa fa-check-circle'></i>
            </button>
            <button
              aria-label='edit button'
              className='editButton'
              onClick={() => handleEdit(task)}
            >
              <i className='fa fa-edit'></i>
            </button>
            <button
              aria-label='delete button'
              className='deleteButton'
              onClick={() => handleDelete(task)}
            >
              <i className='fa fa-trash'></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  )
}

export default List
