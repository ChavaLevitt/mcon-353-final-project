import { React, useState, useEffect } from "react";
import "./search.css";
import park from "../../mountains.jpg";
import Button from "@mui/material/Button";
import logo3 from "../../parks.jpg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export const Search = (props) => {
  const [news, setNews] = useState([]);

  let navigate = useNavigate();

  const handleClick = () => {
    console.info("You clicked the Chip.");
    navigate("/search");
  };

  useEffect(() => {
    fetch(
      `https://developer.nps.gov/api/v1/newsreleases?api_key=5mroWmh53h64MgSfZssT1BIbJ0WrKqmV62CsW7yi`
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data.data);
      });
  }, []);

  return (
    <div>
      {console.log(news)}
      <div style={{ width: "75%", margin: "auto", position: "relative" }}>
        <img
          src={park}
          style={{
            height: "400px",
            width: "100%",
            margin: "auto",
            marginTop: "2%",
            // opacity: "0.5"
          }}
        />
        <Chip
          style={{
            marginLeft: "auto",
            position: "absolute",
            top: "70%",
            right: "44%",
            margin: "0%",
            fontSize: "20px",
            outlineColor: "rgb(233,196,152)",
          }}
          label="Find a Park"
          color="info"
          onClick={handleClick}
        />
        <div style={{ textAlign: "center" }}>
          <h2>--------- &nbsp;News&nbsp; ---------</h2>
        </div>
      </div>

      <div id="grid" style={{ width: "75%", marginTop: "5%", margin: "auto" }}>
        {news.map((n, index) => (
          <div>
            <Article info={n} />
          </div>
        ))}
      </div>
    </div>
  );
};

function Article(props) {
  return (
    <Card sx={{ maxWidth: 345, MaxHeight: 750 }}>
      <CardMedia
        component="img"
        height="194"
        image={props.info.image.url ? props.info.image.url : logo3}
        onError={(e) => ((e.target.onerror = null), (e.target.src = logo3))}
        alt="Paella dish"
      />
      <CardHeader style={{height: "150px"}} title={props.info.title} subheader={props.info.releaseDate} />

      <CardContent sx={{height: 150}} >
        <div style={{height: "150px", overflowY: "auto"}}>
        <Typography variant="body2" color="text.secondary" >
          {props.info.abstract}
        </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" style={{backgroundColor: "rgb(2,136,209)"}}>
          <a href={props.info.url} target="_blank" style={{textDecoration: "none", color:"white"}}>
            More
          </a>
        </Button>
      </CardActions>
     
    </Card>
  );
}
