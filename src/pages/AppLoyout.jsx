import styles from './AppLayout.module.css'
import AppNav from "../component/AppNav"
import SideBar from "../component/Sidebar"
import Map from "../component/Map"
import User from '../component/User'


function AppLoyout(){
    return <div className={styles.app}>
     <SideBar/>
     <Map/>
     <User/>
    </div>
}
export default AppLoyout