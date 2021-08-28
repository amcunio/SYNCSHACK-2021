import { Dialog, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { skillList } from '../const';
import '../assets/Dashboard.css';

const useStyles = makeStyles((theme) => ({
  
}));

function NewSkill(props) {
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
    >
      <DialogTitle>
        New Skill
      </DialogTitle>
    </Dialog>
  );
}

export default NewSkill;
