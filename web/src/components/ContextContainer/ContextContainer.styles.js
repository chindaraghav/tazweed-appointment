import makeStyles from "@material-ui/styles/makeStyles";

export default makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        margin: "21px 0px"
    },
    childrenContainer: {
        borderRight: "1px dashed #e0e0e0", padding: "0 21px"
    },
    contextContainer: {
        width: "35%", paddingLeft: "20px"
    },
    title: {
        fontSize: "15px",
        fontWeight: 600
    },
    description: {
        fontSize: "13px",
        marginTop: "12px"
    }
}));