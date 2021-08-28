import styles from './Chat.module.css'
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    closeIcon: {
        position: 'absolute',
        top: '5px',
        right: '5px'
    }
})
const Chat = ({ open, setOpen }) => {
    const classes = useStyles()
    return <div className={styles.container} style={{ display: open }}>
        <CancelIcon className={classes.closeIcon} onClick={() => setOpen("None")}/>
    </div>
}

export default Chat