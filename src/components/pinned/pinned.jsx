import {Park} from "../parkCard/Park";
export const Pinned = (props) =>{


    return(
        <div>Pin Page
        {props.pinnedParks.map((p, index) => (
          <div>
          <Park
            key={index}
            index={index}
            park={p.park}
            addPinnedParks = {props.addPinnedParks}
          />
          </div>
        ))}
        </div>
        
    
    );
        
   
}