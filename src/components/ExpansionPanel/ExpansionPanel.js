import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f9f9f9',
        padding: '15px',
        borderRadius: '1%',
        width:'100%',
        marginBottom:'0.5rem'
        // '&:focus': {
        //     backgroundColor: '#eeeeee',
        //     // border:'1px solid #eeeeee',
            
        //   }
    },
    expansionPanelSummary: {
        display: 'inline',
        fontSize: "14px",
        fontWeight: "200"
    },
    icon: {
        float: 'right',

        display: 'inline'
    },
    expansionPanelDetails: {
        marginTop: '20px',
        minHeight: '100px'
    }
   
})

function ExpansionPanel({orderstatus, createddate, ordernumber, children }) {

    const classes = useStyles()
    const [showContent, setShowContent] = useState(false)
    return (
        <div className={classes.root}>
            <Typography className={classes.expansionPanelSummary}>
                Order Number: {ordernumber} -{" "}
                <span>
                    {orderstatus === "Inactive" ? "Order Failed" : orderstatus} - {createddate}
                </span>
            </Typography>
            {showContent ?
                <ExpandLessIcon className={classes.icon} onClick={() => { setShowContent(!showContent) }} /> :
                <ExpandMoreIcon className={classes.icon} onClick={() => { setShowContent(!showContent) }} />}
            {showContent ? 
            <div className={classes.expansionPanelDetails}>
                {children}
            </div> : ""} 
        </div>
    );
}

export default React.memo(ExpansionPanel);