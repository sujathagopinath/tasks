import React from 'react';

import reactDom from 'react-dom';

// const data = React.createElement('h1', null, 'hello world');

// const data = <h1>Hello World</h1>
const App = () => {
    return <h1>Happy learning</h1>
}
// reactDom.render(data, document.getElementById('name'));
reactDom.render(<App />, document.getElementById('name'));




