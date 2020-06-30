import React, { useRef } from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import makeStyles from '@material-ui/styles/makeStyles';

import { UserTokenUtil } from '../../utils/services'
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    logoContainer: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
    }
}))

function AppContainer({ children }) {
    const classes = useStyles();
    const userTokenUtil = useRef(new UserTokenUtil());
    const isLoggedIn = useSelector(state => state.app.isLoggedIn);
    return (
        <Box>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Box className={classes.logoContainer} style={{ flexGrow: 1 }}>
                        <img src="/logo.svg" style={{ height: "36px" }} alt="tazweed-logo" />
                    </Box>
                    {isLoggedIn && <IconButton onClick={userTokenUtil.current.logout}><ExitToApp /></IconButton>}
                </Toolbar>
            </AppBar>
            {children}
        </Box>
    )
}

export default AppContainer;