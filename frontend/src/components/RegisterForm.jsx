import { useState } from "react"
import InputField from "./InputField"

const initialFormState = {
  username: "",
  email: "",
  password: "",
}

function RegisterForm() {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle") // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}

    if (!form.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address"
    }

    if (!form.password) {
      newErrors.password = "Password is required"
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return // block network call if validation fails
    }

    setStatus("loading")
    setServerMessage("")

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setServerMessage(data.message || "Registration failed")
        return
      }

      setStatus("success")
      setServerMessage(`Welcome, ${data.user.username}! Registration successful.`)
      setForm(initialFormState)
    } catch (err) {
      setStatus("error")
      setServerMessage("Could not reach the server. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Create an account</h2>

      <InputField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        error={errors.username}
        placeholder="janedoe"
      />

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
        placeholder="At least 6 characters"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-blue-300 transition"
      >
        {status === "loading" ? "Creating account..." : "Register"}
      </button>

      {status === "success" && (
        <p className="mt-3 text-sm text-green-600">{serverMessage}</p>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-red-500">{serverMessage}</p>
      )}
    </form>
  )
}

export default RegisterForm