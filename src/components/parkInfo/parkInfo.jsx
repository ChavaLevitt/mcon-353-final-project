import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState, useContext } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

import PushPinIcon from "@mui/icons-material/PushPin";
import IconButton from "@mui/material/IconButton";
import { PinsContext } from "../app/context";
import { ReviewContext } from "../app/reviewContext";
import "react-carousel-responsive/dist/styles.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo3 from "../../parks.jpg";

export const ParkInfo = (props) => {
  const { parkCode } = useParams();
  const [park, setPark] = useState({});

  const listContext = useContext(PinsContext);

  const addToList = (park) => {
    listContext.listDispatch({
      type: "add",
      park: { park },
      notes: " no notes yet...",
    });
    setBtnColor("#bd4c00");
  };

  const isPinned = (park) => {
    for (let par in listContext.listState) {
      if (listContext.listState[par].park.park.parkCode == parkCode) {
        return true;
      }
    }
    return false;
  };

  const [btnColor, setBtnColor] = useState(() =>
    isPinned(props.park) ? "#bd4c00" : "black"
  );

  useEffect(() => {
    fetch(
      `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=5mroWmh53h64MgSfZssT1BIbJ0WrKqmV62CsW7yi`
    )
      .then((response) => response.json())
      .then((data) => {
        setPark(data.data[0]);
      });
  }, []);

  return (
    <div>
      <div style={{ width: "75%", margin: "auto" }}>
        <h2>
          {park.fullName}
          <IconButton
            size="small"
            style={{ marginLeft: "auto" }}
            onClick={() => addToList(park)}
          >
            <PushPinIcon style={{ color: btnColor }} />
          </IconButton>
        </h2>
      </div>

      <Pictures park={park} />
      <div
        style={{
          width: "75%",
          margin: "auto",
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        <Accordion expanded={true}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{park.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={true}>
          <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
            <Typography>Activities</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {park.activities &&
                park.activities.map((activity, index) => (
                  <span>- {activity.name}</span>
                ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={true}>
          <AccordionSummary aria-controls="panel3a-content" id="panel3a-header">
            <Typography>Directions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div>{park.directionsInfo}</div>
              click &nbsp;
              <a href={park.directionsUrl} target="_blank">
                here
              </a>
              &nbsp;for more info
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={true}>
          <AccordionSummary aria-controls="panel5a-content" id="panel5a-header">
            <Typography>Weather</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{park.weatherInfo}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={true}>
          <AccordionSummary aria-controls="panel6a-content" id="panel6a-header">
            <Typography>Fees</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {park.entranceFees &&
                park.entranceFees.map((fees, index) => (
                  <div>
                    -<div>{fees.title}</div>
                    <div>${fees.cost}</div>
                    <div>{fees.description} </div>
                  </div>
                ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={true}>
          <AccordionSummary aria-controls="panel7a-content" id="panel7a-header">
            <Typography>Hours</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {park.operatingHours &&
                park.operatingHours.map((oh, index) => (
                  <span>{oh.description}</span>
                ))}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={true}>
          <AccordionSummary aria-controls="panel8a-content" id="panel8a-header">
            <Typography>Reviews</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <WriteReview park={park} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

function Pictures(props) {
  return (
    <div>
      <div
        className="carousel-wrapper"
        style={{ width: "40%", margin: "auto" }}
      >
        <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
          {props.park.images &&
            props.park.images.map((item, index) => (
              <div style={{ height: "20rem" }}>
                <img
                  src={item.url}
                  onError={(e) => (
                    (e.target.onerror = null), (e.target.src = logo3)
                  )}
                />
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
}

function WriteReview(props) {
  const [value, setValue] = React.useState(0);
  const [theNotes, setTheNotes] = React.useState("");
  const reviewContext = useContext(ReviewContext);
  const submitReview = (props) => {
    reviewContext.listDispatch({
      type: "add",
      parkCode: props.park.parkCode,
      notes: theNotes,
      rating: value,
    });
    setTheNotes("");
    setValue(0);
  };

  return (
    <div>
      <div>
        {reviewContext.listState.get(props.park.parkCode) &&
          reviewContext.listState.get(props.park.parkCode).map((rev, index) => (
            <div style={{ width: 800, marginTop: "1%" }}>
              <Rating name="read-only" value={rev.rating} />
              <div>{rev.notes}</div>
            </div>
          ))}
        <div style={{ marginTop: "2%" }}>Write a Review:</div>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
      <div>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="write a review"
          style={{ width: 800, height: 200 }}
          value={theNotes}
          onChange={(e) => setTheNotes(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={() => submitReview(props)}>
        Submit
      </Button>
    </div>
  );
}
