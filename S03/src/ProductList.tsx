import ProductCard from "./ProductCard.tsx";

export default function ProductList({
                                        products,
                                        qtyById,
                                        onAdd,
                                        onRemove
                                    }) {
    if (products.length === 0) {
        return <p className="empty-state">Товары не найдены.</p>;
    }

    return (
        <section className="product-list" aria-label="Список товаров">
            {products.map((product) => (
                <ProductCard
                    product={product}
                    qty={qtyById[product.id] ?? 0}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            ))}
        </section>
    );
}