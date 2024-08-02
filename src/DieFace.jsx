import React from "react"
import "./DieFace.css"

export default function DieFace({ value }) {
    const dotPatterns = {
        1: [4], //Dots for value 1
        2: [1, 7], //Dots for value 2
        3: [1, 4, 7], //Dots for value 3
        4: [1, 3, 5, 7], //Dots for value 4
        5: [1, 3, 4, 5, 7], //Dots for value 5
        6: [1, 3, 5, 7, 8, 9] //Dots for value 6
    }

    const dots=dotPatterns[value]

    const renderDots = (dots) => {
        return dots.map((dot, index) => (
            <div key={index} className={`dot dot-${dot}`}></div>
        ))
    }

    return (
        <div className="die-face">
            {renderDots(dotPatterns[value])}
        </div>
    )
}