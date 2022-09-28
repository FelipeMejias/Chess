import {useState,useEffect} from 'react'

import styled from 'styled-components'

import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

import { useContext } from 'react';
import UserContext from './UserContext';

    

export default function Menu(){
  const {header,link,user}=useContext(UserContext)
    const navigate=useNavigate()
    const [input,setInput]=useState('')
    const [listaJogos,setListaJogos]=useState([])
    const [msgErro,setMsgErro]=useState('')
    const [criando,setCriando]=useState(false)
    function criarPartida(){
        const promessa=axios.post(`${link}/partidas`,{amigo:input},header)
        promessa.then(()=>navigate(`/xadrez/${user+input}`))
        promessa.catch(err=>{
          switch(err.response.status){
              case 441:setMsgErro('Escreva o nome do seu oponente');break;
              case 442:setMsgErro('Este usuário não existe');break;
          }
          setTimeout(()=>{setMsgErro('');},7000)
      })
    }
    function procurarJogos(){
      if(!header || !user){navigate('/login')}
        const promessa=axios.get(`${link}/partidas`,header)
        promessa.then(res=>{
          console.log(res.data)
            setListaJogos(res.data)
        }).catch((e)=>console.log(e))
    }
    useEffect(()=>{
      procurarJogos()
      //setInterval(procurarJogos,3000)
    },[])
    return(
        <Tela>
          <Header>
            <ion-icon name="person" />
            {user}
          </Header>
          {criando?
          <Criacao>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder='contra quem...'></input>
            <button onClick={criarPartida}>Criar</button>
          </Criacao>:
          <button onClick={()=>setCriando(true)}>Novo jogo</button>
          }      
            <h3>{msgErro}</h3>
            <CaixaPart>
              {listaJogos.map(obj=>{
                console.log(obj)
                if(obj.vez=="vencedor"){
                  return(
                    <Joguinho cor='gray' onClick={()=>navigate(`/xadrez/${obj.id}`)}>
                      <h1>{obj.ja==user?obj.jb:obj.ja}</h1>{obj.vencedor==user?<ion-icon name="trophy"></ion-icon>:<></>}
                    </Joguinho>
                  )
                }
                return(
                  <Joguinho cor={obj.vez==user?'#42ce59':'black'} onClick={()=>navigate(`/xadrez/${obj.id}`)}>
                    <h1>{obj.ja==user?obj.jb:obj.ja}</h1>
                  </Joguinho>
                )
              })}
            </CaixaPart>
        </Tela>
    )
}
const Joguinho=styled.div`display:flex;justify-content:space-between;
width:87vw;height:50px;background-color:${props=>props.cor};border-radius:5px;
padding:15px;box-sizing:border-box;margin-bottom:20px;
h1{font-size:20px;color:white}
`
const Criacao=styled.div`
display:flex;width:100%;justify-content:center;
input{
  width:60vw;height:50px;background-color:#6B491A;margin-right:2vw;
  color:white;font-size:25px;border:0;border-radius:5px
}
  
`
const Header=styled.div`
ion-icon{font-size:30px;color:white}
background-color:#840f0f;height:10vh;width:100%;color:white;font-size:25px;
`

const CaixaPart=styled.div`
display:flex;flex-direction:column;align-items:center;
width:100%;height:60vh;overflow:hidden;overflow-y:scroll;
    margin-bottom:20px;
    ::-webkit-scrollbar {
      width: 0px;}
`

const Tela=styled.div`
width: 100vw;height:100vh;
background-color: #AD1A1A;
display: flex;flex-direction:column;align-items:center;
align-items: center;

button{
  width:25vw;height:50px;background-color:#6B491A;
  border:0;color:white;font-size:25px;border-radius:5px
}

h2{margin-top:30px;font-size:18px}
h3{margin-bottom:20px;font-size:18px;color:rgb(239, 227, 63)}
`
