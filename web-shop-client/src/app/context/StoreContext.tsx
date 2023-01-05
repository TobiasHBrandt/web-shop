import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    // get basket from api
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

// method to create storecontext

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// consumed storecontext 

export function useStoreContext() {
    const context = useContext(StoreContext);

    // checked if there is something in storecontext that is not undefined
    if (context === undefined) {
        throw Error('Oops - we do not seem to be inside the provider')
    }

    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId:number, quantity: number) {
        if (!basket) {
            return;
        }
        // make a copy of the basket into the items
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) {
                items.splice(itemIndex, 1);
            }
            setBasket(prevState => {
                // replace the value
                return {...prevState!, items}
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}