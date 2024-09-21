// App.jsx
import React from 'react';
import './App.css';
import Child1 from './child1';
import Child2 from './child2';
import Child3 from './child3';
import Child4 from './child4';
import ChildWithInput from './ChildWithInput';

function App() {
  return (
    <div>
      <h1>Testing useFetch Hook</h1>
      <Child1 />
      <Child2 />
      <Child3 />
      <Child4 />
      <ChildWithInput />
    </div>
  );
}

export default App;
