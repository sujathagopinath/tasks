import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import Badge from "@mui/material/Badge";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SocialMedia from "./socialMedia";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = useState(false);
  const [Components, setComponents] = useState([]);
  const [isShare, setShare] = useState(false);
  const [count, setCount] = useState(1);
  const [info, setInfo] = useState([{ comment: "" }]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addComponent = () => {
    setComponents([...Components, []]);
  };

  const shareComponent = () => {
    setShare(true);
  };

  const Addfavourite = () => {
    setCount(count + 1);
  };

  let exitref = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!exitref.current.contains(event.target)) {
        setShare(false);
      }
    });
  });
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            P
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="React Components"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="React Component"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Components are independent and reusable bits of code. They serve the
          same purpose as JavaScript functions, but work in isolation and return
          HTML. Components come in two types, Class components and Function
          components, in this tutorial we will concentrate on Function
          components.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={Addfavourite}>
          <Badge badgeContent={count} color="primary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="share" ref={exitref} onClick={shareComponent}>
          <ShareIcon />
        </IconButton>
        {isShare && <SocialMedia />}

        <IconButton onClick={addComponent}>
          {" "}
          <AddIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        {Components.map((item, index) => (
          <RecipeReviewCard key={index} />
        ))}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Class Component: A class component must include the extends
            React.Component statement. This statement creates an inheritance to
            React.Component, and gives your component access to
            React.Component's functions. The component also requires a render()
            method, this method returns HTML.
          </Typography>
          <Typography>
            Function Component: A Function component also returns HTML, and
            behaves much the same way as a Class component, but Function
            components can be written using much less code, are easier to
            understand
          </Typography>
        </CardContent>
      </Collapse>
      <input
        type="text"
        name="comment"
        placeholder="comment"
        onChange={(e) => handleInputChange(e, i)}
        style={{ border: "none", width: "70%" }}
      />
      <ArrowBackIosIcon style={{ marginLeft: "20px", cursor: "pointer" }} />
      <pre>{(info, undefined, 2)}</pre>
    </Card>
  );
}
