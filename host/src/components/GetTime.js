import React, { useEffect, useState } from 'react'

export default function GetTime({title}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let dt = new Date();
    console.log(title + ' : ' + dt.toISOString());
    setTime(dt);
  }, [title]);

  return (
    <span>{title.toString()}: {time.toISOString()}</span>
  );
}