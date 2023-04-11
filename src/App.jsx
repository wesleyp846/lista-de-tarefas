/*4º foiram retiradas as importações de App.jsx e index.css
pois o arquivo agora já se chama App.jsx
-------------------------------------------------------------------------
E feita a importação do componente principal.
import TodoList from './TodoList'
------------------------------------------------------------------------- 
proximo passo é criar esse aquivo*/
import React from "react";
import ReactDOM from "react-dom/client";
import TodoList from "./TodoList";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*Coponente principal 4º passo*/}
    <TodoList />
  </React.StrictMode>
);
