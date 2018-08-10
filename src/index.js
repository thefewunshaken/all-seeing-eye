import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';

// 6min38sec in video
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
