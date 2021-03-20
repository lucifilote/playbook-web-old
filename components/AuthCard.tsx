import { Button, Divider, makeStyles, Tab, Tabs } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Image from 'next/image';
import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import TabPanel from '../components/TabPanel';
import firebase from '../config/firebase';

const useStyles = makeStyles({
    root: {
        marginTop: '12px'
    }
});

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
};


function AuthCard() {
    const [activeTab, setActiveTab] = useState(0);
    const classes = useStyles();

    const handleChange = (ev, value) => {
        setActiveTab(value);
    }

    return (
        <div className="py-16 max-w-sm mx-auto bg-white rounded-xl shadow-md items-center space-x-4 absolute top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4">
            <div className="flex flex-col">
                <Image className="" src="/images/logo.png" alt="Playbook Logo" width="210" height="95" objectFit="contain" />
                <div className="py-6">
                    <Tabs
                        className={"shadow-md px-4"}
                        value={activeTab}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered>
                        <Tab label="Intra in cont" />
                        <Tab label="Creeaza un cont" />
                    </Tabs>
                    <TabPanel value={activeTab} index={0}>
                        <div className="flex flex-col content-around px-6 pt-4">
                            <TextField
                                classes={classes}
                                fullWidth={true}
                                id="outlined-helperText"
                                label="Email"
                            />
                            <TextField
                                classes={classes}
                                fullWidth={true}
                                id="outlined-helperText"
                                label="Parola"
                                type="Parola"
                            />
                            <div className="mt-12">
                                <Button variant="contained" color="primary" fullWidth>Intra in cont</Button>
                            </div>
                        </div>
                        <div className="my-8 relative">
                            <Divider className="my-8" />
                            <span className="absolute z-10 px-4 top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4 bg-white text-gray-400">SAU</span>
                        </div>
                        <div>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                        </div>
                    </TabPanel>
                    <TabPanel value={activeTab} index={1}>
                        Item Two
            </TabPanel>
                </div>
            </div>
        </div>
    )
}

export default AuthCard;