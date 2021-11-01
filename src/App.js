import './App.css'
import TasksHeader from './components/TasksHeader'
import TaskForm from './components/TaskForm'
import React, { useState, useEffect } from 'react'
import List from './components/List'
import ListsHeader from './components/ListsHeader'
import ListsForm from './components/ListsForm'
import AllLists from './components/AllLists'

const App = () => {
  const initialState = JSON.parse(localStorage.getItem('tasks')) || []
  const initialListState = JSON.parse(localStorage.getItem('listNames')) || []
  // localStorage.getItem('tasks', JSON.stringify(tasks))

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

  useEffect(() => {
    console.log(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    updateCurrentTasks()
    console.log('hello')
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('listNames', JSON.stringify(listNames))
    if (currentList?.id) {
      const x = listNames.filter((listName) => listName.id !== currentList.id)
      if (x.length == 0) {
        setCurrentList(null)
      }
    }
  }, [listNames])

  const updateCurrentTasks = () => {
    console.log(currentList)
    if (currentList?.id) {
      console.log(tasks)
      const filterTasks = tasks.filter((x) => {
        // console.log(currentList)
        if (x.listId === currentList.id) {
          console.log(x)
          return true
        }
        return false
      })
      setCurrentTasks(filterTasks)
    } else {
      setCurrentTasks([])
    }
  }

  useEffect(() => {
    updateCurrentTasks()
  }, [currentList])

  const listClick = (clickedList) => {
    setCurrentList(clickedList)
    console.log(clickedList)
  }

  return (
    <div className='container'>
      {/* All My Lists */}
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
