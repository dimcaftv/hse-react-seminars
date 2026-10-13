import ProductCard from "./ProductCard.tsx";

export default function ProductList({
                                        products,
                                        onAdd,
                                    }) {
    if (products.length === 0) {
        return <p className="empty-state">Товары не найдены.</p>;
    }

    return (
        <section className="product-list" aria-label="Список товаров">
            {products.map((product) => (
                <ProductCard
                    product={product}
                    onAdd={onAdd}
                />
            ))}
        </section>
    );
}