import {type RouteConfig, route, index} from "@react-router/dev/routes"

export default [
    // define the root App Directory route by index 
    index("src/routes"),
    // define each route (url-route, file-route)
    route("/basic-routing/products", "/basic-routing/products/ProductsList.tsx"),
] satisfies RouteConfig