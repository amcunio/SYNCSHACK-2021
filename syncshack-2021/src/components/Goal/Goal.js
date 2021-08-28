import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: {
        width: 200,
        position: 'relative'
    }
})
const Goal = () => {
    const classes = useStyles();
    return <div className={classes.container}>goal lists</div>;
};

export default Goal