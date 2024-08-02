import React from "react"
import DieFace from "./DieFace"
import "./DieFace.css"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    return (
        <div className="die-outer" style={styles} onClick={props.holdDice}>
            <DieFace value={props.value}/>
        </div>
    )
}