import React, {Component} from 'react'
import styles from './CSS/stimer.module.css'

export default class Timer extends Component{
    constructor(props){
        super(props)

        this.editRef = React.createRef();
        this.editVal = {h: 0, m: 0, s: 0}
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.clickOut);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.clickOut);
    }

    clickOut = (e) => {
        if (this.editRef && !this.editRef.current.contains(e.target)) {
            if(this.props.edit) {
                this.props.chEdit(false)
            }
        }
    }

    render(){
        const {time, chEdit, edit} = this.props
        let style1 = styles["big-text"]
        let style2 = edit ? style1 + " " + styles["text-mute"] : style1
        let {h, m, s} = time
        h = h < 10 ? '0' + h : h + ''
        m = m < 10 ? '0' + m : m + ''
        s = s < 10 ? '0' + s : s + ''
        return (
            <div className={styles.stopwatch + (edit ? " " + styles["edit-mode"] : "")} onClick={() => {chEdit(true)}} ref={this.editRef}>
                {(h !== '00' || edit) &&
                    <div>
                        {(h[0] !== '0' || edit) && <span className={ (Number(h[0]) === 0) ? style2 : style1}>{h[0]}</span>}
                        <span className={ (Number(h) === 0) ? style2 : style1}>{h[1]}</span>
                        <span>h</span>
                    </div>
                }
                {(m !== '00' || h !== '00' || edit) && 
                    <div>
                        { (m[0] !== '0' || h !== '00' || edit) && <span className={ (Number(m[0]) === 0 && Number(h) === 0) ? style2 : style1}>{m[0]}</span>}
                        <span className={ (Number(m) === 0 && Number(h) === 0) ? style2 : style1}>{m[1]}</span>
                        <span>m</span>
                    </div>
                }
                <div>
                    { (s[0] !== '0' || h !== '00' || m !== '00' || edit) && !this.edit && <span className={ (Number(s[0]) === 0 && Number(m) === 0 && Number(h) === 0) ? style2 : style1}>{s[0]}</span>}
                    <span className={ ( (Number(s) === 0 && Number(m) === 0 && Number(h) === 0) ? style2 : style1 ) + (edit ? " " + styles["edit-mode-2"] : "") }>{s[1]}</span>
                    <span>s</span>
                </div>
            </div>
        )
    }
}