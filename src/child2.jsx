import React, { useMemo } from "react"
import { useFetch } from "./useFetch"

const Child2 = React.memo(() => {
    const { result, loading, error, refetch } = useFetch('https://fakestoreapi.com/products')

    const dataLength = useMemo(() => {
        return result ? result.length : 0
    }, [result])

    return (
        <div>
            <h1>Child 2</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            
            
            {result && (
                <div>
                    <p>Data length: {dataLength}</p>
                    <ul>
                        {result.map(elm => (
                            <li key={elm.id}>{elm.title}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            <button onClick={refetch}>Refetch Data</button>
        </div>
    )
})

export default Child2
