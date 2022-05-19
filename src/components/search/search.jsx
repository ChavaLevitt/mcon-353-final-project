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
        <Button size="small">
          <a href={props.info.url} target="_blank">
            More
          </a>
        </Button>
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
