import styles from './AppLayout.module.css'
import AppNav from "../component/AppNav"
import SideBar from "../component/Sidebar"
import Map from "../component/Map"


function AppLoyout(){
    return <div className={styles.app}>
     <SideBar/>
     <Map/>
    </div>
}
export default AppLoyout