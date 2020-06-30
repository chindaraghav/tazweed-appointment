import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { ActivityLoader } from "../../components";

import { useApiService, useForm } from "../../hooks";
import { LoginService } from "../../utils/services";

import useStyles from './Login.styles'

function SignIn() {
  const { inputs, handleInputChange } = useForm();
  const { handleSave, state } = useApiService(inputs, LoginService);
  const classes = useStyles();
  const history = useHistory();
  const { isLoading, isSuccess, isError, error } = state;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    handleInputChange(name, value);
  };

  const handleFormSave = (evt) => {
    evt.preventDefault();
    handleSave();
  };
  useEffect(() => {
    isSuccess && history.replace("/home");
  }, [history, isSuccess]);

  const goToRegister = useCallback(
    (evt) => {
      evt.preventDefault();
      history.push("/signup");
    },
    [history]
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.center}>
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleFormSave}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign In
            </Button>
            {isError && (
              <Box width="100%" margin="10px 0" color="red">
                {error}
              </Box>
            )}
            <Grid container>
              <Grid item>
                <Link onClick={goToRegister} href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <ActivityLoader open={isLoading} />
    </Container>
  );
}

export default SignIn;