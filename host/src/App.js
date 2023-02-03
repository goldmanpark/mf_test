import React, { useState, Suspense } from 'react';
import './App.css';
import GetTime from './components/GetTime.js';

const mList = [
  'remote1/csharp',
  'remote1/python',
  'remote2/test1',
  'remote2/test2'
];

const mDic = {
  'remote1/csharp' : React.lazy(() => import('remote1/csharp')),
  'remote1/python': React.lazy(() => import('remote1/python')),
  'remote2/test1': React.lazy(() => import('remote2/test1')),
  'remote2/test2': React.lazy(() => import('remote2/test2'))
}

export default function App() {  
  const [selectedKey, setSelectedKey] = useState('');

  const renderComponent = () => {
    if(selectedKey){
      const DynamicLoader = mDic[selectedKey];
      return <DynamicLoader/>
    } else {
      return <span>NOTHING SELECTED</span>
    }    
  }

  return (
    <div className='host_main'>
      <header className='host_header'>
        {
          mList.map(x =>{
            return <button onClick={() => setSelectedKey(x)}>
              { x }
            </button>
          })
        }
      </header>
      <section>
        <Suspense fallback={<span>Loading...</span>}>
          { renderComponent() }
        </Suspense>        
      </section>
      <footer className='host_footer'>
        <GetTime title={'HOST'}/>
      </footer>
    </div>
  );
}