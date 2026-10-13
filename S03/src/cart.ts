import {useCallback, useMemo, useReducer} from "react";

export interface Product {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
}

interface CartItem {
    product: Product;
    qty: number;
}

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: "add"; product: Product }
    | { type: "remove"; id: number }
    | { type: "clear" };

const initialCart: CartState = {items: []};

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "add": {
            let found = false;
            const items = state.items.map((item) => {
                if (item.product.id !== action.product.id) {
                    return item;
                }

                found = true;
                return {product: item.product, qty: item.qty + 1};
            });

            if (!found) {
                items.push({product: action.product, qty: 1});
            }

            return {items};
        }
        case "remove":
            return {
                items: state.items.filter((item) => item.product.id !== action.id),
            };
        case "clear":
            return initialCart;
        default:
            return state;
    }
}

export function useCart() {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    const onAdd = useCallback((product: Product) => {
        dispatch({type: "add", product});
    }, []);

    const onRemove = useCallback((id: number) => {
        dispatch({type: "remove", id});
    }, []);

    const onClear = useCallback(() => {
        dispatch({type: "clear"});
    }, []);

    const qtyById = useMemo(() => {
        const quantities = {};
        cart.items.forEach((item) => {
            quantities[item.product.id] = item.qty;
        });
        return quantities;
    }, [cart.items]);

    const totalCount = useMemo(
        () => cart.items.reduce((total, item) => total + item.qty, 0),
        [cart.items]
    );

    const totalPrice = useMemo(
        () =>
            cart.items.reduce(
                (total, item) => total + item.product.price * item.qty,
                0,
            ),
        [cart.items]
    );

    return {totalCount, totalPrice, qtyById, onAdd, onRemove, onClear};
}