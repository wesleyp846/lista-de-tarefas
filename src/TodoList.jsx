/*5º feita importação import React from "react";
e inserido o codigo pra ser reinderizado na tela
function TodoList() {
    return (<H1>Ola mundo!</H1>)
}
export default TodoList.jsx
*/
import React, { useState, useEffect } from "react";
import './TodoList.css';
import Icone from './assets/listavazia.png';  

function TodoList() {

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setlista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(()=>{
       localStorage.setItem('Lista', JSON.stringify(lista)); 
    }, [lista])

    function adicionaItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setlista([...lista, {text: novoItem, isCompleted: false}])
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setlista(listaAux);
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index,1);
        setlista(listaAux)
    }

    function deletaTudo(){
        setlista([]);
    }

    return (
        /*8º abaixo do return e feita a <div> que vai englobar todo o código
        dentro dela o <H1>Lista de Tarefas</H1>
        depois form e dentro o input*/
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input type="text"
                id="input-entrada" 
                value={novoItem} 
                onChange={(e)=>{setNovoItem(e.target.value)}} 
                placeholder="Adicione uma tarefa"/>
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listaTarefas">
                <div>
                    {/*9º começou criando uma div class name "item"
                    depois a span tarefa de exemplo p´ra poder ficar visual as funcionalidades
                    e botão deletar.
                    div item completo tambem foi feita
                    <div class name="item">
                    <span> Tarefa de exemplo</span>
                    <button>Deletar</button>
                    </div>
                    <div class name="item comleto">
                    <span> Tarefa de exemplo</span>
                    <button>Deletar</button>
                    </div>
                    */}
                    {
                        lista.length < 1 
                        ? 
                        <img className="icone-central" src={Icone}/> 
                        :
                        lista.map((item, index)=>(
                            <div
                            key={index} 
                            className={item.isCompleted ? "item completo" : "item"}
                            >
                                <span onClick={()=>{clicou(index)}}>{item.text}</span>
                                <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                            </div> 
                        )) 
                    }
                    {
                         lista.length > 0 && <button onClick={()=>{deletaTudo()}} className="deleteAll">Deletar todas</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList;