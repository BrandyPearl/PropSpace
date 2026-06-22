import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { apiRequest } from "../api/client"
import CreateListingForm from "../components/CreateListingForm"

function DashboardPage() {
  const { user, token, logout } = useAuth()
  const [myProperties, setMyProperties] = useState([])
  const [status, setStatus] = useState("loading")
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ title: "", price: "" })

  const fetchMine = async () => {
    setStatus("loading")
    try {
      const data = await apiRequest("/properties/mine", { token })
      setMyProperties(data.properties)
      setStatus("success")
    } catch (err) {
      setStatus("error")
    }
  }

  useEffect(() => {
    fetchMine()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return
    try {
      await apiRequest(`/properties/${id}`, { method: "DELETE", token })
      setMyProperties(myProperties.filter((p) => p._id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  const startEdit = (property) => {
    setEditingId(property._id)
    setEditForm({ title: property.title, price: property.price })
  }

  const saveEdit = async (id) => {
    try {
      const data = await apiRequest(`/properties/${id}`, {
        method: "PUT",
        token,
        body: { title: editForm.title, price: Number(editForm.price) },
      })
      setMyProperties(myProperties.map((p) => (p._id === id ? data.property : p)))
      setEditingId(null)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Welcome, {user?.username}</h2>
        <p className="text-slate-500 mb-4">{user?.email}</p>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
          Log Out
        </button>
      </div>

      <CreateListingForm onSuccess={() => fetchMine()} />

      <div className="max-w-md mx-auto mt-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-3">My Listings</h3>

        {status === "loading" && <p className="text-slate-500">Loading...</p>}
        {status === "error" && <p className="text-red-500">Could not load your listings.</p>}
        {status === "success" && myProperties.length === 0 && (
          <p className="text-slate-500">You haven't listed any properties yet.</p>
        )}

        {status === "success" && myProperties.map((property) => (
          <div key={property._id} className="bg-white p-4 rounded-lg shadow-md mb-3">
            {editingId === property._id ? (
              <div>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded mb-2"
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded mb-2"
                />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(property._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="bg-slate-300 px-3 py-1 rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{property.title}</p>
                  <p className="text-slate-500 text-sm">${property.price}/mo</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(property)} className="text-blue-600 text-sm hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(property._id)} className="text-red-500 text-sm hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
