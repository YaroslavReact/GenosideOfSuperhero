import React from "react";
import { connect } from "react-redux";
import halk from "../images/halk.png";
import batman from "../images/batman.png";
import deadpool from "../images/deadpool.png";
import cap from "../images/cap.png";
import natasha from "../images/natasha.png";
import rosya from "../images/rosya.png";
import spidy from "../images/spidy.png";
import toni from "../images/toni.png";
import tor from "../images/tor.png";

function EnemyFields(props) {
    const { isThereAHeroHere } = props;
    const supetHero = [halk, batman, deadpool, cap, natasha, rosya, spidy, toni, tor];
    
    return (
        <div className="enemyFields">
           <div className="enemy" onClick={isThereAHeroHere} ><img className="hide" src={supetHero[props.hero]} alt="hero"/></div>
           <div className="enemy" onClick={isThereAHeroHere} ><img className="hide" src={supetHero[props.hero]} alt="hero"/></div>
           <div className="enemy" onClick={isThereAHeroHere} ><img className="hide" src={supetHero[props.hero]} alt="hero"/></div>
           <div className="enemy" onClick={isThereAHeroHere} ><img className="hide" src={supetHero[props.hero]} alt="hero"/></div>
           <div className="enemy" onClick={isThereAHeroHere} ><img className="hide" src={supetHero[props.hero]} alt="hero"/></div>
           <div className="enemy" onClick={isThereAHeroHere} ><img className="hide" src={supetHero[props.hero]} alt="hero"/></div>
        </div>
      );
}

const mapStateToProps = state => ({
    isMoles: state.mainState.moles,
    hero: state.mainState.superhero
  });
  
export default connect(mapStateToProps)(EnemyFields);