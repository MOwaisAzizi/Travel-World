import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem.jsx'
import Message from './Message.jsx'
import { useCities } from '../contexts/CitiesContext'

export default function CountryList(){
  const {isLoading,cities} = useCities()


  if(isLoading) return <Spinner/>
  if(!cities.length) return <Message message='Add your first city by clicking on the map'/>
  
  const country = cities.reduce((arr,city)=>{
    if(!arr.map(el=>el.country).includes(city.country)) return [...arr,{country:city.country,emoji:city.emoji}]
    else return arr
  },[])

    return(
        <ul className={styles.countryList}>
          {
            country.map(country=>{
              return <CountryItem country={country}/>
            })
          }
        </ul>
    )
}