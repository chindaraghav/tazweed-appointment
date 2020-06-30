import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { ActivityLoader } from "../../components";

import { useApiService, useForm } from "../../hooks";
import { RegisterService } from "../../utils/services";

import useStyles from './SignUp.styles'

function SignUp() {
  const classes = useStyles();
  const { inputs, handleInputChange } = useForm();
  const { handleSave, state } = useApiService(inputs, RegisterService);
  const { isLoading, isSuccess, isError, error } = state;
  const history = useHistory();
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

  const goToLogin = useCallback(
    (evt) => {
      evt.preventDefault();
      history.push("/login");
    },
    [history]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={classes.center}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleFormSave}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Full Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign Up
            </Button>
            {isError && (
              <Box width="100%" margin="10px 0" color="red">
                {error}
              </Box>
            )}
            <Grid container justify="flex-end">
              <Grid item>
                <Link onClick={goToLogin} href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
      <ActivityLoader open={isLoading} />
    </Container>
  );
}

export default SignUp;