import { useState } from "react"
import InputField from "./InputField"
import { apiRequest } from "../api/client"
import { useAuth } from "../context/AuthContext"

const initialFormState = {
  title: "",
  description: "",
  price: "",
  city: "",
  country: "",
  propertyType: "Apartment",
  imageUrl: "",
}

function CreateListingForm({ onSuccess }) {
  const { token } = useAuth()
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle")
  const [serverMessage, setServerMessage] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = "Title is required"
    if (!form.description.trim()) newErrors.description = "Description is required"
    if (!form.price || isNaN(form.price) || Number(form.price) < 0) {
      newErrors.price = "Enter a valid positive price"
    }
    if (!form.city.trim()) newErrors.city = "City is required"
    if (!form.country.trim()) newErrors.country = "Country is required"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus("loading")
    setServerMessage("")

    try {
      const data = await apiRequest("/properties", {
        method: "POST",
        token,
        body: {
          title: form.title,
          description: form.description,
          price: Number(form.price),
          location: { city: form.city, country: form.country },
          propertyType: form.propertyType,
          imageUrls: form.imageUrl ? [form.imageUrl] : [],
        },
      })

      setStatus("success")
      setServerMessage("Listing created successfully!")
      setForm(initialFormState)
      if (onSuccess) onSuccess(data.property)
    } catch (err) {
      setStatus("error")
      setServerMessage(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Create Listing</h2>

      <InputField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Cozy Downtown Apartment"
      />

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.description ? "border-red-400 focus:ring-red-300" : "border-slate-300 focus:ring-blue-300"
          }`}
          placeholder="Describe the property..."
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <InputField
        label="Price (per month)"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        error={errors.price}
        placeholder="450"
      />

      <InputField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        error={errors.city}
        placeholder="Yaounde"
      />

      <InputField
        label="Country"
        name="country"
        value={form.country}
        onChange={handleChange}
        error={errors.country}
        placeholder="Cameroon"
      />

      <div className="mb-4">
        <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700 mb-1">
          Property Type
        </label>
        <select
          id="propertyType"
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Studio">Studio</option>
        </select>
      </div>

      <InputField
        label="Image URL (optional)"
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="https://example.com/photo.jpg"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-blue-300 transition"
      >
        {status === "loading" ? "Creating..." : "Create Listing"}
      </button>

      {status === "success" && <p className="mt-3 text-sm text-green-600">{serverMessage}</p>}
      {status === "error" && <p className="mt-3 text-sm text-red-500">{serverMessage}</p>}
    </form>
  )
}

export default CreateListingForm