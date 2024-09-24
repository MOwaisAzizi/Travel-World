import { createContext,useState,useEffect, useContext } from "react"

const CityContext = createContext()

function CityProvider({children}){


const[cities,setCities] = useState([])
const[isLoading,setIsLoading] = useState(false)
const [currentCity,setCurrentCity] = useState({})

const URL_Base = 'http://localhost:9000'

useEffect(function(){
  async function fectchCities(){
    try{
      setIsLoading(true)
      const res = await fetch(`${URL_Base}/cities`)
      const data = await res.json()
      setCities(data)
    }catch{
     alert('some problem acured in fetching data')
    }finally{
      setIsLoading(false)
    }
  }
  fectchCities()
},[])

async function getCity(id){
    try{
        setIsLoading(true)
        const res = await fetch(`${URL_Base}/cities/${id}`)
        const data = await res.json()
        setCurrentCity(data)
      }catch{
       alert('some problem acured in fetching data')
      }finally{
        setIsLoading(false)
      }
}

return <CityContext.Provider value={{
    isLoading,
    cities,
    getCity,
    currentCity
}}>

{children}

</CityContext.Provider>
}

function useCities(){
    const context = useContext(CityContext)
    if(context===undefined) throw new Error('You can only use context in child Component not parent')
    return context
}

export {CityProvider,useCities}