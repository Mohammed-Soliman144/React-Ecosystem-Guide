import { useQuery } from "@tanstack/react-query"
import axios from "axios"



interface IPosts {
    id: number,
    post: string,
    date: string
}

export const UseQueryPosts = () => {

    const {isLoading, isError, error, data: posts, isFetching, refetch} = useQuery({
        queryKey: ["posts"],
        queryFn: async ({signal}) => {
            const res = await axios.get<IPosts[]>("http://localhost:4000/posts", {
                signal
            })
            return res.data
        },
        staleTime: 10000, // Network request
        gcTime: 300000, // browser memory
        refetchOnMount: true, // true (best practice) | false | 'always' => dependent on user interaction
        // refetchOnWindowFocus: true, // true (best practice) | false | 'always'  => dependent on user interaction]
        // refetchInterval: 3000, // 3000 or false => is called polling which refetch data based on interval but when window focus (but if window not focus like open new browser tab stop executing interval)
        // refetchIntervalInBackground: true, // true or false based on the same interval on reftchInterval milleseconds and false is default value - to make component refetch data when user not focus on window component (but when component unmount is stopping interval which cleanup totally from react memory),
        // enabled: false,
        // 
        refetchInterval: 3000,
    })

    // if(isFetching)
    //     <div className="fetching">
    //         Updating data in background or fetching data in background
    //         <p><strong>staleTime</strong> {`=>`} staleTime default 0 and is the time (Network Request) resend request to server or api endpoint to fetch data and time in millesecond</p>
    //         <p><strong>gcTime</strong>{`=>`} stands for garbage time (Browser Memory) and default 300000 (5 minutes) is time that browser save cached request or stale data in browser memory then cleanup by garabage collection</p>
    //     </div>
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
    return <button type="button" onClick={()=> refetch()}>Fetch Data</button>
}