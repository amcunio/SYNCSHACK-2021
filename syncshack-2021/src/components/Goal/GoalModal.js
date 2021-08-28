import { Button, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel, TextField, Modal, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { addAbortSignal } from 'stream';
const useStyles = makeStyles({
    modalContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    modalOverlay: {
        width: '60vw',
        height: '60vh',
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        textAlign: 'center'
    },
    radioButtons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
});
const GoalModal = ({ setScore, showModal, setShowModal, addGoal }) => {
    const classes = useStyles();
    const [ radioVal, setRadioVal ] = useState("easy");
    const [ goal, setGoal ] = useState("");
    const handleRadioChange = (e) => {
        setRadioVal(e.target.value);
    } 
    const submitForm = () => {
        addGoal(goal, radioVal);
        console.log(goal, radioVal);
        setShowModal(false);
    }
    return (
        <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
        >
            <div className={classes.modalContainer} onClick={() => setShowModal(false)}>
                <div className={classes.modalOverlay} onClick={(e) => e.stopPropagation()}>
                    <h1> 
                        Assign Goal
                    </h1>
                    <form className={classes.form}>
                        <TextField
                            onChange={(e) => {setGoal(e.target.value); console.log(e.target.value)} }
                            multiline
                            label="Goal"
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Difficulty</FormLabel>
                            <RadioGroup aria-label="difficulty" value={radioVal} onChange={handleRadioChange}>
                                <div className={classes.radioButtons}>
                                    <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                    <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Button onClick={() => submitForm()} variant="contained" color="primary">
                                Set
                            </Button>
                        </FormControl>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default GoalModal
