import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {indexAction} from '../redux/actions/indexActions';

class Index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            textAreaValue: 'v',
        }
    }

    componentDidMount(){
        this.selectedPlace.contentWindow.document.querySelector('#selected-place').addEventListener('change', (event) => {
            console.log(this.selectedPlace.contentWindow.document.querySelector('#selected-place-data').getAttribute('data-selected'));
            this.setState({
                textAreaValue: this.selectedPlace.contentWindow.document.querySelector('#selected-place-data').dataset,
            });
        });

        window.addEventListener('load', () => {
            this.selectedPlace.contentWindow.postMessage({
                title: 'Тестовое сообщение',
                value: 5000
            }, '*');
        });

        this.props.indexRequest();
    }

    render () {
        // if(this.props.postList && this.props.postList.length) {
        //     return this.props.postList.map((item, i) => {
        //         return (
        //             <p key={i}>{item.header}</p>
        //         );
        //     })
        // }

        return ([
            <button onClick={() => {
                this.selectedPlace.contentWindow.postMessage({
                    title: 'Тестовое сообщение',
                    value: 5000
                }, '*');
            }}>click</button>,
            <iframe src="/login" ref={(selectedPlace) => (this.selectedPlace = selectedPlace)}></iframe>
        ]);
    }
}

function mapStateToProps(state) {
    return {
        postList: state.indexState && state.indexState.posts && state.indexState.posts.postList ? state.indexState.posts.postList : null
    }
}

function mapDispatchToProps(dispatch) {
    return {
        indexRequest: bindActionCreators(indexAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);