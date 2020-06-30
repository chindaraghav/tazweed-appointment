import makeStyles from '@material-ui/styles/makeStyles'

export default makeStyles((theme) => ({
    root: {
        width: "100%",
        minHeight: "150px",
        // border: "1px solid #d3d3d3",
        margin: "8px 0",
        display: "flex",
        alignItems: "center"
    },
    profileImage: {
        height: "92px",
        width: "92px",
        borderRadius: "60px",
        marginLeft: "20px"
    },
    button: {
        height: 32,
        width: 32
    },
    fieldContainer: {
        margin: "3px 8px"
    },
    field: {
        fontSize: "13px",
        fontWeight: "600"
    },
    value: {
        fontSize: "15px",
        fontWeight: "500"
    }
}));