import {useCallback, useMemo, useReducer, useState} from "react";
import {products} from "./data.js";
import Header from "./Header.tsx";
import SearchBar from "./SearchBar.tsx";
import ProductList from "./ProductList.tsx";
import {cartReducer, initialCart, type Product} from "./cart.ts";


export default function App() {
    const [query, setQuery] = useState("");
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();

        return products.filter((p) => {
            return p.title.toLowerCase().includes(q) && (!onlyInStock || p.inStock);
        });
    }, [query, onlyInStock]);

    const totalCount = cart.items.reduce((total, item) => total + item.qty, 0);
    const totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.qty, 0);

    const onAdd = useCallback((product: Product) => dispatch({type: "add", product}), []);
    const onRemove = useCallback((id: number) => dispatch({type: "remove", id}), []);
    const onClear = useCallback(() => dispatch({type: "clear"}), []);

    const qtyById = useMemo(() => {
        const quantities = {};
        cart.items.forEach((item) => {
            quantities[item.product.id] = item.qty;
        });
        return quantities;
    }, [cart.items]);

    return (
        <div className="store">
            <Header itemCount={totalCount}
                    totalPrice={totalPrice}
                    onClear={onClear}
            />
            <SearchBar
                query={query}
                onlyInStock={onlyInStock}
                resultCount={visible.length}
                onQueryChange={setQuery}
                onOnlyInStockChange={setOnlyInStock}
            />
            <ProductList
                products={visible}
                qtyById={qtyById}
                onAdd={onAdd}
                onRemove={onRemove}
            />
        </div>
    )
}
