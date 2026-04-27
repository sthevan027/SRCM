import './lib/seed'; // must be first — populates localStorage before stores initialize
import './index.css';
import { render } from 'solid-js/web';
import App from './App';

render(() => <App />, document.getElementById('app')!);
