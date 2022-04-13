import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

export const ParkInfo = () =>{

    const { parkCode } = useParams();
    return(
        <div>
            Park info
            <p>Id: {parkCode}</p>
        </div>
        
    
        );
        
   
}