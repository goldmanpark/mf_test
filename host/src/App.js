import React, { useState } from 'react';
import './App.css';
import GetTime from './components/GetTime.js';
import DynamicLoader from './components/DynamicLoader';

export default function App() {
  const mList = [
    {remote: 'remote1', module: 'csharp'},
    {remote: 'remote1', module: 'python'},
    {remote: 'remote2', module: 'test1'},
    {remote: 'remote2', module: 'test2'},
  ];

  const [currentModule, setCurrentModule] = useState('');

  return (
    <div className='host_main'>
      <header className='host_header'>
        {
          mList.map(x =>{
            return <button onClick={() => setCurrentModule(x)}>
              {x.remote + " : " + x.module}
            </button>
          })
        }
      </header>
      <section>
        <DynamicLoader currentModule={currentModule}/>
      </section>
      <footer className='host_footer'>
        <GetTime title={'HOST'}/>
      </footer>
    </div>
  );
}