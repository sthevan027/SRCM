import './index.css';
import { render } from 'solid-js/web';
import App from './App';
import { seedIfNeeded } from './lib/seed';

seedIfNeeded();

render(() => <App />, document.getElementById('app')!);
