import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

const useStyles = makeStyles((theme) => ({
  bg: {
    background: "rgba(0,0,0,0.4)",
    position: "absolute",
    left: (props) => (props.show ? 0 : "-100vw"),
    top: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backdropFilter: "blur(4px)",
    opacity: (props) => (props.show ? 1 : 0),
    transition: "opacity 0.3s ease-in-out",
  },
  root: {
    opacity: (props) => (props.show ? 1 : 0),
    position: "absolute",
    left: "50%",
    top: (props) => (props.show ? "50%" : "-100vh"),
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
    height: "80%",
    maxHeight: "600px",
    background: "white",
    borderRadius: "20px",
    padding: "2rem",
    transition: "opacity 0.2s ease-in-out, top 0.1s ease 0.2s",
  },
  title: {
    fontWeight: 700,
    margin: "2rem 0",
    textAlign: "center",
  },
  score: {
    position: "absolute",
    bottom: "1rem",
    left: 0,
    width: "100%",
    padding: "2rem 4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    position: "relative",
    margin: "1rem",
  },
  lock: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: "1.25rem",
  },
  icon: {
    width: "40px",
    height: "40px",
    verticalAlign: "middle",
    color: theme.palette.secondary.main,
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  food: {
    position: "absolute",
    left: "50%",
    bottom: "40px",
  },
}));

function Store({ show, setShow }) {
  const classes = useStyles({ show });
  const [score, setScore] = useState(200);
  const [experience, setExperience] = useState(2);
  const [showFood, setShowFood] = useState(false);
  const buyFood = () => {
    setScore(score - 10);
    setTimeout(() => {
      setShow(false);
      setShowFood(true);
    }, 500);
  };

  useEffect(() => {
    let timer;
    if (showFood) {
      timer = setTimeout(() => setShowFood(false), 8000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showFood]);

  return (
    <>
      <div className={classes.bg}></div>
      {showFood && (
        <div className={classes.food}>
          <img src="/static/food.gif" alt="food" width="100px" />
        </div>
      )}
      <div className={classes.root}>
        <Typography component="h2" variant="h3" className={classes.title}>
          Buy items for your pet
        </Typography>
        <List>
          <ListItem button onClick={buyFood}>
            <ListItemIcon className={classes.item}>
              <img src="/static/box.png" alt="a box of pet food" width="80px" />
            </ListItemIcon>
            <ListItemText
              primary="Feed your dog for 10 points"
              primaryTypographyProps={{ className: classes.text }}
            />
          </ListItem>
          <Divider />
          <ListItem button disabled>
            <ListItemIcon className={classes.item}>
              <LockOutlinedIcon className={classes.lock} />
              <img src="/static/bowl.png" alt="a bowl" width="80px" />
            </ListItemIcon>
            <ListItemText
              primary="A better feeding experience for 20 points"
              primaryTypographyProps={{ className: classes.text }}
            />
          </ListItem>
        </List>
        <div className={classes.score}>
          <Typography component="span" variant="h3" className={classes.label}>
            <StarRoundedIcon className={classes.icon} /> {score}
          </Typography>
          <Typography component="span" variant="h3" className={classes.label}>
            <Typography variant="h3" color="secondary">
              LVL&nbsp;
            </Typography>
            {experience}
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Store;
