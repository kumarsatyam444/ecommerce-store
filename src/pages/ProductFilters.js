import React from 'react';

const ProductFilters = ({ filters, categories, onFilterChange }) => {
  const handleCategoryChange = (category) => {
    onFilterChange({ category: category === filters.category ? '' : category });
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    onFilterChange({ priceRange: [0, value] });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ rating: rating === filters.rating ? 0 : rating });
  };

  return (
    <div className="product-filters">
      {/* Categories */}
      <div className="filter-group">
        <h4>Categories</h4>
        <div className="filter-options">
          {categories.map((category) => (
            <label key={category} className="filter-option">
              <input
                type="checkbox"
                checked={filters.category === category}
                onChange={() => handleCategoryChange(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <h4>Price Range</h4>
        <div className="price-range">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={handlePriceRangeChange}
            className="price-slider"
          />
          <div className="price-labels">
            <span>$0</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="filter-group">
        <h4>Minimum Rating</h4>
        <div className="rating-filters">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
              />
              <span>
                {Array.from({ length: rating }, (_, i) => '★').join('')}
                {Array.from({ length: 5 - rating }, (_, i) => '☆').join('')}
                & up
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
