
import {  useNavigate } from "react-router-dom";
import Button from "./Button";
function BackButton(){
    const Navigate = useNavigate()
    return(
         <Button type='back' onClick={(e)=>{
            e.preventDefault()
            Navigate(-1)
           }}>&larr; Back</Button>
    )
}
export default BackButton