import {useState,useEffect} from 'react'

import styled from 'styled-components'

import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

import { useContext } from 'react';
import UserContext from './UserContext';

    

export default function AllGames(){
  const {header,link,user}=useContext(UserContext)
   const navigate=useNavigate()
    return(
        <Tela>
          <button onClick={()=>navigate('/')}>
            Xadrez
          </button>
          <button onClick={()=>navigate('/senha')}>
            Senha
          </button>
        </Tela>
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
