import React, {useState} from 'react'
import BackwardArrow from "@material-ui/icons/ArrowBackIosRounded";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Checkbox, ListItemText, ListItemIcon, TextField, Button, Typography } from "@material-ui/core";
import { data, theirData } from './data.js';
import GoalModal from './GoalModal';

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        left: props => props.show ? 0 : "-100vw",
        width: 300,
        height: "100%",
        top: 0,
        zIndex: 10,
        backgroundColor: "#eaf3f5"
    },
    heading: {
        backgroundColor: "white",
        position: 'relative',
    },
    headingText: {
        fontWeight: 700,
        fontSize: '2rem',
        display: "block",
        textAlign: 'center'
    },
    button: {
        position: 'absolute',
        right: 0,
        top: '5px',
    },
    completed: {
        color: "grey",
    },
    text: {
        width: '80%',
        display: "block",
        margin: '0 auto',
    },
    addButton: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20
    },
    easy: {
        backgroundColor: "#bdffc7"
    },
    medium: {
        backgroundColor: "#fdff8f"
    },
    hard: {
        backgroundColor: "#ffabab"
    }

})

let id = 4

const genId = () => {
    id += 1
    return id
}

const cashAdded = {
    "easy": 10,
    "medium": 30,
    "hard": 50
}

const Goal = (props) => {
    const {setCash, show, setShow} = props
    const classes = useStyles({show});
    const [checked, setChecked] = useState([false, false, false, false]);
    const [goals, setGoals] = useState(data)
    const [theirGoals, setTheirGoals] = useState(theirData)
    const [text, setText] = useState('')
    const [showModal, setShowModal] = useState(false);
    const toggleCheckbox = (index) => {
        setCash((prev) => prev + cashAdded[goals[index].difficulty])
        setChecked(checked.map((check, idx) => {
            if (index === idx) {
                return !check
            } else {
                return check
            }
        }))
    }

    const toggleButton = () => {
        setShow(!show)
    }

    const addGoal = (goal, difficulty) => {
        setTheirGoals([...theirGoals, {
            id: genId(),
            goal: goal,
            score: 30,
            difficulty
        }])
    }

    return (
        <div className={classes.container} >
            <div className={classes.heading} >
                <Typography className={classes.headingText} >
                    My Goals
                </Typography>
                <Button onClick={toggleButton} className={classes.button} >
                    <BackwardArrow />
                </Button>
            </div>
            <div className={classes.content}>
            <List className={classes.list} >
                {goals.map((goal, idx) => (
                    <ListItem 
                        key={goal.id} 
                        onClick={() => toggleCheckbox(idx)} 
                        button 
                        className={`${classes[goal.difficulty]} ${checked[idx] && classes.completed}`}
                        disabled={checked[idx]}
                    > 
                        <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={checked[idx]}
                            tabIndex={-1}
                        />
                        </ListItemIcon>
                        <ListItemText primary={goal.goal} />
                    </ListItem>
                ))}
            </List>    
            </div>
            <div className={classes.heading} >
                <Typography className={classes.headingText} >
                    Their Goals
                </Typography>
            </div>
            <div className={classes.content}>
            <List className={classes.list} >
                {theirGoals.map((goal, idx) => (
                    <ListItem 
                        key={goal.id} 
                        className={classes[goal.difficulty]}
                    > 
                        <ListItemIcon>
                        <Checkbox
                            disabled
                            edge="start"
                            tabIndex={-1}
                        />
                        </ListItemIcon>
                        <ListItemText primary={goal.goal} />
                    </ListItem>
                ))}
            </List>    
            </div>
            <Button 
                className={classes.addButton} 
                variant="contained" 
                color="primary" 
                onClick={() => setShowModal(true)}
            > 
                Add Goal!
            </Button>
            <div className={classes.modalContainer}>
                <GoalModal showModal={showModal}
                    setShowModal={setShowModal}
                    addGoal={addGoal}
                />
            </div>
        </div>
    )
};



export default Goal