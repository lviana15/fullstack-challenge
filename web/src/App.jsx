import { useState } from 'react';
import Home from './Home'
import { Login } from './Login'

export default function App() {
   const [user,setUser] = useState();

   return user ? <Home /> :  <Login signInUser={setUser}/>
}