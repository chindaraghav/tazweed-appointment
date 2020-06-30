import makeStyles from '@material-ui/styles/makeStyles'

export default makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up("md")]: {
            position: "fixed"
        },
        [theme.breakpoints.down("sm")]: {
            position: "relative"
        }
    },
    confirmedTitle: {
        fontSize: "16px",
        marginTop: "20px",
        color: "rgba(0, 0, 0, 0.54)"
    },
    confirmedNumber: {
        fontSize: "102px",
        textAlign: "center"
    },
    createSlot: {
        backgroundColor: '#2196f3',
        color: 'white',
        width: '100%',
        fontWeight: 600
    }
}));