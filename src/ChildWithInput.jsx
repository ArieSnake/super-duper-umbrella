// ChildWithInput.jsx
import React, { useState } from 'react';
import { useFetch } from './useFetch';

const ChildWithInput = () => {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedUrl(url);
  };

  const { result, loading, error, refetch } = useFetch(submittedUrl);

  return (
    <div>
      <h2>Child with Input</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter API URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '300px'}}
        />
        <button type="submit">Fetch Data</button>
      </form>

      {submittedUrl && (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message || 'An error occurred'}</p>}
          {result && (
            <div>
              <h3>Data from {submittedUrl}</h3>
              <ul>
            {result.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
            </div>
          )}
          <button onClick={refetch} disabled={!submittedUrl}>
            Refetch Data
          </button>
        </>
      )}
    </div>
  );
};

export default React.memo(ChildWithInput);
