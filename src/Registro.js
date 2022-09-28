import {useState} from 'react'

import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from './UserContext';
import Modal from './Modal';
import axios from 'axios';

    
export default function Cadastro(){
    const {setHeader,link,setUser} = useContext(UserContext)
    const [error,setError]=useState('')
    const navigate=useNavigate()
    const [nome,setNome]=useState('')
    const [senha,setSenha]=useState('')
    function register(event){
      event.preventDefault()
      const formData={nome,senha}
      const promise=axios.post(`${link}/cadastro`,formData)
      promise.then(res=>{
        setUser(nome)
        setHeader({headers: {nome}})
        localStorage.setItem("header", JSON.stringify({headers: {nome}}))
        localStorage.setItem("user", JSON.stringify(nome))
        navigate('/')
      })
      promise.catch(e=>{
        console.log(e)
        if(e.response && e.response.data){
          return setError(e.response.data)
        }
        setError('Desculpe. Nosso servidor está fora do ar')
      })
    }
    return(
        <Content>
            {error?<Modal buttons={false} text={error} functionYes={()=>setError('')} />:<></>}
            <form onSubmit={register}>
              <input value={nome} onChange={e=>setNome(e.target.value)}  placeholder='nome...'></input>
              <input  type='password' value={senha} onChange={e=>setSenha(e.target.value)}  placeholder='senha...'></input>
              <MainButton type='submit'>Cadastrar</MainButton>
            </form>
            <Button onClick={()=>navigate('/login')}>
              Já tem conta? entre aqui
            </Button>
        </Content>
    )
}

const MainButton=styled.button`
width:42vw;height:70px;background-color:#840f0f;margin-top:40px;
  display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
  border:0;border-radius:10px;
  color:white;font-size:25px;max-width:280px;
`

const Content=styled.div`
width: 100%;box-sizing:border-box;height:100vh;
background-color: #AD1A1A;
display: flex;flex-direction:column;
align-items: center;
button{cursor:pointer}
input{padding-left:13px;width:100%;height:50px;background-color:black;margin-top:40px;
  color:white;font-size:25px;border:0;border-radius:5px}

  h1{color:white;font-size:25px}
  ion-icon{color:white;font-size:50px}
  form{width:80vw;display:flex;flex-direction:column;align-items:center;
    position:relative;max-width:500px}
`
const Button=styled.button`
background-color:#AD1A1A;width:50vw;height:50px;margin-top:40px;
display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
border:0;border-radius:10px;
color:white;font-size:25px;
`