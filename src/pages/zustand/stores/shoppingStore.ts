import {create} from 'zustand'
import {persist, createJSONStorage, subscribeWithSelector} from 'zustand/middleware'

export type TVendor = {
    vendorId: string,
    vendorName: string
}

export type TItem = {
    prodId: string,
    prodName: string,
    prodQty: number,
    vendorId: string
}

export type TSession = {
    token: string,
    lastLogin: string,
    preferences: {
        currency: {
            country: string,
            type: string
        }
        languages: string[]
    }
}
export interface ICartStore {
    cartData: {
        vendors: TVendor[],
        items: TItem[]
    },
    userSession: TSession,
    actions: {
        updateQty: (vendId: string, prodId: string, newQty: number) => void,
        addProd: (newProd: TItem) => void,
        removeProd: (prodId: string) => void,
        incrementQty: (prodId: string) => void,
        decrementQty: (prodId: string) => void,
        addSession: (newUserSession: TSession) => void
        addVendor: (newVendor: TVendor) => void,
    }
}

const initialCartStore: Omit<ICartStore, 'actions'> = {
    cartData: {
        vendors: [],
        items: []
    },
    userSession: {
        token: "",
        lastLogin: "",
        preferences: {
            currency: {
                country: "",
                type: ""
            },
            languages: []
        }
    }
}
export const useCartStore = create<ICartStore>()(persist(subscribeWithSelector((set) => ({
    // unpacking initialCartStore
    ...initialCartStore,
    actions: {
        addProd: (newItem) => set(state => ({...state, 
            cartData: {
            ...state.cartData,
            items: [
                ...state.cartData.items,
                newItem
            ]}
        })),
        addVendor: (newVendor) => set(state => ({
            ...state,
            cartData: {
                ...state.cartData,
                vendors: [
                    ...state.cartData.vendors,
                    newVendor
                ]
            }
        })),
        incrementQty: (prdId) => set(state=> ({
            ...state,
            cartData: {
                ...state.cartData,
                items: state.cartData.items.map(prd => prd.prodId === prdId? {...prd, prodQty: prd.prodQty + 1} : prd)
            }
        })),
        decrementQty: (prdId) => set(state=> ({
            ...state,
            cartData: {
                ...state.cartData,
                items: state.cartData.items.map(prd => prd.prodId === prdId? {...prd, prodQty: prd.prodQty - 1} : prd)
            }
        })),
        removeProd: (prdId) => set(state=> ({
            ...state,
            cartData: {
                ...state.cartData,
                items: state.cartData.items.filter(prod => prod.prodId !== prdId)
            }
        })),
        updateQty: (vendId, prodId, newQty) => set(state => ({
            ...state,
            cartData: {
                ...state.cartData,
                items: state.cartData.items.map(prod => prod.prodId === prodId && prod.vendorId === vendId ? {...prod, prodQty: newQty} : prod)
            }
        })),
        addSession: (newSession) => set(state=> ({
            ...state,
            userSession: {
                ...state.userSession,
                token: newSession.token,
                lastLogin: newSession.lastLogin,
                preferences: {
                    ...state.userSession.preferences,
                    currency: {
                        ...state.userSession.preferences.currency,
                        country: newSession.preferences.currency.country,
                        type: newSession.preferences.currency.type
                    },
                    languages: newSession.preferences.languages
                }
            }
        }))
    }
})),{name: "shoppingStore", storage: createJSONStorage(()=> localStorage) ,partialize: (state) => ({userSession: state.userSession})}))
