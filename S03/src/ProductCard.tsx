import {memo} from "react";
import type {Product} from "./cart.ts";

interface ProductCardProps {
    product: Product;
    qty: number;
    onAdd: (product: Product) => void;
    onRemove: (id: number) => void;
}

const ProductCard = memo(function ProductCard({
                                                  product, qty, onAdd, onRemove
                                              }: ProductCardProps) {
    console.log("render", product.id);

    return (
        <article className="product-card">
            <h2>{product.title}</h2>
            <p className="product-price">{product.price} ₽</p>
            <p className={product.inStock ? "stock-status in-stock" : "stock-status out-of-stock"}>
                {product.inStock ? "В наличии" : "Нет в наличии"}
            </p>
            <div className="card-actions">
                {qty > 0 ? (
                    <div className="cart-item-controls">
                        <button
                            className="cart-quantity"
                            onClick={() => onAdd(product)}
                        >
                            В корзине: {qty}
                        </button>
                        <button
                            className="button button-outline"
                            onClick={() => onRemove(product.id)}
                        >
                            Убрать
                        </button>
                    </div>
                ) : (
                    <button
                        className="button button-primary add-button"
                        disabled={!product.inStock}
                        onClick={() => onAdd(product)}
                    >
                        В корзину
                    </button>
                )}
            </div>
        </article>
    );
});

export default ProductCard;