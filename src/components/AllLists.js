import React from 'react'

// LIST OF ALL THE LISTS

const AllLists = ({ listClick, listNames, setListNames, setEditListName }) => {
  // delete list name
  const handleListNameDelete = ({ id }) => {
    setListNames(listNames.filter((listName) => listName.id !== id))
  }
  // completed list
  // const handleListNameComplete = (listName) => {
  //   setListNames(
  //     listNames.map((item) => {
  //       if (item.id === listName.id) {
  //         return { ...item, completed: !listName.completed }
  //       }
  //       return item
  //     })
  //   )
  // }
  // edit list
  const handleListNameEdit = ({ id }) => {
    const findListName = listNames.find((listName) => listName.id === id)
    setEditListName(findListName)
  }

  return (
    <div>
      {listNames.map((listName) => (
        <li
          onClick={() => {
            listClick(listName)
          }}
          className='listNameItem'
          key={listName.id}
        >
          <input
            type='text'
            value={listName.title}
            className={`listButton itemText ${
              listName.completed ? 'complete' : ''
            }`}
            onChange={(event) => event.preventDefault()}
          />
          <div>
            <button
              className='editButton'
              onClick={() => handleListNameEdit(listName)}
            >
              <i className='fa fa-edit'></i>
            </button>
            <button
              className='deleteButton'
              onClick={() => handleListNameDelete(listName)}
            >
              <i className='fa fa-trash'></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  )
}

export default AllLists
