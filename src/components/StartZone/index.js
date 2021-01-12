import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/gameZoneStore/actions";

function StartZone(props) {
    function Start(){
      props.startingScreen();
      setTimeout( props.startGame, 1500); 
    }

    return (
        <div className="startGame">
          <p className="welcomeText">Hi rookie, your task is to destroy all superheroes! Can you handle it?</p>
          <button onClick={Start}>Press Start!</button>
        </div>
      );
}

const mapStateToProps = state => ({
   startingScreen: state.mainState.startingScreen,
  });

const mapDispatchToProps = dispatch => {
  const { startingScreen } = actions;
    return {
      startingScreen: () => dispatch(startingScreen()),
    };
  };  
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
   )(StartZone);