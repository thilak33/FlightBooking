import React,{ createContext, useContext, useState , useEffect} from 'react'
import axios from 'axios'

const AuthContent = createContext()


const AuthProvider = (props) => {

  const [auth, setAuth] = useState({
    user:null,
    token:'',
  })

  axios.defaults.baseURL = "http://localhost:4000/api/v1"
  axios.defaults.headers.common['auth-token'] = auth?.token


  useEffect(()=>{
    const data = localStorage.getItem('auth')
    if(data){
      let parsed = JSON.parse(data)
      setAuth({...auth,user:parsed.user,token:parsed.token})
    }
  },[])

  return (
    <AuthContent.Provider value={{auth, setAuth }}>
        {props.children}
    </AuthContent.Provider>
  )
}

const useAuth = () => useContext(AuthContent)

export { useAuth, AuthProvider}
