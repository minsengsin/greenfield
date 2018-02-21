import React from 'react'
import ReactDOM from 'react-dom';

const Traits = function (props) {
    return (
        <div>
            <ul>
                <p> This task is scheduled for 
                    {/* {props.task.date} */}
                </p>
                
                <p> This task's location
                    {/* {props.task.location} */}
                </p>
            </ul>
        </div>
    )
}

export default Traits;