import React, { useCallback } from 'react'
import { Box, Paper, IconButton } from "@material-ui/core";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";

import { getDateRangeText, getText } from "../../utils/helpers";
import useStyles from "./AppointmentCard.styles";

const PLACEHOLDER_IMAGE = "https://loremflickr.com/320/240";

function FieldValue({ field, value, containerClass, fieldClass, valueClass }) {
    return (
        <Box className={containerClass}>
            <span className={fieldClass}>{field.toUpperCase()} : </span>
            <span className={valueClass}>{value}</span>
        </Box>
    )
}

export default function AppointmentCard({ user, slotInfo, accept, reject, appoinementId }) {
    const classes = useStyles();
    const { name, email } = user;
    const { fromTime, toTime } = slotInfo;
    const fieldProps = {
        containerClass: classes.fieldContainer,
        fieldClass: classes.field,
        valueClass: classes.value,
    };
    const onAccept = useCallback(
        () => {
            accept(appoinementId)
        },
        [accept],
    )
    const onReject = useCallback(
        () => {
            reject(appoinementId)
        },
        [accept],
    )
    return (
        <Paper className={classes.root}>
            <Box>
                <img className={classes.profileImage} src={PLACEHOLDER_IMAGE} alt="profile_image" />
            </Box>
            <Box display="flex" width="100%" justifyContent="space-between" alignItems="center" padding="20px">
                <Box display="flex" flexDirection="column">
                    <FieldValue
                        {...fieldProps}
                        field={getText("labels.name")}
                        value={name} />
                    <FieldValue
                        {...fieldProps}
                        field={getText("labels.email")}
                        value={email} />
                    <FieldValue
                        {...fieldProps}
                        field={getText("labels.timings")}
                        value={getDateRangeText(fromTime, toTime)} />
                </Box>
                <Box>
                    <IconButton onClick={onAccept}>
                        <CheckCircle className={classes.button} style={{ color: "#2196f3" }} />
                    </IconButton>
                    <IconButton onClick={onReject}>
                        <Cancel className={classes.button} style={{ color: "#e53935" }} />
                    </IconButton>
                </Box>

            </Box>
        </Paper>
    )
}
