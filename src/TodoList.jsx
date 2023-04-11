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
    /*15º apos css
    import do useState acima
    teremos dois estados iniciados por uma const (variavel)
    variavel [nome da variavel, set e nome da variavel padrão pra setara lista] = useState([arrey porque são carios itens na lista])*/
    /*inicalmente fica const [lista, setLista] = useState([]);
    esse estado é responsavel por gardar os item que vão sendo adicionados*/
    const [lista, setlista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    /*estado inicial começa vazio, usado no value do form*/
    const [novoItem, setNovoItem] = useState("");

    useEffect(()=>{
       localStorage.setItem('Lista', JSON.stringify(lista)); 
    }, [lista])
    /*ainda P16 cria ela recebendo o (form)*/
    function adicionaItem(form){
        /*usado pra não disparar o form antes de executar a logica do if */
        form.preventDefault();
        /*se ta vazio não acontece nada*/
        if(!novoItem){
            return;
        }
        /*se não, agente pega a nova lista(o estado dela setLista)
        [...lista é pra pegar o que ja tem na lista, {e acrecenta o novoItem(que é mo que foi digitado no input), isCompleted é pra verificar se esta riscada(começando em false)}]*/
        setlista([...lista, {text: novoItem, isCompleted: false}])
        /*depois vamos querem que esse campo fique vazio*/
        setNovoItem("");
        /*foi dado um id no campo input pra poder voltar o foco da apiclação nele depois de um ciclo de funçoes
        no documento.procure por id{id que vbai ser procurado} */
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
            {/*P16 on Submit, evendo de disparo do form, ele chama a função adicionaItem */}
            <form onSubmit={adicionaItem}>
                <input type="text"
                id="input-entrada" 
                /*ainda no passo 15
    ta recebendo o valor do useState la acima, valor da variavel novoitem que inicia vazio*/
                value={novoItem}
                /*evento de quando ha auteração, usa a arrow function(função anonima){atualiza o campo com o novo item, onde
                o "e" pode ser quauqer letra, e de evento fica melhor.target é o alvo sendo o value.
            ou seja quando a auteração ele pega o valor que esta sendo posto no form e passa para guardado no estado novoitem} */ 
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
                    {/*P17 fazendo a validação
                    vai pegar o nosso estado lista e verificar se é menor que 1  */
                        lista.length < 1 
                        ?
                        /*se sim, ele mostra uma imagem */ 
                        <img className="icone-central" src={Icone}/> 
                        :
                        /*senão, ele mapeia o estado lista
                        arrow function(A.F.) passado como parametro cada item e um index
                        depois parenteses pra dar o retorno do que queremos como {item.text} na span para mostrar o valor textual dentro de item 
                        
                        lista.map((item, index)=>(
                            <div className="item">
                                <span>{item.text}</span>
                                <button className="del">Deletar</button>
                            </div> 
                        */
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