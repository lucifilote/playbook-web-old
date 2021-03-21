import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React from 'react';
import ClubCard from '../../components/ClubCard';
import MenuDrawer, { menuItems } from '../../components/MenuDrawer';
import { firebaseAdmin } from '../../config/firebaseAdmin';
import firebaseClient from '../../config/firebaseClient';
import { IClub } from '../../interfaces';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
    }),
);

function Users({ firebaseUser, playbookUser }) {
    const classes = useStyles();
    const router = useRouter();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {menuItems.find(menu => menu.to === router.asPath)?.label}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={null}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <MenuDrawer user={firebaseUser} />
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open>
                        <MenuDrawer user={firebaseUser} />
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {playbookUser.clubs.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                            {playbookUser.clubs.map((club: IClub, index: number) => (
                                <div className="" key={index}>
                                    <ClubCard
                                        key={index}
                                        title={club.name}
                                        imageUrl={club.photos[0]}
                                        location={club.location}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )
                }
                {playbookUser.clubs?.length === 0 && (
                    <div>
                        <h2>Nu ai niciun teren in administrare</h2>
                    </div>
                )}
            </main>
        </div>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

        const { uid, email } = token;

        const playbookUser = await firebaseClient.firestore().collection('users').doc(uid).get();

        // the user is authenticated!
        // FETCH STUFF HERE

        let clubsData = [];
        const whenClubsInfoFetched = playbookUser.data().clubs?.map(club => club.get());
        if (whenClubsInfoFetched && whenClubsInfoFetched.length > 0) {
            const clubsInfo: Array<firebase.firestore.DocumentSnapshot> = await Promise.all(whenClubsInfoFetched);
            clubsData = clubsInfo.map((el) => ({ ...el.data(), geolocation: el.data().geolocation.toJSON() }));
        }

        const firebaseUser = await firebaseAdmin.auth().getUserByEmail(email);
        const { clubs, ...rest } = playbookUser.data();
        let sanitizedFirebaseUser: any = getSanitizedFirebaseUser(firebaseUser);
        sanitizedFirebaseUser.email = email;


        return {
            props: { playbookUser: { ...rest, clubs: clubsData }, firebaseUser: sanitizedFirebaseUser },
        };
    } catch (err) {
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            // `as never` is required for correct type inference
            // by InferGetServerSidePropsType below
            props: {} as never,
        };
    }
};

const getSanitizedFirebaseUser = (firebaseUser) => {
    let sanitizedFirebaseUser = {
    };

    Object.keys(firebaseUser).map((key) => {
        if (key === 'photoURL' || key === 'displayName') {
            if (firebaseUser[key]) {
                sanitizedFirebaseUser[key] = firebaseUser[key]
            }
        }
    });

    return sanitizedFirebaseUser;
}
export default Users;