import {useState,useEffect} from 'react'

import styled from 'styled-components'

import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

import { useContext } from 'react';
import UserContext from './UserContext';

    

export default function Senha(){
  const {header,link,user}=useContext(UserContext)
  const [choiceContent,setChoiceContent]=useState([])
  const qtdCasas=4
  const listaCores=['roxo','azul','verde','amarelo','laranja','vermelho']
   const navigate=useNavigate()
   
const [colorChoices,setColorChoices]=useState([null,null,null,null])


const [resposta,setResposta]=useState([])


const [qtdTentativas,setQtdTentativas]=useState(0)






function abrirOpcoes(casa){
    const casaSelecionada=document.querySelector(casa+' .opcoes');
    casaSelecionada.classList.toggle('escondido');
}

function escolherCor(cor,casa){
    const fututaBola=document.querySelector(`.futuraBola${casa}`);
    fututaBola.innerHTML=`<div className='bola ${cor}>
    </div>`
    const list=[]
    for(let k=1;k<5;k++){
        if(k==casa){
            list.push(cor)
        }else{
            list.push(colorChoices[k])
        }
    }
    setColorChoices(list)
}

function criarResposta(){
    const list=[]
    for(let i=0;i<4;i++){
        const x=getRandomIntInclusive(0,5);
        const y=listaCores[x];
        list.push(y);
    }
    setResposta(list)
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function preTentar(){
   for(let choice of colorChoices){
    if (choice===null){
        return alert('Escolha as cores da tentativa, basta clicar na casa que uma barra de seleção aparecerá.')
    }
   }
    tentar()
}

function tentar(){
    const tentativaPrintada=<li className="tentativaPrintada"><div className="casa"><div className={`bola ${colorChoices[0]}`}></div></div><div className="casa"><div className={`bola ${colorChoices[1]}`}></div></div><div className="casa"><div className={`bola ${colorChoices[2]}`}></div></div><div className="casa"><div className={`bola ${colorChoices[3]}`}></div></div></li>
    setQtdTentativas(qtdTentativas+1)
    adicionarTentativa(tentativaPrintada);
    conferir();
    //if(qtdTentativas==4){esconderAjuda()};
}

function adicionarTentativa(tentativaPrintada){
    let listaTentativas=document.querySelector('.lista-tentativas');
    listaTentativas.innerHTML+=tentativaPrintada;
    const scroll=document.querySelector('.container');
    scroll.scrollBy(0,200)
}

function conferir(){
    const tentativa=colorChoices
    let preto=0
    let branco=0
    let cloneResposta=[];
    for(let k=0;k<4;k++){
        cloneResposta.push(resposta[k])
    }
    for(let i=0;i<4;i++){
        if(tentativa[i]==cloneResposta[i]){
            preto++;
            cloneResposta[i]=null;
            tentativa[i]='fechou'
        }
    }    
    for(let j=0;j<4;j++){
        if(cloneResposta.includes(tentativa[j])){
            branco++;
            const aExcluir=cloneResposta.indexOf(tentativa[j]);
            cloneResposta[aExcluir]=null;
        }
    }
    adicionarVerificacoes(preto,branco);
}

function adicionarVerificacoes(preto,branco){
    let listaVerificacoes=document.querySelector('.lista-verificacoes');
    listaVerificacoes.innerHTML+='<li className="caixinha l'+qtdTentativas+'"></li>'
    let caixa=document.querySelector('.l'+qtdTentativas)
    for(let k=0;k<preto;k++){
    caixa.innerHTML+='<div className="bolinha-preta"></div>';
    }
    for(let k=0;k<branco;k++){
    caixa.innerHTML+='<div className="bolinha-branca"></div>'; 
    }
    if(branco==0 && preto==0){
        caixa.innerHTML+='<div className="bolinha-inexistente"></div>';
    }
    if(preto==4){
        const ajuda=document.querySelector('.comoJogar');
        ajuda.classList.add('esconde');
        setTimeout(terminarJogo,500)
    }
    buildTentativas()
}

function terminarJogo(){
    alert('BOOOA! Você conseguiu em '+qtdTentativas+' tentativas.')
    const botaoRecomeco=document.querySelector('.botaoRecomeco')
    botaoRecomeco.classList.remove('esconde')
    const scroll=document.querySelector('.container');
    scroll.scrollBy(0,200)
}

   function buildTentativas(){
    
    const l1=[]
    for(let k=1;k<=qtdCasas;k++){
        const l2=[]
        for(let j=0;j<listaCores.length;j++){
            l2.push(
                <div onClick={()=>escolherCor(listaCores[j],k)} className={`bola ${listaCores[j]}`}></div>
            )
        }
        l1.push(
            <div className={`casa c${k}`} onClick={()=>abrirOpcoes(`.c${k}`)}>
                <div className={`futuraBola${k}`}></div>
                <div className="opcoes escondido">
                    {l2.map(obj=>(obj))}
                </div>
            </div>
        )
    }
    setChoiceContent(l1)
   }
   useEffect(buildTentativas,[])
   useEffect(criarResposta,[])
    return(
        <Tudo>
        <div className="container">
            <div className="tentativaEverificacao">
            <ul className="lista-tentativas">
    
            </ul>
    
            <ul className="lista-verificacoes">
    
            </ul>
            </div>
            {/* <div onclick="abrirRegra()" class="comoJogar"><ion-icon name="help-outline"></ion-icon></div>
            <div onClick="recomecarJogo()" class="botaoRecomeco esconde"><ion-icon name="refresh-outline"></ion-icon></div> */}
        </div>
    
        <div className="tentativa">
            {choiceContent}
            <button className="tentar" onClick={preTentar}><ion-icon name="arrow-forward-outline"></ion-icon></button>
        </div>
    </Tudo>
    )
}


const Tela=styled.div`
width: 100vw;height:100vh;
background-color: #AD1A1A;
display: flex;flex-direction:column;align-items:center;
align-items: center;

button{
  width:25vw;height:50px;background-color:white;
  border:0;color:black;font-size:25px;border-radius:5px
}

h2{margin-top:30px;font-size:18px}
h3{margin-bottom:20px;font-size:18px;color:rgb(239, 227, 63)}
`
const Tudo=styled.section`
    background-color: #404040;
height:100vh;display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items:center;

.container{
    background-color: #999CA1;
    width: 95vw;height: 80vh;
    border-radius: 2vh;
    border:3px solid black; 
    overflow: hidden;overflow-y: scroll; 
}

.tentativa{
    background-color: #999CA1;
    width: 95vw;height:10vh;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 2vh;
    border:3px solid black; 
}

.casa{ width: 8vh;height: 8vh;
    background-color: #404040;margin-left:1vh;
    position:relative;
    display: flex;justify-content: center;align-items: center;
    border-radius: 2vh;
    border:0.4vh solid black; 
}

.bola{
    width: 5vh;height: 5vh;
    
    border-radius: 50%;
    border: 1px solid black;
    margin: 0.5vh;
}
.bolinha-inexistente{width: 5vh;height: 5vh;
    
    border-radius: 50%;
    border: 1px solid #404040;
    margin: 0.5vh;}

.opcoes{width:8vh ;height: 38vh;
    background-color: white;
    position: absolute;
    top:-40vh;
    display: flex;flex-direction: column;
    align-items: center;
    border-radius: 2vh;
}

.tentar{
    position: absolute;
    background-color: #404040;
    height: 7vh;width:7vh;
    right: 1vh;
    border-radius: 50%;;
    border:0.4vh solid black;
    display: flex;justify-content: center;align-items: center;

}
.tentar ion-icon{color:white}
ion-icon{color:black;font-size:7vh;}


.amarelo{background-color: yellow;}
.vermelho{background-color: red;}
.azul{background-color: blue;}
.verde{background-color: green;}
.laranja{background-color: #FF6801;}
.roxo{background-color: purple;}

.escondido{display:none;}

.tentativaPrintada{
   display: flex; margin-bottom: 1vh;
}

.bolinha-preta{
    width: 2vh;height: 2vh;
    border-radius: 50%;
    border: 0.3vh solid black;
    background-color: black;
    margin:0.6vh
}
.bolinha-branca{
    width: 2vh;height: 2vh;
    border-radius: 50%;
    border: 0.3vh solid black;
    background-color: white;
    margin:0.6vh
}
.bolinha-inexistente{
    width: 2vh;height: 2vh;
    border-radius: 50%;
    border: 0.3vh solid #999CA1;
    background-color: #999CA1;
    padding:0.6vh
}

.lista-verificacoes{
    display: flex;flex-direction: column;
    margin-top: 0vh;
    margin-left: 0.8vh;

}

.caixinha{
    width: 8vh;height: 8vh;
    display: flex;
    margin-top:1vh;
    margin-bottom: 0.8vh;
   flex-wrap: wrap;
}

h1{color: white;
    font-family: 'Work Sans', sans-serif;}

.botaoRecomeco{
    width: 10vh;height: 10vh;background-color: #49ff01cc;
    margin-left:19.5vh;margin-bottom: 1vh;
    border-radius: 50%;border: 0.5vh solid black;
    display: flex;justify-content:center;align-items: center;
}
.comoJogar{
    width: 10vh;height: 10vh;background-color: #ff01c8e1;
    margin-left:19.5vh;margin-bottom: 1vh;
    border-radius: 50%;border: 0.5vh solid black;
    position: fixed; top:32.5vh;
    display: flex;justify-content:center;align-items: center;
}

.esconde{display:none}

.tentativaEverificacao{display: flex;}

.lista-tentativas{margin-top: 1vh}

body img{
    width: 90vw; height: 120vw;
    border-radius: 5%;
    border:0.8vh solid black;
    position: absolute;
    z-index: 7;
    
}
.regras{
    position: fixed;z-index: 6;
    width: 90vw;height: 120vw;
    left:5vw;top:10vh
}
.fechar{
    position: absolute;
    background-color: #ff01c8e1;
    height: 7vh;width:7vh;
    right: 0;bottom: 0;
    z-index: 9;
    border-radius: 50%;;
    border:0.4vh solid black;
    display: flex;justify-content: center;align-items: center;
}
.cortina{
    width: 100%;height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;z-index: 5;
}

@media(min-width:620px){
    body img{height: 90vh;width: 70vh;}
    .regras{width:70vh;height:90vh;left:15vw;top:5vh}
}

`