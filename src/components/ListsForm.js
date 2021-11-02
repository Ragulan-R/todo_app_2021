import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

// ALL LISTS INPUT AND BUTTON

const ListsForm = ({
  listInput,
  setListInput,
  listNames,
  setListNames,
  editListName,
  setEditListName,
}) => {
  useEffect(() => {
    if (editListName) {
      setListInput(editListName.title)
    } else {
      setListInput('')
    }
  }, [setListInput, editListName])

  //  On new list input
  const onListInputChange = (event) => {
    setListInput(event.target.value)
  }

  //  Update List Name
  const updateListName = (title, id, completed) => {
    const newListName = listNames.map((listName) =>
      listName.id === id ? { title, id, completed } : listName
    )
    setListNames(newListName)
    setEditListName('')
  }

  // On New List Submit
  const onTaskFormSubmit = (event) => {
    event.preventDefault()
    if (!editListName) {
      setListNames([
        ...listNames,
        { id: uuidv4(), title: listInput, completed: false },
      ])
      setListInput('')
    } else {
      updateListName(listInput, editListName.id, editListName.completed)
    }
  }

  return (
    <form onSubmit={onTaskFormSubmit}>
      <input
        type='text'
        placeholder='Add a new list'
        className='todoInput'
        value={listInput}
        required
        onChange={onListInputChange}
      />
      <button aria-label='add button' className='addButton' type='submit'>
        {editListName ? 'Update' : 'Add'}
      </button>
    </form>
  )
}

export default ListsForm
