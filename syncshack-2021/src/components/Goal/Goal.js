import React, {useState} from 'react'
import BackwardArrow from "@material-ui/icons/ArrowBackIosRounded";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Checkbox, ListItemText, ListItemIcon, TextField, Button, Typography } from "@material-ui/core";


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
    content: {

    },
    list: {

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
    }

})

let id = 4

const genId = () => {
    id += 1
    return id
}

const data = [
    {
        id: 1,
        goal: "Learn how to read guitar tabs",
        score: 5
    },
    {
        id: 2,
        goal: "Learn happy birthday tune",
        score: 10
    },
    {
        id: 3, 
        goal: "Learn Chords",
        score: 15
    },
    {
        id: 4,
        goal: "Learn Barre Chords",
        score: 20
    }
]

const Goal = (props) => {
    const {show, setShow} = props
    const classes = useStyles({show});
    const [checked, setChecked] = useState([false, false, false, false]);
    const [goals, setGoals] = useState(data)
    const [text, setText] = useState('')

    const toggleCheckbox = (index) => {
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

    const handleAdd = () => {
        setGoals([...goals, {
            id: genId(),
            goal: text,
            score: 30
        }])
        setChecked([...checked, false])
        setText('')
    }



    return (
        <div className={classes.container} >
            <div className={classes.heading} >
                <Typography className={classes.headingText} >
                    Goals!
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
                        className={checked[idx] && classes.completed}
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
            <TextField 
                placeholder="Enter Goal!"
                onChange={(e) => setText(e.target.value)} 
                value={text}
                className={classes.text} 
                fullWidth
            />
            <Button 
                className={classes.addButton} 
                variant="contained" 
                color="primary" 
                onClick={() => handleAdd()}
            > 
                Add Goal!
            </Button>
        </div>
    )
};



export default Goal