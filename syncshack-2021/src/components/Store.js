import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  bg: {
    background: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    left:props => props.show ? 0 : '-100vw',
    top: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backdropFilter: 'blur(4px)',
    opacity: props => props.show ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  root: {
    opacity: props => props.show ? 1 : 0,
    position: 'absolute',
    top: '50%',
    left:props => props.show ? '50%' : '-100vw',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    background: 'white',
    borderRadius: '20px',
    transition: 'opacity 0.3s ease-in-out, left 0 ease 0.3s',
  },
}));

function Store({ show }) {
  const classes = useStyles({ show });

  return (
    <>
    <div className={classes.bg}></div>
    <div className={classes.root}>
    </div>
    </>
  )
}

export default Store
