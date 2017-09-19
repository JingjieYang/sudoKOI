import React from 'react';
import ReactDOM from 'react-dom';
import SodukuApp from "./soduku-interface";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SodukuApp/>, document.getElementById('root'));
registerServiceWorker();
