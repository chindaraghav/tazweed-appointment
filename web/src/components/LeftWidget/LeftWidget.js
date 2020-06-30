import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AvailabilityFilter from '../AvailabilityFilter';
import useStyles from './LeftWidget.styles';
import { getText } from '../../utils/helpers';

export default function LeftWidget({ AvailabilityFilterProps, onCreateSlot, confirmedAppointments }) {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <AvailabilityFilter {...AvailabilityFilterProps} />
            <Box>
                <Box className={classes.confirmedTitle} >
                    {getText("labels.confirmed_appointments")}
                </Box>
                <Box className={classes.confirmedNumber} textAlign="center">
                    {confirmedAppointments}
                </Box>
            </Box>
            <Button onClick={onCreateSlot} className={classes.createSlot} variant="filled">Create Slot</Button>
        </Box>

    )
}
