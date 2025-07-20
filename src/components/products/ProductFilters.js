 
import React from 'react';
import { FiX } from 'react-icons/fi';
import { useProducts } from '../../contexts/ProductContext';
import { SORT_OPTIONS, RATING_FILTERS } from '../../utils/constants';

const ProductFilters = ({ onClose }) => {
  const { categories, filters, updateFilters } = useProducts();

  const handleCategoryChange = (category) => {
    updateFilters({ category: category === filters.category ? '' : category });
  };

  const handlePriceRangeChange = (min, max) => {
    updateFilters({ priceRange: [min, max] });
  };

  const handleRatingChange = (rating) => {
    updateFilters({ rating: rating === filters.rating ? 0 : rating });
  };

  const handleSortChange = (sortBy) => {
    updateFilters({ sortBy });
  };

  const clearFilters = () => {
    updateFilters({
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      sortBy: 'name',
      searchQuery: '',
    });
  };

  return (
    <div className="product-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <button className="clear-filters" onClick={clearFilters}>
          Clear All
        </button>
        {onClose && (
          <button className="close-filters" onClick={onClose}>
            <FiX />
          </button>
        )}
      </div>

      <div className="filter-section">
        <h4>Sort By</h4>
        <div className="filter-options">
          {SORT_OPTIONS.map(option => (
            <label key={option.value} className="filter-option">
              <input
                type="radio"
                name="sortBy"
                value={option.value}
                checked={filters.sortBy === option.value}
                onChange={(e) => handleSortChange(e.target.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Categories</h4>
        <div className="filter-options">
          {categories.map(category => (
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

      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-range">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
            className="price-slider"
          />
          <div className="price-labels">
            <span>$0</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h4>Rating</h4>
        <div className="filter-options">
          {RATING_FILTERS.map(option => (
            <label key={option.value} className="filter-option">
              <input
                type="radio"
                name="rating"
                value={option.value}
                checked={filters.rating === option.value}
                onChange={(e) => handleRatingChange(parseInt(e.target.value))}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
