import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { apiRequest } from "../api/client"

function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [status, setStatus] = useState("loading") // loading | success | error | notfound
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchProperty = async () => {
      setStatus("loading")
      try {
        const data = await apiRequest(`/properties/${id}`)
        setProperty(data.property)
        setStatus("success")
      } catch (err) {
        if (err.statusCode === 404) {
          setStatus("notfound")
        } else {
          setErrorMessage(err.message)
          setStatus("error")
        }
      }
    }

    fetchProperty()
  }, [id])

  if (status === "loading") {
    return <p className="text-center text-slate-500 py-20">Loading property...</p>
  }

  if (status === "notfound") {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">Property not found.</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to listings</Link>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Error: {errorMessage}</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to listings</Link>
      </div>
    )
  }

  const { title, description, price, location, propertyType, imageUrls, owner } = property

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-64 bg-slate-200 flex items-center justify-center text-slate-400">
          {imageUrls && imageUrls.length > 0 ? (
            <img src={imageUrls[0]} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span>No image</span>
          )}
        </div>

        <div className="p-6">
          <Link to="/" className="text-sm text-blue-600 hover:underline">&larr; Back to listings</Link>

          <h1 className="text-2xl font-bold text-slate-800 mt-2">{title}</h1>
          <p className="text-slate-600 mt-2">{description}</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-slate-600">{location?.city}, {location?.country}</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {propertyType}
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-800">
            ${price}<span className="text-base font-normal text-slate-500">/mo</span>
          </p>

          {owner && (
            <p className="mt-4 text-sm text-slate-500">
              Listed by {owner.username}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
