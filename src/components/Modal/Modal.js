import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
    modalWrapper: {
        background: 'white',
        border: '1px solid #d0cccc',
        boxShadow: '0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17)',
        margin: '100px auto 0',
        // transition: 'all .8s',
        // width: '60%',
        height:'auto',
        position:'fixed',
        // transform: 'translateY(0vh)' ,
        // opacity: '0.7',
       
    },
    
    modalHeader: {
        background: '#ffffff',
        height: 'auto',
        lineHeight: '40px',
        padding: '5px 20px',
        // textAlign: 'right',
    },
    
   
    modalBody: {
        padding: '10px 15px',
        textAlign: 'center',
    },
    
    modalFooter: {
        background: '#ffffff',
        height: 'auto',
        padding: '15px',
    }

    // modal: {
    //     /* modal container fixed across whole screen */
    //     position: 'fixed',
    //     top: 0,
    //     right: 0,
    //     bottom: 0,
    //     left: 0,
    
    //     /* z-index must be higher than .modal-background */
    //     zIndex: 1000,
        
    //     /* enables scrolling for tall modals */
    //     overflow: 'auto',
    
        
    // },
    // modalBody: {
    //     padding: '20px',
    //     background: '#fff',

    //     /* margin exposes part of the modal background */
    //     margin: '40px',
    // },
    // modalBackground :{
    //     /* modal background fixed across whole screen */
    //     position: 'fixed',
    //     top: 0,
    //     right: 0,
    //     bottom: 0,
    //     left: 0,
    
    //     /* semi-transparent black  */
    //     backgroundColor: '#000',
    //     opacity: 0.75,
        
    //     /* z-index must be below .modal and above everything else  */
    //     zIndex: 900,
    // }
    
    // bodymodal-open {
    //     /* body overflow is hidden to hide main scrollbar when modal window is open */
    //     overflow: hidden;
    // }
    
})
function Modal({orderstatus,createddate, ordernumber,children}) {
    const classes = useStyles()
    const isMobile = useMediaQuery('(max-width:425px)')
    const [showModal,setShowModal]=useState(false)
    return (
        <div style={{top:0,right:0,bottom:0,left:0,position:'absolute',filter: 'blur(1px) saturate(0.2)'}}>
            {/* style={showModal?{filter: 'blur(1px) saturate(0.2)',opacity: '0.7'}:{filter: 'blur(0) saturate(1)',opacity: 1}} */}
            <button onClick={()=>{setShowModal(!showModal)}}>Open</button>
         
            {showModal?
        //     <div>
        //     <div className="modal">
        //     <div className="modalBody">
        //         {children}
        //         <button onClick={()=>{setShowModal(!showModal)}}>CLOSE</button>
        //     </div>
        // </div>
        // <div className="modalBackground"></div>
        
        <div className={classes.modalWrapper} style={isMobile?{width:'100%',top:0,left:0,right:0,bottom:0}:{width:'60%',zIndex:1,opacity:1}}>
                <div className={classes.modalHeader}>
                <Typography className={classes.expansionPanelSummary}>
                Order Number: {ordernumber} -{" "}
                <span>
                    {orderstatus === "Inactive" ? "Order Failed" : orderstatus} - {createddate}
                </span>
            </Typography>
                </div>
                <div className={classes.modalBody}>
                    {children}
                </div>
                <div className={classes.modalFooter}>
                    <button onClick={()=>{setShowModal(!showModal)}}>CLOSE</button>
                </div> 
            </div> 
        // </div>
        :""} 
            
            </div>
        
    );
}

export default Modal;