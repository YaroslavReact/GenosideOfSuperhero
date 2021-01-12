import React from "react";
import { connect } from "react-redux";

function PointsZone(props) {
    const { lvl, score, chance, baseTime } = props;
    
    return (
        <div className="pointsZone">
            <h1>Status Bar</h1>
            <div className="statusBar">
                <p>Game difficult: {lvl}</p>
                <p>Score: {score} / 100 point(s)</p>
                <p>You failed: {chance} time(s)</p>
            {props.baseTime === 0 ? "Time over" : <p>Time: {baseTime} ms</p>}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    baseTime: state.mainState.baseTime,
    chance: state.mainState.chance,
    score: state.mainState.score,
    lvl: state.mainState.lvl,
  });

export default connect(mapStateToProps)(PointsZone);