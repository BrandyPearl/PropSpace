import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { apiRequest } from "../api/client"

function ProfileSettingsPage() {
  const { user, token } = useAuth()
  const [profileForm, setProfileForm] = useState({ username: user?.username || "", phone: "", avatarUrl: "" })
  const [profileStatus, setProfileStatus] = useState("idle")
  const [profileMessage, setProfileMessage] = useState("")

  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "" })
  const [passwordStatus, setPasswordStatus] = useState("idle")
  const [passwordMessage, setPasswordMessage] = useState("")

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileStatus("loading")
    try {
      await apiRequest("/users/me", { method: "PUT", token, body: profileForm })
      setProfileStatus("success")
      setProfileMessage("Profile updated successfully")
    } catch (err) {
      setProfileStatus("error")
      setProfileMessage(err.message)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordStatus("loading")
    try {
      await apiRequest("/users/me/password", { method: "PUT", token, body: passwordForm })
      setPasswordStatus("success")
      setPasswordMessage("Password changed successfully")
      setPasswordForm({ oldPassword: "", newPassword: "" })
    } catch (err) {
      setPasswordStatus("error")
      setPasswordMessage(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Profile Settings</h2>
        <form onSubmit={handleProfileSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={profileForm.username}
            onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md mb-3"
          />
          <input
            type="text"
            placeholder="Phone"
            value={profileForm.phone}
            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md mb-3"
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={profileForm.avatarUrl}
            onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md mb-3"
          />
          <button type="submit" disabled={profileStatus === "loading"} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            {profileStatus === "loading" ? "Saving..." : "Save Profile"}
          </button>
          {profileStatus === "success" && <p className="mt-2 text-sm text-green-600">{profileMessage}</p>}
          {profileStatus === "error" && <p className="mt-2 text-sm text-red-500">{profileMessage}</p>}
        </form>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            value={passwordForm.oldPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md mb-3"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md mb-3"
          />
          <button type="submit" disabled={passwordStatus === "loading"} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            {passwordStatus === "loading" ? "Updating..." : "Change Password"}
          </button>
          {passwordStatus === "success" && <p className="mt-2 text-sm text-green-600">{passwordMessage}</p>}
          {passwordStatus === "error" && <p className="mt-2 text-sm text-red-500">{passwordMessage}</p>}
        </form>
      </div>
    </div>
  )
}

export default ProfileSettingsPage
