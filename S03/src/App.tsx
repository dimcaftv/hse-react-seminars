import {useMemo, useReducer, useState} from "react";
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

    let totalCount = cart.items.reduce((total, item) => total + item.qty, 0);
    let totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.qty, 0);


    return (
        <div className="store">
            <Header itemCount={totalCount}
                    totalPrice={totalPrice}
                    onClear={() => dispatch({type: "clear"})}
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
                cart={cart}
                onAdd={(product: Product) => dispatch({type: "add", product})}
                onRemove={(id: number) => dispatch({type: "remove", id})}
            />
        </div>
    )
}
