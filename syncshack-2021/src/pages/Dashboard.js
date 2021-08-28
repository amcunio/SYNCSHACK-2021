import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Button, Avatar, IconButton, Menu } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom"

import Groupings from '../components/Groupings';
import MySkills from '../components/MySkills';
import '../assets/Dashboard.css';

const useStyles = makeStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  appbar: {
    background: '#B3565F',
    alignContent: 'space-around',
    alignItems: 'right'
  },
  buttonAlign: {
    alignItems: 'right'
  },
});

function Dashboard() {
  const classes = useStyles();
  const [selected, setSelected] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  // const [infoDialog, setInfoDialog] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  function handleOpenProfile(event) {
    setProfileOpen(true);
    setAnchor(event.currentTarget)
  }

  function handleCloseProfile() {
    setProfileOpen(false);
    setAnchor(null)
  }
  
  function renderRedirect() {
    if (redirectLogin) {
      return (<Redirect to='/'/>);
    }
  }

  return (
      <div className='background-gradient'>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <h3 className="title-spacing">Welcome Elon, see the progress you've made!</h3>
              </Grid>
              <Grid item>
                <Avatar><IconButton onClick={handleOpenProfile}>
                  A
                </IconButton></Avatar>
                <Menu anchorEl={anchor} open={profileOpen} onClose={()=>handleCloseProfile()}><div className="profile-style">
                  <p>Hey Alexander</p>
                  <p><i>Your overall level is 11</i></p>
                  <Button
                    color="inherit"
                    variant="contained"
                    onClick={()=>setRedirectLogin(true)}
                  >Logout</Button>
                </div></Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container justifyContent="space-between" className="page-width">
          <Grid item className="left-pane">
            <Groupings selected={selected}/>
          </Grid>
          <Grid item className="right-pane">
            <MySkills selected={selected} makeSelected={setSelected}/>
          </Grid>
        </Grid>
        {renderRedirect()}
      </div>
  );
}

export default Dashboard;
