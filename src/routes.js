import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AccountConnect from '~/views/AccountConnect';
import AccountCreate from '~/views/AccountCreate';
import AccountImport from '~/views/AccountImport';
import Activities from '~/views/Activities';
import Dashboard from '~/views/Dashboard';
import NotFound from '~/views/NotFound';
import Profile from '~/views/Profile';
import Receive from '~/views/Receive';
import Send from '~/views/Send';
import Settings from '~/views/Settings';
import SettingsKeys from '~/views/SettingsKeys';
import SettingsKeysExport from '~/views/SettingsKeysExport';
import Trust from '~/views/Trust';
import Welcome from '~/views/Welcome';

const SessionContainer = ({ component: Component, isSessionRequired }) => {
  const { isReady, safe, wallet } = useSelector(state => {
    return {
      isReady: state.app.isReady,
      safe: state.safe,
      wallet: state.wallet,
    };
  });

  // Do not do anything yet when we are not ready
  if (!isReady) {
    return null;
  }

  const isValidSession = safe.address && wallet.address;

  if (
    (isSessionRequired && isValidSession) ||
    (!isSessionRequired && !isValidSession)
  ) {
    return <Component />;
  } else if (!isSessionRequired && isValidSession) {
    return <Redirect to="/" />;
  } else if (isSessionRequired && !isValidSession) {
    return <Redirect to="/welcome" />;
  }
};

const OnboardingRoute = ({ component, path }) => {
  return (
    <Route path={path}>
      <SessionContainer component={component} isSessionRequired={false} />
    </Route>
  );
};

const SessionRoute = ({ component, path }) => {
  return (
    <Route path={path}>
      <SessionContainer component={component} isSessionRequired={true} />
    </Route>
  );
};

const Routes = () => (
  <Switch>
    <SessionRoute component={Dashboard} exact path="/" />
    <SessionRoute component={Activities} path="/activities" />
    <SessionRoute component={Trust} path="/trust/:address?" />
    <SessionRoute component={Send} path="/send/:address?" />
    <SessionRoute component={Receive} path="/receive" />
    <SessionRoute component={Profile} path="/profile/:address" />
    <SessionRoute component={SettingsKeysExport} path="/settings/keys/export" />
    <SessionRoute component={SettingsKeys} path="/settings/keys" />
    <SessionRoute component={Settings} path="/settings" />
    <OnboardingRoute component={AccountCreate} path="/welcome/new" />
    <OnboardingRoute component={AccountConnect} path="/welcome/connect" />
    <OnboardingRoute component={AccountImport} path="/welcome/seed" />
    <OnboardingRoute component={Welcome} path="/welcome" />
    <Route component={NotFound} />
  </Switch>
);

OnboardingRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

SessionRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

export default Routes;
