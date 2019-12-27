import React ,{useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
const styles = {
    // circleBackground: {
    //     fill: 'none',
    // },
    // circleProgress: {
    //     fill: 'none',
    // },
    circleBackground: {
        fill: 'none',
        stroke: '#ddd',   
    },
    circleProgress: {
        fill: 'none',
        stroke: 'red',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
},
circleText: {
    fontSize: '3em',
    fontWeight: 'bold',
    fill: 'red',
  }
}
    
const useStyles = makeStyles(styles);

  
function Loader({sqSize,strokeWidth}) {
    const classes = useStyles();
    const [percentage,setPercentage]=useState(0)
    setTimeout(() => {
        
        percentage===100?setPercentage(0):setPercentage(percentage+1)
      }, 10);
    // Size of the enclosing square
    // const sqSize = this.props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * 3.14 * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100;
    return (
        <div>
             <svg
          width={sqSize}
          height={sqSize}
          viewBox={viewBox}
        >
          <circle
            className={classes.circleBackground}
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
             />
          <circle
            className={classes.circleProgress}
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }} 
            />
          <text
            className="circle-text"
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle">
            {`${percentage}%`}
          </text>
      </svg>
        </div>
    );
}

export default Loader;