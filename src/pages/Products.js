 
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import Loader from '../components/common/Loader';
import { debounce } from '../utils/helpers';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredProducts, loading, filters, updateFilters, categories } = useProducts();
  const { addToCart } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    // Update filters based on URL params
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    if (category || search || sort) {
      updateFilters({
        ...(category && { category }),
        ...(search && { searchQuery: search }),
        ...(sort && { sortBy: sort }),
      });
    }
  }, [searchParams, updateFilters]);

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    
    if (newFilters.category) {
      params.set('category', newFilters.category);
    } else {
      params.delete('category');
    }
    
    if (newFilters.searchQuery) {
      params.set('search', newFilters.searchQuery);
    } else {
      params.delete('search');
    }
    
    if (newFilters.sortBy && newFilters.sortBy !== 'name') {
      params.set('sort', newFilters.sortBy);
    } else {
      params.delete('sort');
    }
    
    setSearchParams(params);
  };

  const debouncedSearch = debounce((query) => {
    handleFilterChange({ searchQuery: query });
  }, 300);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const clearFilters = () => {
    updateFilters({
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      sortBy: 'name',
      searchQuery: '',
    });
    setSearchParams({});
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title">
            <h1>Products</h1>
            <p>Discover our amazing collection</p>
          </div>
          
          <div className="page-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                defaultValue={filters.searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>
            
            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ⊞
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>
            
            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters {showFilters ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <div className="products-content">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={clearFilters} className="clear-filters">
                Clear All
              </button>
            </div>
            
            <ProductFilters
              filters={filters}
              categories={categories}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Products Grid */}
          <main className="products-main">
            <div className="products-toolbar">
              <div className="results-info">
                <span>{filteredProducts.length} products found</span>
                {filters.category && (
                  <span className="active-filter">
                    Category: {filters.category}
                    <button
                      onClick={() => handleFilterChange({ category: '' })}
                      className="remove-filter"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </div>
              
              <div className="sort-controls">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                  className="sort-select"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-content">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search terms</p>
                  <button onClick={clearFilters} className="btn btn-primary">
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className={`products-grid ${viewMode}`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
