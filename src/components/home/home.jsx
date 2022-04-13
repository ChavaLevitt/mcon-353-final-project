import {React, useState} from "react";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo3 from "../../parks.jpg";
import {useNavigate} from "react-router-dom"


import './home.css';

export const Home = () => {


  const [parks, setParks] =  useState([]); 
  const [parkCode, setParkCode] = useState("");

  const search = (props) => {
    
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${props}&api_key=5mroWmh53h64MgSfZssT1BIbJ0WrKqmV62CsW7yi`)
      .then((response) => response.json())
      .then((data) => {
        setParks(data.data);
      });

      
    };

  return (
    <div>
      Home Page
      <div style={{width: '73%', margin:'auto'}}>
        <table>
          <tr>
            <td style={{width: '100%', margin:'auto'}}>
        <TextField fullWidth label="Enter 2 digit state code" id="fullWidth" value={parkCode} onChange={(e) => setParkCode(e.target.value)}/>
        </td>
        <td>
        <SearchIcon style={{height: '100%'}} fontSize="large" variant="outlined" onClick = {() => search(parkCode)}>Go</SearchIcon>
        </td>
        </tr>
        </table>
        </div>
     
      <div id='grid' style={{width: '75%', margin:'auto'}}>
        
        {parks.map((park, index) => (
          <div>
          <Park
            key={index}
            index={index}
            park={park}
          />
          </div>
        ))}
      </div>
      {console.log(parks)}
    </div>
  );
};

function Park(props){
  // const [pic,setPic] = useState({}); 

  const navigate = useNavigate();
    return(
    
        <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          //image={logo3}
          src={ props.park.images &&  props.park.images[0].url  ?  props.park.images[0].url : logo3 }
          onError={(e) => (e.target.onerror = null, e.target.src = logo3)}
         // alt="image"
          
        />
        {console.log(props.park.images[0].url)}
        <CardContent style={{height: 55}}>
          <Typography gutterBottom variant="h6" component="div" onClick = {()=>navigate(`/parkInfo/${props.park.parkCode}`)}>
     
          {props.park.fullName}
     
          </Typography>
          <Typography variant="body2" color="text.secondary">
          
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </div>
    );
}
