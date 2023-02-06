import React from 'react';
import CSharp from './csharp.tsx';
import Python from './python.tsx';

export default function MixTest()
{
	return(	
    <React.Fragment>
		  <CSharp/>
      <br/>
      <Python/>
    </React.Fragment>
	);
}