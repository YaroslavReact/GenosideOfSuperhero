import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/gameZoneStore/actions";

function EndGame({ endGame, yourFailed, gameScore, startGame, startingScreen, outcome }) {
    function reset(){
      yourFailed(0);
      gameScore(0);
      startingScreen();
      endGame();
      setTimeout( startGame, 1500); 
    }
    return (
        <div className="EndGame">
          { !outcome && <p className="shamefulNotice">You Lose! How dare you lose? Try again!</p>}
          { outcome && <p className="victoryNotification">You you killed all the heroes, congratulations!</p>}
           <button onClick={reset}>Play Again</button> 
        </div>
      );
}

const mapStateToProps = state => ({
    outcome: state.mainState.outcome,
    });
  const mapDispatchToProps = dispatch => {
    const { startingScreen, endGame, yourFailed, gameScore } = actions;
      return {
        startingScreen: () => dispatch(startingScreen()),
        endGame: () => dispatch(endGame()),
        yourFailed: (chance) => dispatch(yourFailed(chance)),
        gameScore: (score) => dispatch(gameScore(score)),
      };
    };  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
     )(EndGame);