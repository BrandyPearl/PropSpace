import { Link } from "react-router-dom"

function PropertyCard({ property }) {
  const { _id, title, description, price, location, propertyType, imageUrls } = property

  return (
    <Link to={`/properties/${_id}`} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
      <div className="h-40 bg-slate-200 flex items-center justify-center text-slate-400">
        {imageUrls && imageUrls.length > 0 ? (
          <img src={imageUrls[0]} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span>No image</span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-1 flex-1">{description}</p>

        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
          <span>{location?.city}, {location?.country}</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            {propertyType}
          </span>
        </div>

        <p className="mt-2 text-xl font-bold text-slate-800">${price}<span className="text-sm font-normal text-slate-500">/mo</span></p>
      </div>
    </Link>
  )
}

export default PropertyCard
