import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PBUVideoPlayer from './PBUVideoPlayer';

class TestComponent extends Component {

    state = {
        vids: [
            "BB19C515E0F67DD19C33DC5901307461",
            "1E8E8C90178318329C33DC5901307461"
        ],
        selectedVid: 0
    };

    render() {

        const onGetVerificationCode = (vid) => {
            return vid;
        }
        
        return (
            <div>
                <button type="primary" onClick={() => {
                    this.setState({
                        selectedVid: this.state.selectedVid == 0 ? 1 : 0
                    });
                }}>Switch
                </button>
                <PBUVideoPlayer vid={this.state.vids[this.state.selectedVid]}
                                siteId='5396EEEC83FBF34A'
                                width={600}
                                height={490}
                                playerid='F0A0C0ADC1025B99'
                                onGetVerificationCode={onGetVerificationCode}
                            />
            </div>
        )
    }
}

// Render
ReactDOM.render((<TestComponent />), document.getElementById('app'));
