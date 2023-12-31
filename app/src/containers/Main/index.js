import React, {Component} from 'react';
import styles from './Main.module.css';
import Login from '../../screens/Login'
import Dashboard from '../../screens/Dashboard'
import Suppliers from '../../screens/Suppliers'

import ScreenContent from '../ScreenContent'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import { Route, Redirect, Switch } from 'react-router-dom';

export class Main extends Component {
  render(){
    const {users, location, _persist} = this.props
    if (!users) return null
    if (!location) return null
    if (
        (
          !users.authenticatedUserId || 
          !users.authenticatedUserIsAuthorized
        ) 
    && _persist.rehydrated) {
      return <Redirect to="/login" />;
    }
    if (!_persist.rehydrated) return null
    return (
      <div className={styles.container}>
          <ScreenContent currentScreenPathname={location.pathname}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/suppliers" component={Suppliers} />
            </Switch>
          </ScreenContent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  _persist: state._persist
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);