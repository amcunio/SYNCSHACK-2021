import React, { useState } from 'react';
import { Avatar, Button, Card, Grid, IconButton, Dialog, DialogTitle, Accordion, AccordionSummary, AccordionDetails, Tooltip, TextField } from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import { mySkills, mySkills2, skillList, friendList, friendList2 } from '../const';
import '../assets/Dashboard.css';

const useStyles = makeStyles((theme) => ({
  avatarSizing: {
    height: theme.spacing(10),
    width: theme.spacing(10),
    backgroundColor: 'rgba(220, 220, 220, 0.75)',
    margin: '10px'
  },
  iconSizing: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    color: 'black'
  },
  dialogStyle: {
    backgroundColor: 'rgb(200, 200, 200)',
    textAlign: 'center',
    overflow: 'hidden'
  },
  partnerDialogStyle: {
    // maxHeight: '1000px',
    // minWidth: '800px',
    overflow: 'hidden'
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: '#7B56B3',
  },
  partnerButtonStyle: {
    borderRadius: 5,
  },
  friendCardStyle: {
    width: "150px",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "7px",
    paddingBottom: "7px",
    marginTop: "1px"
  },
  headerCardStyle: {
    backgroundColor: "gray",
    width: "150px",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "7px",
    paddingBottom: "7px",
    marginTop: "1px"
  },
  content: {
    flexGrow: 1,
  }
}));

function MySkills(props) {
  const classes = useStyles();
  const iconPosition = "/icons/"
  const [dialogOpen, setDialogOpen] = useState(false);
  const [partnerChoiceOpen, setPartnerChoiceOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [skillState, setSkillState] = useState(false);
  const [skillToLearn, setSkillToLearn] = useState(null);
  const [pannelExpanded, setPannelExpanded] = useState(false);
  const skills = skillState ? mySkills2 : mySkills;
  const friends = props.selected ? friendList2 : friendList;

  function onSelectSkill() {
    setSkillState(true);
    setDialogOpen(false);
  }

  function getNewPartner() {
    props.makeSelected(true);
    setPartnerChoiceOpen(false);
    setConfirmationOpen(true);
    setSkillToLearn(null);
  }

  const onAccordianClick = (panel) => (event, newExpanded) => {
    setPannelExpanded(newExpanded ? panel : false);
  };

  return (
    <div><Grid container direction="column" justifyContent="space-evenly" className={classes.content}>
      <Grid item className="split-height">
      <h1 className="title-card">My Skills</h1>
      <Grid container direction="column" justify="space-evenly">
        <Grid item container spacing={1} className="content-card" justifyContent="space-evenly">
          {skills.map((x, idx) => {return (
            <Grid item xs={4}>
              <Tooltip title={x} placement="bottom">
                <Avatar className={classes.avatarSizing}>
                  <img
                    src={iconPosition+x+'.svg'}
                    className={classes.iconSizing}
                  />
                </Avatar>
              </Tooltip>
            </Grid>
          );})}
          <Grid item xs={4}>
            <Tooltip title="Add new" placement="bottom">
              <Avatar className={classes.avatarSizing}>
                <IconButton onClick={()=>setDialogOpen(true)}>
                  <AddIcon className={classes.iconSizing}/>
                </IconButton>
              </Avatar>
            </Tooltip>
          </Grid>
        </Grid>
        
        <Grid item>
          <Button variant="contained" color="primary" className={classes.partnerButtonStyle} onClick={()=>setPartnerChoiceOpen(true)}>
            <p>Find me a new partner</p>
          </Button>
        </Grid>

      </Grid>
      </Grid>
      <Grid item className="split-height">
        <h1 className="title-card">My Connections</h1>
        <Grid container direction="column" alignItems="center">
          <Grid item><Card className={classes.headerCardStyle}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item><h4 className="line">Name</h4></Grid>
              <Grid item><h4 className="line">Level</h4></Grid>
            </Grid>
          </Card></Grid>
          {friends.map((name, idx)=>{return(
            <Grid item><Card className={classes.friendCardStyle}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item><h4 className="line">{name[0]}</h4></Grid>
                <Grid item><h4 className="line">{name[1]}</h4></Grid>
              </Grid>
            </Card></Grid>
          );})}
        </Grid>
      </Grid>
    </Grid>

      <Dialog
        open={dialogOpen}
        onClose={()=>setDialogOpen(false)}
      >
        <div className={classes.dialogStyle}>
        <DialogTitle>
          <h2 className="no-margin">Have you learnt a new skill?</h2>
        </DialogTitle>
        {Object.keys(skillList).map((x, idx)=>{return (
          <Accordion>
            <AccordionSummary><strong>{x}</strong></AccordionSummary>
            <AccordionDetails><Grid container spacing={2}>
              {skillList[x].map((skill, id)=>{return (
                <Grid item><Button variant="contained" className={classes.buttonStyle} onClick={()=>onSelectSkill()}>
                  {skill}
                </Button></Grid>
              );})}
            </Grid></AccordionDetails>
          </Accordion>
        );})}
        </div>
      </Dialog>

      <Dialog
        open={partnerChoiceOpen}
        onClose={()=>setPartnerChoiceOpen(false)}
        className={classes.partnerDialogStyle}
      >
        <div className={classes.dialogStyle}>
        <DialogTitle>
          <h3 className="no-margin">Let's find a new partner</h3>
        </DialogTitle>
        <Grid container direction="column" alignItems="center" spacing={3} className="pad-around">
          <Grid item><p className="no-margin"><i>Already know someone you want to be with?</i></p></Grid>
          <Grid item><TextField label="Friend's username" /></Grid>
          <Grid item>What skill do you want to learn?</Grid>
          <Grid item>{Object.keys(skillList).map((x, idx)=>{return (
            <Accordion expanded={pannelExpanded===x} onChange={onAccordianClick(x)}>
              <AccordionSummary><strong>{x}</strong></AccordionSummary>
              <AccordionDetails><Grid container spacing={2}>
                {skillList[x].map((skill, id)=>{return (
                  <Grid item><Button variant="contained" className={classes.buttonStyle} onClick={()=>setSkillToLearn(skill)}>
                    {skill}
                  </Button></Grid>
                );})}</Grid>
              </AccordionDetails>
            </Accordion>
          );})}</Grid>
          <Grid item><p>You want to learn: {skillToLearn===null ? <i>Choose a skill</i>: <b>{skillToLearn}</b>}</p></Grid>
          <Grid item><Button variant="contained" onClick={()=>getNewPartner()}>Find me a partner</Button></Grid>
        </Grid>
        </div>
      </Dialog>

      <Dialog
        open={confirmationOpen}
        onClose={()=>setConfirmationOpen(false)}
      >
        <div className={classes.dialogStyle}>
        <DialogTitle>
          <h3 className="no-margin">You have been paired with Geoff to learn writing and teach piano</h3>
          <br/>
          <Button variant="contained" onClick={()=>setConfirmationOpen(false)}>Close</Button>
        </DialogTitle>
        </div>
      </Dialog>
    </div>
  );
}

export default MySkills;
