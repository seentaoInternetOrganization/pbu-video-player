/**
 * @author Chenzhyc
 * @description CC视频播放器
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import appendQuery from 'append-query';

const ccPlayerHost = 'https://p.bokecc.com/player';
const playerType = '1';

function getSWF(swfID) {
    if (window.document[swfID]) {
        return window.document[swfID];
    } else if (navigator.appName.indexOf("Microsoft") == -1) {
        if (document.embeds && document.embeds[swfID]) {
            return document.embeds[swfID];
        }
    } else {
        return document.getElementById(swfID);
    }
}

class PBUVideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
        this.intervalTime = null;
    }

    loadScript() {
        //先删掉之前的视频播放器节点
        if (this.refs[`domRef_${this.state.vid}`].hasChildNodes()) {
            this.refs[`domRef_${this.state.vid}`].removeChild(this.refs[`domRef_${this.state.vid}`].childNodes[0]);
        }
        window.clearInterval(this.intervalTime);

        const videoSrc = appendQuery(ccPlayerHost, {
            vid: this.state.vid,
            siteid: this.state.siteId,
            autoStart: this.state.autoStart,
            width: this.state.width,
            height: this.state.height,
            playerid: this.state.playerid,
            playertype: playerType
        });

        const oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.async = true;
        oScript.src = videoSrc;
        this.refs[`domRef_${this.state.vid}`].appendChild(oScript);
    }

    componentDidMount() {
        this.loadScript();

        window.on_spark_player_stop = () => {
            console.log('on_spark_player_stop');
            window.clearInterval(this.intervalTime);
        }

        window.on_spark_player_pause = () => {
            console.log('on_spark_player_pause');
            window.clearInterval(this.intervalTime);
        }

        window.on_spark_player_resume = () => {
            console.log('on_spark_player_resume');
        }

        window.on_spark_player_ready = () => {
            console.log('on_spark_player_ready');
        }

        window.on_spark_player_start = () => {
            console.log('on_spark_player_start');

            const totalDuration = this.player.getDuration();
            //计时器的频率：如果视频整个时长小于等于2分钟：总时长的20%；如果大于2分钟：固定2分钟；
            let intervalTime = 0;

            if (totalDuration > 120) {
                intervalTime = 120000;
            }else {
                intervalTime = totalDuration * 0.2 * 1000;
            }

            this.intervalTime = setInterval(() => {
                this.props.onCountFrequency(this.player.getPosition());
            }, intervalTime);
        }

        window.on_player_seek = () => {
            console.log('on_player_seek');
        }

        window.on_cc_player_init = (vid, objectId) => {
            this.player = getSWF(objectId);
            const config = {
                on_player_stop: "on_spark_player_stop",
                on_player_pause: "on_spark_player_pause",
                on_player_resume: "on_spark_player_resume",
                on_player_ready: "on_spark_player_ready",
                on_player_start: "on_spark_player_start",
                on_player_seek:  "on_spark_player_seek"
            }

            this.player.setConfig(config);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }

    componentDidUpdate() {
        this.loadScript();
    }

    componentWillUnmount() {
		window.clearInterval(this.intervalTime);
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
     * siteId
     */
    siteId: PropTypes.string.isRequired,

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
    /**
     * 播放时按固定频率执行的回调
     * 计时器的频率：如果视频整个时长小于等于2分钟：总时长的20%；如果大于2分钟：固定2分钟；
     * @param currentPosition  当前播放的秒数
     */
    onCountFrequency: PropTypes.func,
}

PBUVideoPlayer.defaultProps = {
    vid: '',
    siteId: '',
    width: 600,
    height: 490,
    autoStart: false,
    playerid: '',
    onCountFrequency: (currentPosition) => {
        console.log('onCountFrequency ', currentPosition);
    }
}


export default PBUVideoPlayer;
