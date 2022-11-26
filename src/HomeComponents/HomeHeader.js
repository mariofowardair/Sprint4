import React, { useEffect, useState } from 'react';
import { AppBar, Collapse, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';

const closeTab = () => {
    window.open("about:blank", "_self");
    window.close();
};


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Roboto'
    },
    appbar: {
        background: 'none',
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto'
    },
    appbarTitle: {
        flexGrow: '1',
    },
    icon: {
        color: '#fff',
        fontSize: '4rem',
    },
    colorText: {
        color: '#B3A369'
    },
    container: {
        textAlign: 'center',
    },
    title: {
        color: '#fff',
        fontSize: '4rem'
    },
    goDown: {
        color: '#fff',
        fontSize: '4rem'
    }



}));

export default function HomeHeader() {
    const classes = useStyles();

    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    },[])

    return (
        <div className={classes.root}>

            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 className={classes.appbarTitle}>
                    <span className={classes.colorText}>Yellow</span> Coders.
                        </h1>
                    <IconButton>
                        <LoginIcon className={classes.icon} 
                            onClick={event =>  window.location.href='/account'}
                        />
                    </IconButton>
                    <IconButton>
                        <CloseIcon className={classes.icon} 
                            onClick={closeTab}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Collapse 
                in={checked} { ... (true ? { timeout: 1000} :{})} 
                collapsedHeight={50}
            >
                <div className={classes.container}>
                    <h1 className={classes.title}>
                        Welcome to <br /> 
                        <span className={classes.colorText}>Yellow</span> Coders' <br />
                        GT Event Organizer
                    </h1>

                </div>
            </Collapse>
        </div>
    );
}