export interface Product {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
}

export interface CartItem {
    product: Product;
    qty: number;
}

export interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: "add"; product: Product }
    | { type: "remove"; id: number }
    | { type: "clear" };

export const initialCart: CartState = {items: []};

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