import React from 'react';
import { BackTop } from 'antd';
import RouterPages from 'pages';
import classNames from 'classnames';
import WithTheme from 'shared/ui/WithTheme';
import withProviders from './providers/index';
import './index.scss';
import 'antd/dist/antd.css';

const App = () => (
  <div className={classNames('app')}>
    <WithTheme>
      <BackTop />
      <RouterPages />
    </WithTheme>
  </div>
);

export default withProviders(App);
