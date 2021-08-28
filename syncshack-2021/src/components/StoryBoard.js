import { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => {
  let textShadow = "";
  for (let i = 0; i < 80; i++) {
    textShadow += `${i}px ${i}px 0 ${theme.palette.grey[400]},`;
  }
  textShadow = textShadow.slice(0, -1);
  return {
    root: {
      width: "100%",
    },
    imgBox: {
      width: "100%",
      textAlign: "center",
      margin: "60px 0",
    },
    img: {
      userSelect: "none",
    },
    textBox: {
      textAlign: "center",
    },
    testAlign: {
      marginLeft: "-45px",
    },
    brand: {
      marginLeft: "-30px",
      textTransform: "uppercase",
      fontWeight: "700",
      fontSize: "3.5rem",
      "&$animate": {
        position: "relative",
        color: "transparent",
        "-webkit-text-stroke": `1px ${theme.palette.primary.light}`,
      },
    },
    animate: {
      "&::before": {
        content: "attr(data-text)",
        position: "absolute",
        left: 0,
        width: 0,
        overflow: "hidden",
        height: "100%",
        color: theme.palette.primary.main,
        "-webkit-text-stroke": 0,
        borderRight: "2px solid",
        animation: "$animate 12s ease-in infinite",
        textShadow,
      },
    },
    "@keyframes animate": {
      "0%,20%,100%": { width: 0 },
      "40%, 95%": { width: "100%" },
    },
  };
});

export default memo(function StoryBoard({ isSignup }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imgBox}>
        <img
          className={classes.img}
          src={isSignup ? "/static/hotdog.gif":"/static/dogStandingL.gif"}
          alt="cute puppy gif"
        />
      </div>
      <div className={classes.textBox}>
        <Typography
          component="span"
          variant="h1"
          data-text="Skillpetica"
          gutterBottom
          className={clsx(classes.brand, classes.animate)}
        >
          Skillpetica
        </Typography>
        <Typography component="div" variant="subtitle1" className={classes.testAlign}>
          Learn new skills and watch your pet grow!
        </Typography>
      </div>
    </div>
  );
});
