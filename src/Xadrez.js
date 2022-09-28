import {useState,useEffect} from 'react'

import styled from 'styled-components'

import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

import { useContext } from 'react';
import UserContext from './UserContext';
export default function Xadrez(){
    const {user,link,header}=useContext(UserContext)
    const navigate=useNavigate()
    const {id}=useParams()
    const [vez,setVez]=useState('')
    const [tabuleiro,setTabuleiro]=useState([[0,0]])
    const [selec,setSelec]=useState(32)
    const [moved,setMoved]=useState(32)
    const [vencedor,setVencedor]=useState('')
    const [msgErro,setMsgErro]=useState('')
    const [coresCasa]=useState({preta:'#e0b77d',branca:'#f4d6ab'})
    const [jogadorA,setJogadorA]=useState(null)
    const [corMinha,setCorMinha]=useState('red')
    const [altCor,setAltCor]=useState(false)
    const [tabuzao,setTabuzao]=useState(<></>)
    function buscarPecas(){
        const promessa=axios.get(`${link}/partidas/${id}`,header)
        promessa.then(res=>{
            if(vencedor!=''){return}
            if(res.data.ja===user){setJogadorA(true)}else{setJogadorA(false)}
            setMoved(res.data.nova)
            console.log(res.data)
            setTabuleiro(res.data.todas)
            if(res.data.vez=="vencedor"){
                setVencedor(res.data.vencedor)
            }
            setVez(res.data.vez)
        })
    }
    function moverPeca(lugar){
        if(selec==32){return}
        let inicio=jogadorA?0:16
        let fim=jogadorA?15:31
        for(let k=inicio;k<=fim;k++){
            if (lugar[0]==tabuleiro[k][0] && lugar[1]==tabuleiro[k][1]){return}
        }
        
        const promessa=axios.put(`${link}/partidas/${id}`,{qual:selec,onde:[lugar[0],lugar[1]]},header)
        
        promessa.then(()=>{buscarPecas();setSelec(32)})
        promessa.catch(err=>{
            switch(err.response.status){
                case 441:setMsgErro('Não é sua vez');break;
                case 442:setMsgErro('Suas peças são as outras');break;
                case 443:setMsgErro('Movimento inválido');break;
                case 444:return;
                default:return;
            }
            setTimeout(()=>{setMsgErro('');},4000)
        })
    }
    function renderPeca(p,s){
        let clas='peca';let cor;
        for(let k=0;k<tabuleiro.length;k++){
            if (tabuleiro[k][0]===p && tabuleiro[k][1]===s){
                if(k==selec){clas+=' yellow'}
                if(k==moved){clas+=' green'}
                
                if(jogadorA){
                    cor=k>15?'black':corMinha
                }else {
                    cor=k<16?'black':corMinha
                }

                if(k==8 || k==9 || k==24 || k==25 )return <Peca className={clas} cor={cor} onClick={()=>setSelec(k)} >&#9820;</Peca>
                else if(k== 10 || k==11 || k==26 || k==27  )return <Peca className={clas} cor={cor} onClick={()=>setSelec(k)} >&#9822;</Peca>
                else if(k== 12 || k==13 || k==28 || k==29  )return <Peca className={clas} cor={cor} onClick={()=>setSelec(k)} >&#9821;</Peca>
                else if(k== 14 || k==30  )return <Peca className={clas} cor={cor} onClick={()=>setSelec(k)} >&#9819;</Peca>
                else if(k== 15 || k==31  )return <Peca className={clas} cor={cor} onClick={()=>setSelec(k)} >&#9818;</Peca>
                else return <Peca className={clas} cor={cor} onClick={()=>setSelec(k)} ><ion-icon name="water"/></Peca>
            }
        }
        return <></>
    }

    function renderTabuzao(){
        const l1=[]
        for(let p=jogadorA?1:8;jogadorA?p<9:p>0;jogadorA?p++:p--){
            const l2=[]
            for(let s=jogadorA?1:8;jogadorA?s<9:s>0;jogadorA?s++:s--){
                l2.push(<Casa cor={coresCasa[(p+s)%2===0?'preta':'branca']} onClick={()=>moverPeca([p,s])}>{renderPeca(p,s)}</Casa>)
            }
            l1.push(<Linha8>{l2.map(obj=>obj)}</Linha8>)
        }
        setTabuzao(<Tabuzao>{l1.map(obj=>obj)}</Tabuzao>)
    }
    useEffect(()=>{
        renderTabuzao() 
    },[tabuleiro])
    useEffect(()=>{
        buscarPecas()
        
        setInterval(buscarPecas,2000) 
    },[])
    return(
        
        <Tela>
            

            {msgErro!=''&&vez!="vencedor"?
            <Aviso cor='red'>
            <h1>{msgErro}</h1>
            </Aviso>:<></>}
            {vez==user&&msgErro==''?
            <Aviso cor='green'>
            <h1>É sua vez !</h1>
            </Aviso>:<></>}
            {vez!=user&&msgErro==''&&vez!="vencedor"?
            <Aviso cor='orange'>
            <h1>Espere o oponente</h1>
            </Aviso>:<></>}
            {vez=="vencedor"?
            <Aviso cor='purple'>
            <h1>{vencedor} ganhou !!!</h1>
            </Aviso>:<></>}

            {tabuzao}

            {altCor?
            <input value={corMinha} onChange={e=>setCorMinha(e.target.value)} placeholder='digite a cor em ingles'></input>
            :<></>}

            <div className='row'>

            <Botao onClick={()=>navigate('/')}>
            <ion-icon name="list"></ion-icon>
            </Botao>
          
            <Botao onClick={()=>setAltCor(!altCor)}>
                <ion-icon name="cube"></ion-icon>
            </Botao>

            </div>
            
        </Tela>
    )
}
const Linha8=styled.div`
display:flex;width:100%;max-width:550px;height:17.5%;
`
const Botao=styled.button`
width:50px;height:50px;border-radius:50%;
    display:flex;justify-content:center;align-items:center;
background-color:brown;
color:white;margin:10px;
font-size:35px;border:0}
`
const Aviso=styled.div`
width:300px;height:40px;border-radius:20px;background-color:${props=>props.cor};
display:flex;justify-content:center;align-items:center;
margin:10px;
`

const Casa=styled.div`background-color:${props=>props.cor};
width:12.5%;height:100%;display:flex;align-items:center;justify-content:center;

`
const Tabuzao=styled.div`
width:95vw;max-width:550px;height:95vw;max-height:550px;
display:flex;flex-direction:column;
border:4px solid brown;
`
const Tela=styled.div`
h1{font-size:20px;color:white}
strong{font-size:25px;font-weight:700}
width: 100vw;box-sizing:border-box;height:100vh;
background-color: gray;
display: flex;justify-content:center;
align-items: center;flex-direction:column;
.row{display:flex;align-items:center;justify-content:center;width:95vw;}

.peca{
    width:80%;height:80%;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:42px;
    transition:3s;
};

.yellow{background-color:yellow};.green{background-color:#68ff72};.peao{font-size:33px};

ul{display:flex;width:100%;max-width:550px;height:17.5%;
background-color:pink;
};
input{width:60vw;max-width:350px;margin-top:10px;height:30px;padding:5px;
    box-sizing:border-box;font-size:20px;border:0;border-radius:5px}

`
const Peca=styled.div`
color:${props=>props.cor};
`