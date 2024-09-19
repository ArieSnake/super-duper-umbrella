import React from "react";
import { useFetch } from "./useFetch";

function Child4() {
    const { result, loading, error, refetch } = useFetch('https://fakestoreapi.com/products');

    return (
        <div>
            <h1>Child 4</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {result && <p>Data length: {result.length}</p>}
            <button onClick={refetch}>Refetch Data</button>
        </div>
    )
}

export default Child4
