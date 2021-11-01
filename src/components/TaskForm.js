import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

// TASK OR TODOLIST INPUT AND BUTTON

const TaskForm = ({
  input,
  setInput,
  tasks,
  setTasks,
  editTask,
  setEditTask,
  currentList,
}) => {
  useEffect(() => {
    if (editTask) {
      setInput(editTask.title)
    } else {
      setInput('')
    }
  }, [setInput, editTask])

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const updateTask = (title, id, completed) => {
    const newTask = tasks.map((task) =>
      task.id === id ? { title, id, completed, listId: currentList.id } : task
    )
    setTasks(newTask)
    setEditTask('')
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    if (!editTask) {
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          title: input,
          completed: false,
          listId: currentList.id,
        },
      ])
      setInput('')
    } else {
      updateTask(input, editTask.id, editTask.completed)
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type='text'
        placeholder='Add a task...'
        className='todoInput'
        value={input}
        required
        onChange={onInputChange}
      />
      <button className='addButton' type='submit'>
        {editTask ? 'Update' : 'Add'}
      </button>
    </form>
  )
}

export default TaskForm
