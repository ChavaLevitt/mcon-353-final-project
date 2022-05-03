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


export const parkListItem = (props) => {
    return(
        <div>
            {props.park.fullName}
        </div>
    );
}