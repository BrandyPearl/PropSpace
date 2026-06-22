import { useState } from "react"
import InputField from "./InputField"
import { apiRequest } from "../api/client"
import { useAuth } from "../context/AuthContext"

function LoginForm() {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle")
  const [serverMessage, setServerMessage] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) newErrors.email = "Email is required"
    if (!form.password) newErrors.password = "Password is required"
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
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: form,
      })

      login(data.token, data.user)
      setStatus("success")
      setServerMessage(`Welcome back, ${data.user.username}!`)
    } catch (err) {
      setStatus("error")
      setServerMessage(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Log in</h2>

      <InputField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="jane@example.com"
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Your password"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-blue-300 transition"
      >
        {status === "loading" ? "Logging in..." : "Log In"}
      </button>

      {status === "success" && <p className="mt-3 text-sm text-green-600">{serverMessage}</p>}
      {status === "error" && <p className="mt-3 text-sm text-red-500">{serverMessage}</p>}
    </form>
  )
}

export default LoginForm