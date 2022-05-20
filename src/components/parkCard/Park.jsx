import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import logo3 from "../../parks.jpg";
import PushPinIcon from "@mui/icons-material/PushPin";
import IconButton from "@mui/material/IconButton";

import { useContext } from "react";
import { CardActions } from "@mui/material";
import { PinsContext } from "../app/context";

export const Park = (props) => {
  const navigate = useNavigate();

  const listContext = useContext(PinsContext);

  const addToList = (park) => {
    listContext.listDispatch({
      type: "add",
      index: props.index,
      park: { park },
      notes: " no notes yet...",
    });

    setBtnColor("#bd4c00");
  };

  const isPinned = (park) => {
    for (let par in listContext.listState) {
      if (listContext.listState[par].park.park.parkCode == park.parkCode) {
        return true;
      }
    }
    return false;
  };

  const [btnColor, setBtnColor] = useState(() =>
    isPinned(props.park) ? "#bd4c00" : "white"
  );

  return (
    <div>
      <Card sx={{ maxWidth: 345 }} style={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="140"
          src={
            props.park.images && props.park.images[0].url
              ? props.park.images[0].url
              : logo3
          }
          onError={(e) => ((e.target.onerror = null), (e.target.src = logo3))}
        ></CardMedia>

        <IconButton
          size="small"
          style={{
            marginLeft: "auto",
            position: "absolute",
            top: "1%",
            right: "1%",
            margin: "0%",
          }}
          onClick={() => addToList(props.park)}
        >
          <PushPinIcon style={{ color: btnColor }} />
        </IconButton>

        <CardActionArea
          onClick={() => navigate(`/parkInfo/${props.park.parkCode}`)}
        >
          <CardContent style={{ height: 40 }}>
            <Typography gutterBottom variant="h6" component="div">
              {props.park.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ display: "flex" }}></CardActions>
      </Card>
    </div>
  );
};
