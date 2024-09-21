import React from 'react';
import { useFetch } from './useFetch';

const Child4 = () => {
  const { result, loading, error, refetch } = useFetch('https://fakestoreapi.com/products')

  const dataLength = result ? result.length : 0

  return (
    <div>
      <h2>Child 4</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message || 'An error occurred'}</p>}
      {result && (
        <div>
          <p>Data length: {dataLength}</p>
          <ul>
            {result.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={refetch}>Refetch Data</button>
    </div>
  )
}

export default React.memo(Child4)

