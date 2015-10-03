import React from 'react';
import attachFastClick from 'fastclick';
import MainView from './component/view/main-view';

attachFastClick(document.body);

React.render(<MainView />, document.getElementById('app'));
