import ProductCard from "./ProductCard.tsx";

export default function ProductList({
                                        products,
                                        cart,
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
                    qty={cart.items.find((item) => item.product.id === product.id)?.qty ?? 0}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            ))}
        </section>
    );
}