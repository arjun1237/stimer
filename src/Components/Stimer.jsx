import React, {Component} from 'react'
import styles from './CSS/stimer.module.css'
import Timer from './Timer.jsx'
import Stopwatch from './Stopwatch.jsx'

export default class Stimer extends Component{

    constructor(props){
        super(props)

        this.state = {
            switch: true,
            sw: {h: 0, m: 0, s: 0, ms: 0},
            timer: {h: 0, m: 5, s: 0},
            timerStart: {h: 0, m: 5, s: 0},
            edit: false
        }
        this.swInterval = null
        this.timerInterval = null
        this.btnRef = React.createRef();
    }

    changeEdit = (edit) => {
        let {h, m, s} = this.state.timer
        if(m > 60) m=60
        if(s > 60) s=60
        let timer = {h, m, s}

        if(this.state.switch){
            this.stopTimer()
            this.btnRef.current.textContent = "START"
        }
        this.setState({edit, timer, timerStart: {...timer}})
    }

    changeSwitch = () => {
        this.setState(prevState => { return {switch: !prevState.switch}  })
    }

    handleClick = (e) => {
        let btn = e.target
        if(this.state.switch){
            let temp = this.state.timer
            if(temp.h === 0 && temp.m === 0 && temp.s === 0) return

            if(!this.timerInterval){
                btn.textContent = "STOP"
                this.startTimer()
            }
            else{
                btn.textContent = "START"
                this.stopTimer()
            }
        }
        else{
            if(!this.swInterval){
                btn.textContent = "STOP"
                this.startSW()
            }
            else{
                btn.textContent = "START"
                this.stopSW()
            }
        }
    }

    startTimer = () => {
        this.timerInterval = setInterval(() => {
            this.setState(prevState => {
                let {h, m, s} = prevState.timer
                if(s === 0){
                    s = 59
                    if(m === 0){
                        m = 59
                        h--
                    }
                    else m--
                }
                else s--
                let timer = {h, m, s}
                return {timer}
            })
        }, 1000);
    }
    
    stopTimer = () => {
        clearInterval(this.timerInterval)
        this.timerInterval = null
    }
    
    resetTimer = () => {
        this.stopTimer()
        this.setState(prevState => {
            let {timerStart, timer} = prevState
            timer = {...timerStart}
            return {timer}
        })
        this.btnRef.current.textContent = "START"
    }

    componentDidUpdate = (_, prevState) => {
        let {h, m, s}  = prevState.timer
        if(h === 0 && m === 0 && s === 1){
            this.stopTimer()
            this.btnRef.current.textContent = 'START'
        }
    }

    componentDidMount = () => {
        window.addEventListener('keyup', this.handleChange)
    }

    componentWillUnmount = () => {
        window.removeEventListener('keyup', this.handleChange)
    }

    startSW = (e) => {
        this.swInterval = setInterval(() => {
            this.setState(prevState => {
                let {h, m, s, ms} = prevState.sw
                if(ms === 99){
                    ms = 0
                    if(s === 59){
                        s = 0
                        if(m === 59){
                            m = 0
                            h++
                        }
                        else m++
                    }
                    else s++
                }
                else ms++
                let sw = {h, m, s, ms}
                return {sw}
            })
        }, 10);
    }

    resetSW = () => {
        this.stopSW()
        this.setState({
            sw: {h: 0, m: 0, s: 0, ms: 0}
        })
        this.btnRef.current.textContent = "START"
    }

    stopSW = () => {
        clearInterval(this.swInterval)
        this.swInterval = null
    }

    shouldComponentUpdate = (_, nextState) => {
        let {h} = nextState.sw
        if(h === 100) {
            this.resetSW()
            return false
        }
        return true
    }

    switchTimer = (e) => {
        let isTimer = e.target.textContent.trim() === 'TIMER'

        if( (isTimer && this.state.switch) || (!isTimer && !this.state.switch)) return

        if( (isTimer && this.timerInterval) || (!isTimer && this.swInterval) ) this.btnRef.current.textContent = 'STOP'
        else this.btnRef.current.textContent = 'START'

        this.setState({switch: isTimer})
    }

    timerReset = (timerStart) => {
        this.setState({
            timerStart,
            timer: {...this.timerReset}
        })
    }

    handleChange = (e) => {
        if(!this.state.edit || !this.state.switch) return
        let val = e.keyCode
        if(val === 8){
            let {h, m, s} = this.state.timer

            h = h < 10 ? '0' + h : h + ''
            m = m < 10 ? '0' + m : m + ''
            s = s < 10 ? '0' + s : s + ''

            s = Number(m[1] + s[0])
            m = Number(h[1] + m[0])
            h = Number(h[0])

            this.setState({
                timer: {h, m, s},
                timerStart: {h, m, s}
            })
        }
        else if(val >= 48 && val <= 57) {
            val = val-48
            let {h, m, s} = this.state.timer

            h = h < 10 ? '0' + h : h + ''
            m = m < 10 ? '0' + m : m + ''
            s = s < 10 ? '0' + s : s + ''

            h = Number(h[1] + m[0])
            m = Number(m[1] + s[0])
            s = Number(s[1] + val)

            this.setState({
                timer: {h, m, s},
                timerStart: {h, m, s}
            })
        }        
    }
    
    render(){
        return (
            <div className={styles.container}>
                <div>
                    <ul className={styles["list-style-none"]}>
                        <li onClick={this.switchTimer} className={this.state.switch ? styles['active-list'] : ''}>TIMER</li>
                        <li onClick={this.switchTimer} className={!this.state.switch ? styles['active-list'] : ''}>STOPWATCH</li>
                    </ul>
                </div>
                <div className={styles["time-container"]}>
                    {this.state.switch && <Timer time={this.state.timer} reset={this.timerReset} chEdit={this.changeEdit} edit={this.state.edit} />}
                    {!this.state.switch && <Stopwatch time={this.state.sw} />}
                </div>
                <div className={styles["btn-container"]}>
                    <button onClick={this.handleClick} ref={this.btnRef}>START</button>
                    <button onClick={this.state.switch ? this.resetTimer : this.resetSW}>RESET</button>
                </div>
            </div>
        )
    }
}