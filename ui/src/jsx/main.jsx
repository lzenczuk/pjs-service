import React from 'react';
import ReactDOM from 'react-dom';
import attachFastClick from 'fastclick';

import App from './component/app';

attachFastClick(document.body);

ReactDOM.render(<App />, document.getElementById("app"));

