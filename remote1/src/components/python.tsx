import React, { Suspense } from 'react';

export default function Python(): JSX.Element
{
	//path 관련 에러(ts2307)가 있으나 host의 자바스크립트 모듈 가져오기는 함.
	const Time = React.lazy(() => import('host/getTime'));

	return(	
		<React.Fragment>
			<img src='../../public/images/snakes.png' alt='PYTHON'/>
			<br/>
			<a href="https://www.flaticon.com/packs/development-11" title="Icon Pack: Development">Icon Pack: Development | Lineal</a>
			<br/>
			<Suspense fallback={<span>Loading host module...</span>}>
				<Time title={'THIS IS PYTHON'}/>
			</Suspense>
		</React.Fragment>
	);
}