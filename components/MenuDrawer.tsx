import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { PersonRounded, PowerSettingsNewOutlined, Settings, TextsmsOutlined } from "@material-ui/icons";
import GridOnOutlined from '@material-ui/icons/GridOnOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from "react";
import firebase from '../config/firebaseClient';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        listItemRoot: {
            color: theme.palette.primary.main
        }
    }),
);

export const menuItems = [
    { label: 'Terenuri', to: '/user', icon: <><GridOnOutlined /></> },
    { label: 'Profilul meu', to: '/user/profile', icon: <><PersonRounded /></> },
    { label: 'Setari', to: '/user/settings', icon: <><Settings /></> },
    { label: 'Termeni & Conditii / Confidentialitate', to: '/user/terms-and-conditions', icon: <><TextsmsOutlined /></> },
];


function MenuDrawer({ user }) {
    const classes = useStyles();
    const router = useRouter();
    
    const handleLogout = async () => {
        await firebase.auth()
            .signOut()
        router.push('/')
    }

    return (
        <div>
            <div className="p-4 flex flex-col">
                <div className="py-2">
                    <Avatar alt="Profile picture" src={user.photoURL} className={classes.large} />
                </div>
                {user.displayName && <div className="text-dark-blue text-2xl font-bold">{user.displayName}</div>}
                {user.email && <div className="text-dark-blue text-md font-bold">{user.email}</div>}
            </div>
            <Divider />
            <List>
                {menuItems.map((menu, index) => (
                    <Link href={menu.to} key={index}>
                        <a className="text-dark-blue font-bold no-underline	">
                            <ListItem button key={index} selected={menu.to === router.asPath} >
                                <ListItemIcon classes={{ root: classes.listItemRoot }}>{menu.icon}</ListItemIcon>
                                <ListItemText primary={menu.label} classes={{ primary: classes.listItemRoot }} />
                            </ListItem>
                        </a>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={handleLogout} className="text-dark-blue" classes={{ root: classes.listItemRoot }}>
                    <ListItemIcon classes={{ root: classes.listItemRoot }}><PowerSettingsNewOutlined /></ListItemIcon>
                    <ListItemText classes={{ primary: classes.listItemRoot }} color="primary" primary={"Deconecteaza-ma"} />
                </ListItem>
            </List>
        </div>
    )
}

export default MenuDrawer;