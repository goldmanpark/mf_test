import React, { Suspense } from 'react';

export default function Test2(){
  const Time = React.lazy(() => import('host/getTime'));
  
  return (
    <React.Fragment>
      <span>test2 : HELLO WORLD</span>
      <br/>
      <Suspense fallback={<span>Loading host module...</span>}>
				<Time title={'THIS IS TEST2'}/>
			</Suspense>
    </React.Fragment>
  );  
}