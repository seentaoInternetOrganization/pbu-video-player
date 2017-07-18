/**
 * @author Chenzhyc
 * @description CC视频播放器
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import appendQuery from 'append-query';

const ccPlayerHost = 'https://p.bokecc.com/player';
const siteId = '5396EEEC83FBF34A';
const playerType = '1';

class PBUVideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    loadScript() {
        //先删掉之前的视频播放器节点
        if (this.refs[`domRef_${this.state.vid}`].hasChildNodes()) {
            this.refs[`domRef_${this.state.vid}`].removeChild(this.refs[`domRef_${this.state.vid}`].childNodes[0]);
        }


        const videoSrc = appendQuery(ccPlayerHost, {
            vid: this.state.vid,
            siteid: siteId,
            autoStart: this.state.autoStart,
            width: this.state.width,
            height: this.state.height,
            playerid: this.state.playerid,
            playertype: playerType
        });

        const oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.src = videoSrc;
        this.refs[`domRef_${this.state.vid}`].appendChild(oScript);
    }

    componentDidMount() {
        this.loadScript();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }

    componentDidUpdate() {
        this.loadScript();
    }

    render() {
        return (
            <div ref={`domRef_${this.state.vid}`}>

            </div>
        )
    }
}

PBUVideoPlayer.propTypes = {
    /**
     * 视频唯一标识符
     */
    vid: PropTypes.string.isRequired,
    /**
     * 播放器宽度
     */
    width: PropTypes.number,
    /**
     * 播放器高度
     */
    height: PropTypes.number,
    /**
     * 是否自动播放，默认false
     */
    autoStart: PropTypes.bool,
    /**
     * 播放器id，
     */
    playerid: PropTypes.string,
}

PBUVideoPlayer.defaultProps = {
    vid: 'BB19C515E0F67DD19C33DC5901307461',
    width: 600,
    height: 490,
    autoStart: false,
    playerid: '87809E07FA32B8AA'
}


export default PBUVideoPlayer;
