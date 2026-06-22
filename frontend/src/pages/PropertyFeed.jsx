import { useState, useEffect } from "react"
import { apiRequest } from "../api/client"
import PropertyCard from "../components/PropertyCard"
import FilterSidebar from "../components/FilterSidebar"

function PropertyFeed() {
  const [properties, setProperties] = useState([])
  const [status, setStatus] = useState("loading") // loading | success | error
  const [errorMessage, setErrorMessage] = useState("")
  const [filters, setFilters] = useState({ city: "", minPrice: "", maxPrice: "" })

  const fetchProperties = async () => {
    setStatus("loading")
    setErrorMessage("")

    const params = new URLSearchParams()
    if (filters.city) params.append("city", filters.city)
    if (filters.minPrice) params.append("minPrice", filters.minPrice)
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice)

    const query = params.toString() ? `?${params.toString()}` : ""

    try {
      const data = await apiRequest(`/properties${query}`)
      setProperties(data.properties)
      setStatus("success")
    } catch (err) {
      setErrorMessage(err.message)
      setStatus("error")
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-slate-800 text-center mb-6">PropSpace Listings</h1>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        <FilterSidebar filters={filters} onChange={setFilters} onApply={fetchProperties} />

        <div className="flex-1">
          {status === "loading" && (
            <p className="text-center text-slate-500 py-10">Loading properties...</p>
          )}

          {status === "error" && (
            <p className="text-center text-red-500 py-10">Error: {errorMessage}</p>
          )}

          {status === "success" && properties.length === 0 && (
            <p className="text-center text-slate-500 py-10">No properties match your search.</p>
          )}

          {status === "success" && properties.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyFeed