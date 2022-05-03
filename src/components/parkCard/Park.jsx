import {useNavigate} from "react-router-dom"
import {React, useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import logo3 from "../../parks.jpg";
import PushPinIcon from '@mui/icons-material/PushPin';
import IconButton from '@mui/material/IconButton';

import ImageListItemBar from '@mui/material/ImageListItemBar';

import { Button, CardActions } from '@mui/material';


export const Park = (props) => {
  
    const navigate = useNavigate();
      return(
      
          <div>
          <Card sx={{ maxWidth: 345 }} style={{position: "relative"}}>
        
          <CardMedia 
            component="img"
            height="140"
            //image={logo3}
            src={ props.park.images &&  props.park.images[0].url  ?  props.park.images[0].url : logo3 }
            onError={(e) => (e.target.onerror = null, e.target.src = logo3)}
           // alt="image"
           ></CardMedia>
        
      
          <IconButton size="small"style={{marginLeft: "auto", position: "absolute", top: "1%", right: "1%", margin: "0%"}} onClick = {() => props.addPinnedParks(props.park)}>
            <PushPinIcon style = {{color: "white"}}/>
          </IconButton>
     
        <CardActionArea>
          {/* {console.log(props.park.images[0].url)} */}
          <CardContent style={{height: 40}} sx={{
                // background:
                //   'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                //   'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}>
            <Typography gutterBottom variant="h6" component="div" onClick = {()=>navigate(`/parkInfo/${props.park.parkCode}`)}>
       
            {props.park.fullName}
            
            </Typography>
            <Typography variant="body2" color="text.secondary">
            
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{display: "flex"}}>
        
      </CardActions>
      </Card>
          </div>
      );
  };
  