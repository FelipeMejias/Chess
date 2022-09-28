import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IconContext } from "react-icons";
import Cadastro from "./Registro";
import Login from "./Login";
import Xadrez from "./Xadrez";
import UserContext from './UserContext'
import { useState } from "react";
import Menu from "./Menu";
import Teste from "./Teste";
import AllGames from "./AllGames";
import Senha from "./Senha";

const App = () => {

    const [header, setHeader] = useState(JSON.parse(localStorage.getItem("header")));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const link='http://localhost:5743'
    return (
  
        <UserContext.Provider value={{ header,setHeader,link ,user,setUser}}>
          <IconContext.Provider value={{ className: "react-icons" }}>
              <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path='/' element={<Menu/>}/>
                    <Route path='/xadrez/:id' element={<Xadrez />}/>
                    <Route path='/teste' element={<Teste/>}/>
                    <Route path='/all' element={<AllGames/>}/>
                    <Route path='/senha' element={<Senha/>}/>
                </Routes>
              </Router>
          </IconContext.Provider>
        </UserContext.Provider>
    );
  };
  
  export default App;