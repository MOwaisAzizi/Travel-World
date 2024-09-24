import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message.jsx'
import { useCities } from '../contexts/CitiesContext'

export default function CityList(){
   const {isLoading,cities} = useCities()
   
  if(isLoading) return <Spinner/>
  if(!cities.length) return <Message message='Add your first city by clicking on the map'/>
  
    return(
        <ul className={styles.cityList}>
          {
            cities.map(city=>{
         
              return <CityItem city={city} key={city.id}/>
              
            })
          }
        </ul>
    )
}