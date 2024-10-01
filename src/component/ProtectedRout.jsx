import { useEffect } from "react"
import { useAuth } from "../contexts/FakeauthContext"
import { useNavigate } from "react-router-dom"

function ProtectedRoute({children}){

  const {authunticated} = useAuth()
  const navigate = useNavigate()

    useEffect(function(){
        if(!authunticated) navigate('/')
    },[authunticated,navigate])

    return authunticated ? children : null 
}
 
  export default ProtectedRoute