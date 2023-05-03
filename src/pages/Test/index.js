import { useEffect } from 'react';
import { useState } from 'react';
function Test ()
{
  const[count,setCount] = useState(0);
  useEffect(() => {
    document.title = count;
  })
  return(
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default Test;