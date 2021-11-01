import './App.css'
import TasksHeader from './components/TasksHeader'
import TaskForm from './components/TaskForm'
import React, { useState, useEffect } from 'react'
import List from './components/List'
import ListsHeader from './components/ListsHeader'
import ListsForm from './components/ListsForm'
import AllLists from './components/AllLists'

// APP STRUCTURE ( 2 cards - (All Lists and Task Lists))
// 1. Input fields - on Listform and Tasks TaskForm - input and button
// 2. Edit and Delete Items - on List and All Lists items rendered
// 3. Marking as Completed - on each List items rendered - cross out effect and property change on Local Storage
// 4. Responsive - Media Queries on App.css
// 5. User can create multiple Lists - To do List will only appear once user makes a list line 101 on App.js
// 6. Local storage is saving All Lists and To do Lists on browser refresh on App.js

const App = () => {
  // Local Storage
  const initialState = JSON.parse(localStorage.getItem('tasks')) || []
  const initialListState = JSON.parse(localStorage.getItem('listNames')) || []

  // For Lists - Name of the List
  const [listInput, setListInput] = useState('')
  const [listNames, setListNames] = useState(initialListState)
  const [editListName, setEditListName] = useState(null)
  const [currentList, setCurrentList] = useState(null)

  // For Tasks - To Do List
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState(initialState)
  const [editTask, setEditTask] = useState(null)
  const [currentTasks, setCurrentTasks] = useState([])

  // Storing Lists and Tasks
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    if (currentList?.id) {
      const filterTasks = tasks.filter((x) => {
        if (x.listId === currentList.id) {
          return true
        }
        return false
      })
      setCurrentTasks(filterTasks)
    } else {
      setCurrentTasks([])
    }
  }, [tasks, currentList])

  useEffect(() => {
    localStorage.setItem('listNames', JSON.stringify(listNames))
    if (currentList?.id) {
      const x = listNames.filter((listName) => listName.id !== currentList.id)
      if (x.length === 0) {
        setCurrentList(null)
      }
    }
  }, [listNames, currentList])

  // Update Lists
  // const updateCurrentTasks = () => {
  //   if (currentList?.id) {
  //     const filterTasks = tasks.filter((x) => {
  //       if (x.listId === currentList.id) {
  //         return true
  //       }
  //       return false
  //     })
  //     setCurrentTasks(filterTasks)
  //   } else {
  //     setCurrentTasks([])
  //   }
  // }

  // useEffect(() => {
  //   updateCurrentTasks()
  // }, [currentList])

  const listClick = (clickedList) => {
    setCurrentList(clickedList)
  }

  return (
    <div className='container'>
      <div className='listsAndTasks'>
        <div className='card'>
          <div>
            <ListsHeader />
          </div>
          <div>
            <ListsForm
              listInput={listInput}
              setListInput={setListInput}
              listNames={listNames}
              setListNames={setListNames}
              editListName={editListName}
              setEditListName={setEditListName}
            />
          </div>
          <div>
            <AllLists
              listClick={listClick}
              listNames={listNames}
              setListNames={setListNames}
              setEditListName={setEditListName}
            />
          </div>
        </div>
        {/* only show to do list if a main list is made */}
        {currentList && (
          <div className='card'>
            <div>
              <TasksHeader
                currentListName={
                  currentList?.title ? currentList.title : 'To Do List'
                }
              />
            </div>
            <div>
              <TaskForm
                input={input}
                setInput={setInput}
                tasks={tasks}
                setTasks={setTasks}
                editTask={editTask}
                setEditTask={setEditTask}
                currentList={currentList}
              />
            </div>
            <div>
              <List
                tasks={currentTasks}
                setTasks={setTasks}
                setEditTask={setEditTask}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
