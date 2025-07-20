import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, viewMode }) => {
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className={`product-list ${viewMode}`}>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ProductList;
