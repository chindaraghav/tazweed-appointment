import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = (theme) => ({
  userButton: {
    height: 50,
    maxWidth: 220,
    textTransform: "none",
    borderRadius: 2,
    background: "#d3d3d3",
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2.5)}px`,
    fontSize: 16,
    fontWeight: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    "& span": {
      width: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  expandIcon: {
    fontSize: 16,
    marginLeft: theme.spacing(1),
  },
});

export default styles;
