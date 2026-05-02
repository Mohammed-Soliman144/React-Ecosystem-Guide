import {useState, useCallback} from "react"
import { AdvertisesBanner } from "./AdvertisesBanner"
import { Navigation } from "./Navigation"

export const HeaderComponent = () => {
    const [bannerHeight, setBannerHeight] = useState(0)

    const handleBannerHeight = useCallback((height: number) => {
        setBannerHeight(height)
    }, [])
    return <header className="header">
        <AdvertisesBanner handleBannerHeight={handleBannerHeight}/>
        <Navigation bannerHeight={bannerHeight}/>
    </header>
}