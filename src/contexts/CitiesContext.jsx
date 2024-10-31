import { createContext,useEffect, useContext, useReducer, useCallback } from "react"

const CityContext = createContext()

function CityProvider({children}){

// const[cities,setCities] = useState([])
// const[isLoading,setIsLoading] = useState(false)
// const [currentCity,setCurrentCity] = useState({})

const URL_Base = 'http://localhost:9000'

function reducer(state,action){
  switch(action.type){
    case 'loading':return {
      ...state,
      isLoading : true,
    }
    case 'cities/loaded' :{
    return {
      ...state,
      isLoading : false,
      cities : action.payload
    }
  } 

    case 'city/loaded' : return{
      ...state,
      isLoading:false,
      currentCity:action.payload

    } 

    case 'city/created' : return{
      ...state,
      isLoading:false,
      cities : [...state.cities,action.payload],
      currentCity:action.payload
    } 

    case 'city/deleted' : return{
      ...state,
      isLoading:false,
      cities :  state.cities.filter(city=>city.id !== action.payload),
      currentCity:{}
    } 

    case'rejected' : return{
      ...state,
      isLoading:false,
      error:action.payload
    }
    default : throw new Error('not valid type')

  }
}

const initialState = {
 cities:[],
 isLoading:false,
 currentCity:{},
 error:''
}

const [{cities,isLoading,currentCity,errer},dispatch] = useReducer(
   reducer,
   initialState
)

useEffect(function(){
  async function fectchCities(){
    try{
      dispatch({type:'loading'})
      const res = await fetch(`${URL_Base}/cities`)
      const data = await res.json()
      dispatch({type:'cities/loaded',payload:data})
      
    }catch{
      dispatch({type:'rejected' , payload:'some problem acured in fetching data'})
    }
  }
  fectchCities()
},[])

const getCity = useCallback(async function getCity(id){
  //not fetching city data if it is active
  if(Number(id)===currentCity.id) return
  
  try{
      dispatch({type:'loading'})
        const res = await fetch(`${URL_Base}/cities/${id}`)
        const data = await res.json()
        dispatch({type:'city/loaded',payload:data})
      }catch{
        dispatch({type:'rejected' , payload:'some problem acured in fetching data'})
      }
},[currentCity.id]
)

async function createCity(newCity){
  
  try{
    dispatch({type:'loading'})
      const res = await fetch(`${URL_Base}/cities`,{
        method:'POST',
        body:JSON.stringify(newCity),
        headers:{
        'Content-Type' : 'application/json'
              }
      })
      const data = await res.json()
      dispatch({type:'city/created',payload:data})
      
    }catch{
      dispatch({type:'rejected' , payload:'some problem acured in creating city'})
    }
}

async function deleteCity(id){
  
  try{
    dispatch({type:'loading'})
       await fetch(`${URL_Base}/cities/${id}`,{
        method:'DELETE',
      })
            dispatch({type:'city/deleted',payload:id})
      
    }catch{
      dispatch({type:'rejected' , payload:'some problem acured in deleting city'})
    }
}

// async function getCity(id){
//   try{
//       const res = await fetch(`${URL_Base}/cities/${id}`)
//       const data = await res.json()
//       setCurrentCity(data)
//     }catch{
//      alert('some problem acured in fetching data')
//     }finally{
//       setIsLoading(false)
//     }
// }

// async function createCity(newCity){

// try{
  
//     setIsLoading(true)
//     const res = await fetch(`${URL_Base}/cities`,{
//       method:'POST',
//       body:JSON.stringify(newCity),
//       headers:{
//       'Content-Type' : 'application/json'
//             }
//     })
//     const data = await res.json()
//     setCities(cities=>[...cities,data])
    
//   }catch{
//    alert('some problem acured in creating city')
//   }finally{
//     setIsLoading(false)
//   }
// }

// async function deleteCity(id){
// try{
//     setIsLoading(true)
//      await fetch(`${URL_Base}/cities/${id}`,{
//       method:'DELETE',
//     })
//     setCities(cities=>cities.filter(city=>city.id !== id))
    
//   }catch{
//    alert('some problem acured in Deleting data')
//   }finally{
//     setIsLoading(false)
//   }
// }

// useEffect(function(){
//   async function fectchCities(){
//     try{
//       setIsLoading(true)
//       const res = await fetch(`${URL_Base}/cities`)
//       const data = await res.json()
//       setCities(data)
//     }catch{
//      alert('some problem acured in fetching data')
//     }finally{
//       setIsLoading(false)
//     }
//   }
//   fectchCities()
// },[])

return <CityContext.Provider value={{
    isLoading,
    cities,
    getCity,
    currentCity,
    createCity,
    deleteCity,
    errer
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