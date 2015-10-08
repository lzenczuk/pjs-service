import React from 'react';
import attachFastClick from 'fastclick';

import App from './component/app';

attachFastClick(document.body);

React.render(<App />, document.getElementById("app"));

