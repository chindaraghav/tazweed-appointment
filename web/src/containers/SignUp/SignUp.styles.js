import makeStyles from "@material-ui/styles/makeStyles";

export default makeStyles((theme) => ({
    center: {
      display: "flex",
      flexDirection: "row",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: theme.spacing(19),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));