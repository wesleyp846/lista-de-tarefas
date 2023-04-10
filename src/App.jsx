/*4º foi retirado as importações de App e index.css
pos o arquivo agora já se chama App.jsx
e feita aimportação do componente principal
import TodoList from './TodoList' proximo passo é criar esse aquivo*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoList from './TodoList'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*Coponente principal*/}
    <TodoList />
  </React.StrictMode>,
)
