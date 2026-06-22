function FilterSidebar({ filters, onChange, onApply }) {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-64">
      <h3 className="font-semibold text-slate-700 mb-3">Filters</h3>

      <div className="mb-3">
        <label className="block text-sm text-slate-600 mb-1">City</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleChange}
          placeholder="e.g. Yaounde"
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm text-slate-600 mb-1">Min Price</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="0"
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-slate-600 mb-1">Max Price</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="1000"
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <button
        onClick={onApply}
        className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>
    </div>
  )
}

export default FilterSidebar