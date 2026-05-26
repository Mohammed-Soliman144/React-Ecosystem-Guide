import {useState, useEffect} from "react"
import axios from "axios"

interface IPosts {
    id: number,
    post: string,
    date: string
}

export const UseEffectPosts = () => {
    const [posts, setPosts] = useState<IPosts[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(()=> {
        const controller = new AbortController()

        const fetchPosts = async() => {
                setIsLoading(true)
                setError("")
            try {
                const res = await axios.get<IPosts[]>("http://localhost:4000/posts", {
                    signal: controller.signal,
                    headers: {
                        "Accept": "application/json"
                    }
                })

                setPosts(res.data)
                return res.data
            } catch(err) {
                if(axios.isCancel(err)) return
                if(axios.isAxiosError(err))
                    setError(err.response?.data?.message || err.message)
                else if(err instanceof Error)
                    setError(err.message)
                else
                    setError(`Unknown Error ${err}`)
            } finally {
                    setIsLoading(false)
            }
        }

        fetchPosts()

        return () => {
            controller.abort()
        }
    }, [])

    if(isLoading)
        return <div className="loading">
            Loading...
        </div>
    if(error)
        return <div className="error">
            Something went wrong! - {error}
        </div>
    if(posts && posts.length > 0)
        return <section>
            {
                posts.map(post => (
                    <article key={post.id}>
                        <p>{post.post}</p>
                        <p>{post.date}</p>
                    </article>
                ))
            }
        </section>
    return null
}