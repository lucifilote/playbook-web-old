import { IconButton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import firebase from 'firebase';
import React from 'react';
import { ILocation } from '../interfaces';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    cardContent: {
        backgroundImage: (props: PassedProps) => `url(${props.imageUrl})`,
        backgroundSize: 'cover',
        minHeight: 200
    },
}
);

type PassedProps = {
    title: string;
    imageUrl: string;
    firebaseRef: firebase.firestore.DocumentReference;
    location: ILocation;
};

function ClubCard(props: PassedProps) {
    const classes = useStyles(props);

    const getAddress = () => {
        const { location } = props;
        return `${location.street} ${location.info ? `(${location.info})` : ''} ${location.city}, ${location.county}`;
    }
    return (
        <Card className={classes.root}>
            <CardContent classes={{ root: classes.cardContent }}>
            </CardContent>
            <CardActions >
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <div className="font-bold color-primary text-sm">
                            {props.title}
                        </div>
                        <div className="text-xs">
                            {getAddress()}
                        </div>
                    </div>
                    <div>
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </div>
            </CardActions>
        </Card>
    );
}

export default ClubCard;