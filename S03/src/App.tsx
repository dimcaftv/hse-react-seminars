import {useMemo, useState} from "react";
import {products} from "./data.js";
import Header from "./Header.tsx";
import SearchBar from "./SearchBar.tsx";
import ProductList from "./ProductList.tsx";


export default function App() {
    const [query, setQuery] = useState("");
    const [onlyInStock, setOnlyInStock] = useState(false);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();

        return products.filter((p) => {
            return p.title.toLowerCase().includes(q) && (!onlyInStock || p.inStock);
        });
    }, [query, onlyInStock]);


    return (
        <div className="store">x
            <Header itemCount={0}
                    totalPrice={0}
                    onClear={() => {
                    }}
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
                onAdd={() => {
                }}
            />
        </div>
    )
}
