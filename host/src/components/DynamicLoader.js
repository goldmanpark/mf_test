import React, { useState, useEffect, Suspense } from 'react';
import {ErrorBoundary} from './ErrorBoundary.js';

const DynamicLoader = (props) => {
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(props.currentModule.remote + '/' + props.currentModule.module);
  }, [props]);

  const lazyParam = () => {
    console.log(`${path}`);
    return React.lazy(() => import(`${path}`))
    // React.lazy(() => import('remote1/python'));
    //
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<span>Loading...</span>}>
        { 
          props.currentModule ? lazyParam() : <span>NOTHING SELECTED</span>
        }
      </Suspense>
    </ErrorBoundary>
  )
}

export default DynamicLoader;