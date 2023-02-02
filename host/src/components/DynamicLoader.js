import React, { useState, useEffect, Suspense } from 'react';

const DynamicLoader = (props) => {
  const [path, setPath] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(props && props.currentModule){
      setPath(props.currentModule.remote + '/' + props.currentModule.module);
    } else {
      setPath('');
    }
  }, [props]);

  useEffect(() => {
    console.log(path ? 'no selected' : path);
  }, [path]);

  const drawModule = () => {
    try {
      if(path){
        return React.lazy(async () => await import(`${path}`));
      } else {
        return <span>NOTHING SELECTED</span>
      }      
    } catch (err) {
      console.log(err);
      setError(err);
    }    
  }

  return (
    <Suspense fallback={<span>Loading...</span>}>
      { error }
      { drawModule }
    </Suspense>
  )
}

export default DynamicLoader;