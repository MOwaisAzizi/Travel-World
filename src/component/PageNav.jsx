import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo'


function PageNav() {
    return <nav className={styles.nav}>
      
   <Logo/>
        <ul>    
             <li >
                <NavLink to='/Product'>Product</NavLink>
            </li>  
                 <li >
                <NavLink to='/Pricing'>Price</NavLink>
            </li>
            <li >
                <NavLink to='/Login' className={styles.ctaLink}>Login</NavLink>
            </li>
        </ul>
    </nav>
}
export default PageNav