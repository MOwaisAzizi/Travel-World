
import styles from './Button.module.css'

function Button({children,type,onClick}){
    return <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>{children}</button>
}
export default Button