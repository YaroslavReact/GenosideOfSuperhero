import React from "react";
import { connect } from "react-redux";
import halk from "../../assets/images/halk.png";
import batman from "../../assets/images/batman.png";
import deadpool from "../../assets/images/deadpool.png";
import cap from "../../assets/images/cap.png";
import natasha from "../../assets/images/natasha.png";
import rosya from "../../assets/images/rosya.png";
import spidy from "../../assets/images/spidy.png";
import toni from "../../assets/images/toni.png";
import tor from "../../assets/images/tor.png";

function EnemyFields(props) {
    const { hideEnemy,enemies } = props;
    const supetHero = [halk, batman, deadpool, cap, natasha, rosya, spidy, toni, tor];
     
    return (
        <div className="enemyFields">
            {enemies.map(enemy => (
              <div key = {enemy.id} className={enemy.isSuccessfulKill ? "enemy win": "enemy"} onClick={() => hideEnemy(enemy.id)}>
                <img className={enemy.isHeroShowing ? "show" : "hide"} src={supetHero[props.hero]} alt="hero"/>
              </div>
            ))}
        </div>
      );
}

const mapStateToProps = state => ({
    hero: state.mainState.superhero,
    enemies: state.mainState.enemies,
  });
  
export default connect(mapStateToProps)(EnemyFields);