import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import logo3 from "../../parks.jpg";
import PushPinIcon from "@mui/icons-material/PushPin";
import IconButton from "@mui/material/IconButton";
import { PinsContext } from "../app/context";
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom"
import {useContext, useState} from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { VisitedContext } from "../app/visitedContext";
import { Button, CardActions } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Stack from '@mui/material/Stack';
 import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
//import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


export const ParkListItem = (props) => {
    //const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    // const handleChange = (newValue) => {
    //   setValue(newValue);
    // };
    const navigate = useNavigate();
    const [theNotes, setTheNotes] = useState("");
    const listContext = useContext(PinsContext);
    const visitedContext = useContext( VisitedContext);

    const updateData = (props) => {
    
      listContext.listDispatch({
        type: "remove",
        index: props.index,
      }
      );
      listContext.listDispatch({
        type: "add",
        park: props.park,
        notes: theNotes,
      });
      setTheNotes("");
    };

      const deletePinPark = (index) => {
        // {console.log(index)}
        listContext.listDispatch({
          type: "remove",
          //index: props.index,
          index: index,
        }
        );

    };

    const addVisited = (props) => {     
      visitedContext.listDispatch({
       
        type: "add",
        index: props.index,
        park: props.park,
        parkid: props.park.park.parkCode,
    
      });
      deletePinPark(props.index);
    };


  return (
    <div>
      <Paper>
        <Checkbox checked = {false} onClick = {() => addVisited(props)} color="default" />
        <span  onClick = {()=>navigate(`/parkInfo/${props.park.park.parkCode}`)}>
          {/* {console.log(props.park.park.fullName)} */}
         {props.park.park.fullName}
         {/* {console.log(props.park)} */}
        </span>
       

        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider> */}
        <div>
        <TextareaAutosize
          maxRows={4}
          aria-label="maximum height"
          placeholder="type notes here"
          value={theNotes}
          onChange={(e) => setTheNotes(e.target.value)}
          style={{ width: 200, marginLeft:"5%" }}
        />
        <div style={{marginLeft: "5%"}}>Notes: {props.notes}</div>
        </div>
        
        <table>
          <tr>
            <td style={{width:"95%"}}>
        <Button onClick={() => updateData(props)}>Save</Button>
            </td>
            <td>
        <Button onClick={() => deletePinPark(props.index)}>
          <DeleteIcon/>
        </Button>
            </td>
        </tr>
        </table>
      </Paper>
    </div>
  );
};


// with npm
// npm install @mui/x-date-pickers
// "peerDependencies": {
//     "@mui/material": "^5.2.3",
//     "@mui/system": "^5.2.3",
//     "react": "^17.0.2 || ^18.0.0",
//     "react-dom": "^17.0.2 || ^18.0.0"
// //