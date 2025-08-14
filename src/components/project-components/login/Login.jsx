import { useState } from "react";
import login from "../../../assets/login-page.png";
import { loginApi } from "../../../api/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!agree) {
      newErrors.agree = "You must agree to the privacy policy.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await loginApi({
        university_number: email,
        password: password
      })

      localStorage.setItem("pharmaToken" , response.token)
      localStorage.setItem("role" , response.roles[0].name)
      navigate("/dashboard")
     
    } catch (err) {
      setErrors({ server: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={login}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={login}
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleSubmit}>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>

              {errors.server && (
                <p className="mb-2 text-red-500 text-sm">{errors.server}</p>
              )}

              <label className="block text-sm mb-2">
                <span className="text-gray-700 dark:text-gray-400">Email</span>
                <input
                  type="email"
                  className="block w-full mt-1 text-sm form-input dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </label>

              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">Password</span>
                <input
                  type="password"
                  className="block w-full mt-1 text-sm form-input dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </label>

              {/* <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Confirm Password
                </span>
                <input
                  type="password"
                  className="block w-full mt-1 text-sm form-input dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </label> */}

              <label className="flex items-center mt-4 text-sm dark:text-gray-400">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </label>
              {errors.agree && (
                <p className="text-red-500 text-xs mt-1">{errors.agree}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="block w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
