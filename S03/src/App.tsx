import {useMemo, useState, useTransition} from "react";
import {products} from "./data.js";
import Header from "./Header.tsx";
import SearchBar from "./SearchBar.tsx";
import ProductList from "./ProductList.tsx";
import {useCart} from "./cart.ts";


export default function App() {
    const [query, setQuery] = useState("");
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [filter, setFilter] = useState("");
    const [isPending, startTransition] = useTransition();

    const {totalCount, totalPrice, qtyById, onAdd, onRemove, onClear} = useCart();


    function handleSearch(value: string) {
        setQuery(value);
        startTransition(() => setFilter(value));
    }

    const visible = useMemo(() => {
        const q = filter.trim().toLowerCase();

        return products.filter((p) => {
            return p.title.toLowerCase().includes(q) && (!onlyInStock || p.inStock);
        });
    }, [filter, onlyInStock]);

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
                onQueryChange={handleSearch}
                onOnlyInStockChange={setOnlyInStock}
            />
            <p
                className="pending-message"
            >
                {isPending ? "Обновляем список…" : ""}
            </p>
            <ProductList
                products={visible}
                qtyById={qtyById}
                onAdd={onAdd}
                onRemove={onRemove}
            />
        </div>
    )
}
