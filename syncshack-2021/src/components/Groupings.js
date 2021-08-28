import React, { useState } from 'react';
import { Card, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom"

import { activities, activities2 } from '../const';
import '../assets/Dashboard.css';

const useStyles = makeStyles({
  cardStyle: {
    // backgroundColor: ,
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    boxShadow: '0 4px 10px 2px rgba(100, 100, 100, 1)',
    borderRadius: 10,
    padding: 8,
    margin: 10,
    textAlign: 'center',
    height: '400px'
  },
  cardStyleCompleted: {
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
    boxShadow: '0 4px 10px 2px rgba(100, 100, 100, 1)',
    borderRadius: 10,
    padding: 8,
    margin: 10,
    textAlign: 'center',
    height: '300px'
  },
  gridStyle: {
    minHeight: '100%',
    objectFit: 'contain',
    flexGrow: 1,
  },
  buttonStyle: {
    margin: 10,
    borderRadius: 50,
  }
});

function Groupings(props) {
  const classes = useStyles();
  let currentActvities = props.selected ? activities2 : activities;
  const [redirectPetPlayground, setRedirectPetPlayground] = useState(false);
  const location = '/pets/'
  const dogs = ['dog.gif', 'dog-bw.gif', 'hotdog.gif', 'dog-crown.gif'];

  function renderRedirect() {
    if (redirectPetPlayground) {
      return (<Redirect to='/playground'/>);
    }
  }

  function chooseDog(level) {
    if (level === 1) {
      return location+dogs[0];
    } else if (level === 2) {
      return location+dogs[1];
    } else if (level === 3) {
      return location+dogs[2];
    } else {
      return location+dogs[3];
    }
  }

  return (
    <div>
      <Grid container justifyContent="space-evenly">
        {currentActvities.currentActivities.map ((x, idx)=>{ return (
          <Grid item xs={4}>
            <Card className={classes.cardStyle}>
              <Grid
                container
                className={classes.gridStyle}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item><div className="text-padded">
                  <p className="line">With </p>
                  <h3 className="line">{x.partnerName}</h3>
                  <p className="line">I am learning </p>
                  <h3 className="line">{x.skillLearning}</h3>
                  <p className="line">and I am teaching </p>
                  <h3 className="line">{x.skillSharing}</h3>
                  <p className="line"> and we have </p>
                  <h3 className="line">{x.petName}</h3>
                  <p className="line"> who is on level </p>
                  <h3 className="line">{x.petAge}</h3>
                </div></Grid>
                <Grid item><img src="/pets/dog.gif" className="image-spacing"/></Grid>
                <Grid item><Button variant="contained" className={classes.buttonStyle} onClick={()=>setRedirectPetPlayground(true)}>
                  Let's interract
                </Button></Grid>
              </Grid>
            </Card>
          </Grid>
        );})}

        {currentActvities.completedActivities.map ((x, idx)=>{ return (
          <Grid item xs={4}>
            <Card className={classes.cardStyleCompleted}>
              <Grid
                container
                className={classes.gridStyle}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item><div className="text-padded">
                  <p className="line">With </p>
                  <h3 className="line">{x.partnerName}</h3>
                  <p className="line">I learnt </p>
                  <h3 className="line">{x.skillLearning}</h3>
                  <p className="line">and I taught </p>
                  <h3 className="line">{x.skillSharing}</h3>
                  <p className="line"> and raised </p>
                  <h3 className="line">{x.petName}</h3>
                  <p className="line"> to level </p>
                  <h3 className="line">{x.petAge}</h3>
                </div></Grid>
                <Grid item><img src={chooseDog(x.petAge)} className="image-spacing"/></Grid>
                <Grid item><Button variant="contained" className={classes.buttonStyle}>
                  See my pet
                </Button></Grid>
              </Grid>
            </Card>
          </Grid>
        );})}
      </Grid>
      {renderRedirect()}
    </div>
  );
}

export default Groupings;
