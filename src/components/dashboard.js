import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import IdleTimer from 'react-idle-timer';
import {clearAuth} from '../actions/auth';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    logOut(){
        this.props.dispatch(clearAuth());
    }

    areYouThere() {
        return(
            <div className="form-error" aria-live="polite">
                <p>Are you still there?!?!?!</p>
            </div>
        )    
    }    
    render() {


        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <IdleTimer
                    timeout={100 * 60 * 1}
                    onIdle={() => {
                        console.log('Alert triggered')
                        return (
                            <h1>This is a proper header</h1>
                        )
                        }}/>
                <IdleTimer
                    timeout={200 * 60 * 1}
                    onIdle={() => {
                        console.log('logging out')
                        this.logOut()} }
                    stopOnIdle={false} />
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
