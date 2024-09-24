 
import {useState} from 'react'

export function useGeolaction(defaulPosition=null){
  const[isLoading,setIsLoading] = useState(false)
  const[position,setPosition] = useState(null)
  const[error,setError] = useState(null)
  
  function getPostion(){
    if(!navigator.geolocation)
    return setError('Your browser does not suppurt geolocation')
 
 setIsLoading(true)
 navigator.geolocation.getCurrentPosition((pos)=>{
  setPosition({
    lat:pos.coords.latitude,
    lng:pos.coords.longitude
  })
  setIsLoading(false)
 },
 (error)=>{
  setError(error.message)
  setIsLoading(false)
 }
 )
  }

  return{isLoading,position,error,getPostion}
}
