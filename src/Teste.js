import {useState,useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from "./UserContext.js";
import Modal from './Modal.js';
import axios from 'axios'

export default function Teste(){
    const { setHeader,setUser,link } = useContext(UserContext);
    
    return(
        <Content>
          <img src='https://drive.google.com/uc?export=view&id=1xy63hRHRjwK4r_hvYikcm2CMl9yh1DS4'/>
        </Content>
    )
}


const Content=styled.div`
h6{font-family: 'Amatic SC', cursive;margin:20px 0 0 0;font-size:80px;}
img{width:300px;height:300px;}
width: 100%;box-sizing:border-box;height:100vh;
background-color: #ad1a1a;
display: flex;flex-direction:column;
align-items: center;
button{cursor:pointer}

  input{padding-left:13px;width:100%;height:50px;background-color:black;margin-top:40px;
    color:white;font-size:25px;border:0;border-radius:5px}
  
  h1{color:white;font-size:25px}
  ion-icon{color:white;font-size:50px}
  form{width:80vw;display:flex;flex-direction:column;align-items:center;
  position:relative;
    max-width:500px
}
  
`
