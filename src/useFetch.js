import { useEffect, useState, useCallback } from "react"

const cache = new Map()
const inProgressRequests = new Map()

export const useFetch = (url) => {
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchData = useCallback(() => {
        const cachedData = cache.get(url)
        if (cachedData && cachedData.expiry > Date.now()) {
            console.log(`Using cached data for URL: ${url}`)
            setResult(cachedData.data)
            setLoading(false)
            return
        } else if (inProgressRequests.has(url)) {
            console.log(`bringing from cached URL: ${url}`)
            setLoading(true)
            inProgressRequests.get(url).then((data) => {
                setResult(data)
                setLoading(false)
            }).catch((err) => setError(err))
        } else {
            console.log(`Fetching new data for URL: ${url}`)
            setLoading(true)
            const requestPromise = fetch(url)
                .then((res) => {
                    console.log('Network request made')
                    return res.json()
                })
                .then((data) => {
                    const expiryTime = Date.now() + 4 * 60 * 1000
                    cache.set(url, { data, expiry: expiryTime })
                    return data
                })

            inProgressRequests.set(url, requestPromise)

            requestPromise
                .then((data) => {
                    setResult(data)
                })
                .catch((err) => setError(err))
                .finally(() => {
                    setLoading(false)
                    inProgressRequests.delete(url)
                })
        }
    }, [url])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const refetch = useCallback(() => {
        console.log(`Refetching data for URL: ${url}`)
        cache.delete(url)
        fetchData()
    }, [fetchData, url])

    return { result, error, loading, refetch }
}
