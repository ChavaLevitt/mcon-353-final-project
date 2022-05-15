import {Park} from "../parkCard/Park";
import {ParkListItem} from "../parkListItem/parkListItem";
import { PinsContext } from "../app/context";
import {useContext} from "react";
import * as React from 'react';
import {useNavigate} from "react-router-dom"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import logo3 from "../../parks.jpg";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import { VisitedContext } from "../app/visitedContext";

export const Pinned = (props) =>{

  const listContext = useContext(PinsContext);
  const visitedContext = useContext( VisitedContext);
  const navigate = useNavigate();
    return(
        <div>
          <table>
            <tr>
              <td style={{width:"55%", padding:"2%"}}> <h2>Bucket List</h2></td>
              <td> <h2>Visited Parks</h2></td>
            </tr>
          <tr>
            <td style={{width:"55%", padding:"2%"}}>
             
              <div style={{ maxHeight:"490px", overflowY:"auto"}}>
                  {listContext.listState.map((p, index) => (
                <div style={{ marginTop:"2%"}}>
                <ParkListItem
                  key={index}
                  index={index}
                  park={p.park}
                  notes={p.notes}
                />
                </div>
              ))}
              </div>
            </td>
            <td style={{padding:"2%"}}>
             
                    <ImageList sx={{ height: "30rem", marginTop: "0%"}}>
              <ImageListItem key="Subheader" cols={2}>
              </ImageListItem>
              {visitedContext.listState.map((item) => (
                
                <ImageListItem key={item.img}>
                  <img
                    src={ item.park.park.images &&  item.park.park.images[0].url  ?  item.park.park.images[0].url : logo3 }
                    onError={(e) => (e.target.onerror = null, e.target.src = logo3)}
                    alt=" "
                    loading="lazy"
                  />
                  <ImageListItemBar 
                    title= {item.park.park.fullName} onClick = {()=>navigate(`/parkInfo/${item.park.park.parkCode}`)}/>
                
                </ImageListItem>
              ))}
            </ImageList>
            </td>
          </tr>
          </table>
       


        </div>
    );
        
   
}