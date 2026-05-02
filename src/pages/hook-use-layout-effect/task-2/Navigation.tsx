import React from "react"

export const Navigation = React.memo(({bannerHeight}: {bannerHeight: number}) => {
    const navbarLinks = [
        "Home",
        "Products",
        "Services",
        "About",
        "Contact"
    ]
    return <nav className="navbar bg-cyan-900 p-4 rounded-lg" style={{
        position: 'sticky',
        top: `${bannerHeight}px`,
    }}>
        <ul className="flex justify-between content-center text-white">
            {
                navbarLinks.map((item, idx) => 
                    <li key={idx}>{item}</li>
                )
            }
        </ul>
    </nav>
})