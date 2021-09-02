import * as React from 'react';
import { render } from 'react-dom';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import Main from './main';


initializeIcons(/* optional base url */);

render(<Main />, document.getElementById('root'));
