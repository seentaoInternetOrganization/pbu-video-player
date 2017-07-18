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
        return (
            <div>
                <button type="primary" onClick={() => {
                    this.setState({
                        selectedVid: this.state.selectedVid == 0 ? 1 : 0
                    });
                }}>Switch
                </button>
                <PBUVideoPlayer vid={this.state.vids[this.state.selectedVid]} />
            </div>
        )
    }
}

// Render
ReactDOM.render((<TestComponent />), document.getElementById('app'));
