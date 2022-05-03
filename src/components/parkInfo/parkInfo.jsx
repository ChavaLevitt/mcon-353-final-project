import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from '@mui/material/Button';

import PushPinIcon from '@mui/icons-material/PushPin';
import IconButton from '@mui/material/IconButton';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";
import { Reviews } from "@mui/icons-material";

export const ParkInfo = (props) => {
  const { parkCode } = useParams();
  const [park, setPark] = useState({});

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
        {/* <div style={{width: "75%", margin:"auto"}}><img src={park?.images[0]?.url} style={{height:"300px", width:"90%", margin: "auto", marginTop: "2%"}}/></div> */}
        <h2>{park.fullName}
        <IconButton size="small"style={{marginLeft: "auto"}} onClick = {() => props.addPinnedParks(park)}>
        <PushPinIcon/>
        </IconButton>
        </h2>
      </div>
      <div style={{ width: "75%", margin: "auto" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{park.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
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

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography>Weather</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{park.weatherInfo}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
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

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8a-content"
            id="panel8a-header"
          >
            <Typography>Reviews</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <WriteReview />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>


      <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {park.images && park.images.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              // alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={item.author} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
    </div>
  );
};

function WriteReview(props) {
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <div>
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
          style={{ width: 200 }}
        />
      </div>
      <Button variant="contained">Submit</Button>
    </div>
  );
}

//hours, addresses, contact
