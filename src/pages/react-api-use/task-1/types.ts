import {env} from '../../../../env.ts'
export interface Product {
    product_title: string,
    product_price: string,
    product_description: string,
    product_photo: string
}
export interface ProdutsRespone {
    data: Product[],
    status: string
}
const LIMIT = 100
const PAGE = 1
const API_CATEGORY = "product-offers"
const API_HOST = "real-time-amazon-data.p.rapidapi.com"
const COUNTRY = "US"
export const URL = `https://${API_HOST}/${API_CATEGORY}?asin=B09SM24S8C&country=${COUNTRY}&limit=${LIMIT}&$page=${PAGE}` as string

export const REQUEST_OPTIONS = {
    method: "GET",
    headers: {
        "x-rapid-api": env.VITE_RAPID_API_KEY as string,
        "x-rapid-host": API_HOST as string,
        "CONTENT-TYPE": "application/json"
    }
}
