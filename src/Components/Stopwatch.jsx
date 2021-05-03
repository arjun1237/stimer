import React, {Component} from 'react'
import styles from './CSS/stimer.module.css'

export default class Stopwatch extends Component{

    calcTime(){
        let secs = this.props.secs
        if(secs < 10) return {ms1: 0, ms2: 0, }
    }

    render(){
        let {h, m, s, ms} = this.props.time
        h = h < 10 ? '0' + h : h + ''
        m = m < 10 ? '0' + m : m + ''
        s = s < 10 ? '0' + s : s + ''
        ms = ms < 10 ? '0' + ms : ms + ''
        return (
            <div className={styles.stopwatch}>
                {h !== '00' &&
                    <div>
                        {h[0] !== '0' && <span className={styles["big-text"]}>{h[0]}</span>}
                        <span className={styles["big-text"]}>{h[1]}</span>
                        <span>h</span>
                    </div>
                }
                {(m !== '00' || h !== '00') && 
                    <div>
                        { (m[0] !== '0' || h !== '00') && <span className={styles["big-text"]}>{m[0]}</span>}
                        <span className={styles["big-text"]}>{m[1]}</span>
                        <span>m</span>
                    </div>
                }
                <div>
                    { (s[0] !== '0' || h !== '00' || m !== '00') && <span className={styles["big-text"]}>{s[0]}</span>}
                    <span className={styles["big-text"]}>{s[1]}</span>
                    <span>s</span>
                </div>
                <div>
                    <span className={styles["mid-text"] + " " + styles["special-span"]}>{ms[0]}</span>
                    <span className={styles["mid-text"]} >{ms[1]}</span>
                </div>
            </div>
        )
    }
}