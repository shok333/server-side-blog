import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {indexAction} from '../redux/actions/indexActions';

class Index extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount(){
        this.props.indexRequest();
    }

    render () {
        if(this.props.postList && this.props.postList.length) {
           return this.props.postList.map((item, i) => {
               return (
                   <p key={i}>{item.header}</p>
               );
           })
        }

        return null;
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