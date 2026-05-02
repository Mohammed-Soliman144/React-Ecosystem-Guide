import {useState, useEffect, useRef, useLayoutEffect, useCallback} from "react"


const initialState = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."

export const AdvertisesBanner = ({handleBannerHeight}: {handleBannerHeight: (num: number) => void}) => {
    const [randomContent, setRandomContent] = useState(1)
    const bannerRef = useRef<HTMLDivElement>(null)
    const timerRef = useRef<number>(0)
    useEffect(() => {
        timerRef.current = setInterval(()=> {
            setRandomContent(Math.ceil(1 * Math.random() * 400))
        }, 3000)

        return () => {
            if(timerRef.current !== 0) clearInterval(timerRef.current)
        }
    }, [setRandomContent])

    useLayoutEffect(() => {
        const handleHeight = () => {
            if(!bannerRef.current) return
            const bannerHeight = bannerRef.current.getBoundingClientRect().height
            handleBannerHeight(bannerHeight)
        }

        // run immediately at mounting
        handleHeight()
        window.addEventListener("resize", handleHeight)
        // window.addEventListener("scroll", handleHeight)

        return () => {
            window.removeEventListener("resize", handleHeight)
            // window.removeEventListener("scroll", handleHeight)
        }
    }, [randomContent, handleBannerHeight])
    return <div className="bg-slate-900 p-3 rounded-xl" ref={bannerRef}>
        <p className="text-2xl text-white bg-gray-700 p-2 rounded-xl">number of lorem paragraph = {randomContent}</p>
        {
            Array.from({length: randomContent}, (_) => initialState).map((item, indx) => 
                <p key={indx} className="text-white">{item}</p>
            )
        }
    </div>
}