export default function ProductCard({
                                        product, onAdd,
                                    }) {

    return (
        <article className="product-card">
            <h2>{product.title}</h2>
            <p className="product-price">{product.price} ₽</p>
            <p className={product.inStock ? "stock-status in-stock" : "stock-status out-of-stock"}>
                {product.inStock ? "В наличии" : "Нет в наличии"}
            </p>
            <div className="card-actions">
                <button
                    className="button button-primary add-button"
                    type="button"
                    disabled={!product.inStock}
                    onClick={() => onAdd(product)}
                >
                    В корзину
                </button>
            </div>
        </article>
    );
}