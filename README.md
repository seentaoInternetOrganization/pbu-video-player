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

```
