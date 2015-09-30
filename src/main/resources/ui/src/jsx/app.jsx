import React from 'react';
import attachFastClick from 'fastclick';
import PhsApp from './phs-app';

attachFastClick(document.body);

React.render(<PhsApp />, document.getElementById('app'));
