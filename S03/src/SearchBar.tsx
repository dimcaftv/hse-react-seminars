import {useEffect, useRef} from "react";

export default function SearchBar({
                                      query,
                                      onlyInStock,
                                      resultCount,
                                      onQueryChange,
                                      onOnlyInStockChange,
                                  }) {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <section className="search-bar">
            <input
                ref={inputRef}
                className="search-input"
                type="search"
                placeholder="Поиск по названию..."
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
            />
            <label className="stock-filter">
                <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(event) => onOnlyInStockChange(event.target.checked)}
                />
                <span>Только в наличии</span>
            </label>
            <p className="result-count">Найдено: {resultCount}</p>
        </section>
    );
}
