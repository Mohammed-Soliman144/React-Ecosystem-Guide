import { useQuery } from "@tanstack/react-query"
import axios from "axios"



interface IPosts {
    id: number,
    post: string,
    date: string
}

export const UseQueryPosts = () => {

    const {isLoading, isError, error, data: posts} = useQuery({
        queryKey: ["posts"],
        queryFn: async ({signal}) => {
            const res = await axios.get<IPosts[]>("http://localhost:4000/posts", {
                signal
            })
            return res.data
        }
    })

    if(isLoading)
        return <div className="loading">
            Loading...
        </div>
    if(isError)
        return <div className="error">
            Something went wrong! - {error.message}
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