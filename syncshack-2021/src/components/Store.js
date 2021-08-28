import { useEffect } from "react";
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
import { AirlineSeatLegroomExtraSharp } from "@material-ui/icons";

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
}));

function Store({ hasBowl, setHasBowl, setShowFood, showFood, totalExp, level, setLevel, cash, setCash, show, setShow, setExp }) {
  const classes = useStyles({ show });
  const buyFood = () => {
    setCash(cash - 10);
    setExp(prev => {
      if (prev + 10 >= totalExp[level - 1]) {
        setLevel(level + 1);
        return prev + 10 - totalExp[level - 1]
      } else {
        return prev + 10;
      }
    });
    setTimeout(() => {
      setShow(false);
      setShowFood(true);
    }, 500);
  };

  const buyBowl = () => {
    setCash(cash - 10);
    setExp(prev => {
      if (prev + 10 >= totalExp[level - 1]) {
        setLevel(level + 1);
        return prev + 10 - totalExp[level - 1]
      } else {
        return prev + 10;
      }
    });
    setTimeout(() => {
      setShow(false);
      setHasBowl(true);
    }, 500);
  }
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
      <div className={classes.root}>
        <Typography component="h2" variant="h3" className={classes.title}>
          Buy items for your pet
        </Typography>
        <List>
          <ListItem disabled={cash < 10} button onClick={buyFood}>
            <ListItemIcon className={classes.item}>
              <img src="/static/box.png" alt="a box of pet food" width="80px" />
            </ListItemIcon>
            <ListItemText
              primary="($10) Feed your dog for 10 EXP"
              primaryTypographyProps={{ className: classes.text }}
            />
          </ListItem>
          <Divider />
          <ListItem disabled={level < 2 || hasBowl || cash < 10} button onClick={buyBowl}>
            <ListItemIcon className={classes.item}>
              {level < 2 && <LockOutlinedIcon className={classes.lock} />}
              <img src="/static/bowl.png" alt="a bowl" width="80px" />
            </ListItemIcon>
            <ListItemText
              primary={"($10) A dog food bowl for 10 EXP\nUnlocked at level 2"}
              primaryTypographyProps={{ className: classes.text }}
            />
          </ListItem>
        </List>
        <div className={classes.score}>
          <Typography component="span" variant="h3" className={classes.label}>
            ${cash}
          </Typography>
          <Typography component="span" variant="h3" className={classes.label}>
            <Typography variant="h3" color="secondary">
              LVL&nbsp;
            </Typography>
            {level}
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Store;
