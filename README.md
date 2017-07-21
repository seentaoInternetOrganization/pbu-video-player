# PBUVideoPlayer
> 封装了一下cc视频播放器
#### 安装
```js
npm i pbu-video-player --save
```

#### 使用
```js
import React from 'react';
import ReactDOM from 'react-dom';
import PBUVideoPlayer from 'pbu-video-player';

ReactDOM.render(<PBUVideoPlayer vid={'BB19C515E0F67DD19C33DC5901307461'}/>, mountedDom);
```

#### 参数接口说明
```js
PBUVideoPlayer.propTypes = {
  /**
     * siteId
     */
    siteId: PropTypes.string.isRequired;

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

```
