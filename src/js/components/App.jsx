import React    from 'react';
import { hot }  from 'react-hot-loader';
import './App.styl';

class App extends React.Component {

  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}

export default hot(module)(App)
