/*5º Feita importação. import React from "react";
e inserido o codigo pra ser reinderizado na tela
---------------------------------------------------------------------------------------
function TodoList() {
    return (<H1>Ola mundo!</H1>)
}
export default TodoList.jsx
*/
import React, { useState, useEffect } from "react";
import './TodoList.css';
import Icone from './assets/listavazia.png';  

function TodoList() {
/*19º Uma variavel para guardar o banco de dados(B.D.) do proprio navegador
guardado no localStorage.usando o metodo getItem (e poem na lista)*/
    const listaStorage = localStorage.getItem('Lista');
/*15º apos css, import do {useState} acima.
---------------------------------------------------------------------------------------
Teremos dois estados iniciados por uma const (variável)
variável [nome da variavel, set e nome da variavel padrão pra setara lista] = useState([arrey porque são vários itens na lista])

const [lista, setLista] = useState([]);

Esse estado é responsavel por gardar os item que vão sendo adicionados.
---------------------------------------------------------------------------------------
19º Validação para a lista não começar zerada

useState(listaStorage ? JSON.parse(listaStorage) : [])

useState será(verifica se há histórico de lista no B.D. do navegador e se sim
pega o Json e faz o parse, o parse converte texto para um objeto(e guara da como listaStorage)
se não começa com vazio, no caso o arrey vazio)*/
    const [lista, setlista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
/*Estado inicial começa vazio, usado no atrubuto value do form*/
    const [novoItem, setNovoItem] = useState("");

    useEffect(()=>{
/*useEffect importado acima , funciona como um efeito colateral (o que acontece se isso acontecer).
Depois de chamar o useEffect e chama uma A.F. onde quando há uma mudança na lista, ele aplica ovfeito colateral entre as chaves
{ele vai pegar o localStorage.juntar com o estado lista(chave chamada lista, faz o parse pra tranformar num objeto JSON(o estado lista)},[o estado que eu quero monitorar])*/
       localStorage.setItem('Lista', JSON.stringify(lista)); 
    }, [lista])
/*Ainda no 16º cria a função recebendo o (form)*/
    function adicionaItem(form){
/*Usado pra não disparar o form antes de executar a logica do if */
        form.preventDefault();
/*Se ta vazio não acontece nada*/
        if(!novoItem){
            return;
        }
/*Se não, agente pega a nova lista(o estado dela setLista)
[...lista é pra pegar o que já tem na lista, {e acrecenta o novoItem(que é o que foi digitado no input), isCompleted é pra verificar se esta riscada(começando em false)}]*/
        setlista([...lista, {text: novoItem, isCompleted: false}])
/*Depois vamos querem que esse campo fique vazio*/
        setNovoItem("");
/*Foi dado um id no campo input pra poder voltar o foco da aplicação nele depois de um ciclo de funçoes.

no documento.procure por id{id que vbai ser procurado} */
        document.getElementById('input-entrada').focus();
    }
/*Função feita no 18º*/
    function clicou(index) {
/*Criada uma variável listaAux para copiar o estado de lista atual*/
        const listaAux = [...lista];
/*Pega essa lista auxiliar vê a posição do index, vai pegar o campo isCompleted
e agora vai dizer que agora que o valor é ao contrario(se era false agora é true e vice versa)*/
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
/*Guarda a auteração da lista no estado da lista auxiliar*/
        setlista(listaAux);
    }
/*Repetição do pocesso acima para fazer a funcionalidade de deleta*/
    function deleta(index){
        const listaAux = [...lista];
/*splice metodo pra remover(passado o indice do item, passado quantos itens vai remover)*/
        listaAux.splice(index,1);
        setlista(listaAux)
    }

    function deletaTudo(){
/*Pega o estado da lista e apaga tudo, transfomando num arrey vazio*/
        setlista([]);
    }

    return (
/*8º Abaixo do return é feita a 
<div> que vai englobar todo o código dentro dela o 

<H1>Lista de Tarefas</H1>

depois form e dentro o input*/
        <div>
            <h1>Lista de Tarefas</h1>
{/*16º on Submit, evendo de disparo do form, ele chama a função adicionaItem */}
            <form onSubmit={adicionaItem}>
                <input type="text"
                id="input-entrada" 
/*ainda no passo 15 ta recebendo o valor do useState la de cima, valor da variável novoItem que iniciou vazia*/
                value={novoItem}
/*Evento de quando ha auteração, usa a arrow function A.F. (função anônima){atualiza o campo com o novoItem, onde
o "e" pode ser qualquer letra, e de evento fica melhor.target é o alvo sendo o value.

Ou seja quando a uma auteração ele pega o valor que esta sendo posto no form e passa para ser guardado no estado novoitem}*/ 
                onChange={(e)=>{setNovoItem(e.target.value)}} 
                placeholder="Adicione uma tarefa"/>
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listaTarefas">
                <div>
{/*9º Começou criando uma 
div class name "item"
depois a 
span tarefa de exemplo para poder ficar visual as funcionalidades e botão deletar.
---------------------------------------------------------------------------------------
div item completo tambem foi feita

<div class name="item">
<span> Tarefa de exemplo</span>
<button>Deletar</button>
</div>
<div class name="item comleto">
<span> Tarefa de exemplo</span>
<button>Deletar</button>
</div>
---------------------------------------------------------------------------------------
17º Fazendo a validação
vai pegar o nosso estado lista e verificar se é menor que 1*/
                        lista.length < 1 
                        ?
/*Se sim, ele mostra uma imagem*/ 
                        <img className="icone-central" src={Icone}/> 
                        :
/*Senão, ele mapeia o estado lista
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
/*Ainda no 18º vindo do span essa key alimenta o indice chamado na função abaixo*/
                            key={index}
/*18º Inicialmente 
className="item"
modificado para ser feita uma validação.
se o nosso item está completo então mostra item completo
se não mostra item*/ 
                            className={item.isCompleted ? "item completo" : "item"}
                            >
{/*Inicialmente 

<span>{item.text}</span>

Criaremos o evento de clik com o onClik para marcar que a tarefa foi comleta
A.F. chama a função clicou e passa o indice do item.*/}
                                <span onClick={()=>{clicou(index)}}>{item.text}</span>
{/*Repetição do processo acima para fazer a funcionalidade de delete*/}
                                <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                            </div> 
                        )) 
                    }
                    {   
/*Condicional para aparecer ou não o botão deleta todos, o && simboliza se a condição for verdadeira o que ele fará.
Assim chamará a função deleta tudo*/
                         lista.length > 0 && <button onClick={()=>{deletaTudo()}} className="deleteAll">Deletar todas</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList;