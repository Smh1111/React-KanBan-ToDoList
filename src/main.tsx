import React from 'react'
import ReactDOM from 'react-dom/client'
import TaskListComponent from './components/TaskListComponent.tsx'
import HelloWorld from './components/HelloWorld.tsx'

import InputForm
 from './components/InputForm.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <HelloWorld />
    <InputForm />
    <TaskListComponent />
  </React.StrictMode>,
)
