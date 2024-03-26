/**
 * @format
 */

// Add this line to your `index.js`
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithStore);
