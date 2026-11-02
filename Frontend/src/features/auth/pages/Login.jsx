import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth.js";

const Login = () => {
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const user = await handleLogin({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (user) {
        setSuccess(`Welcome back${user.fullname ? `, ${user.fullname}` : ""}.`);
        setFormData({ email: "", password: "" });
      } else {
        setError("We couldn't sign you in. Please check your credentials.");
      }
    } catch (requestError) {
      const responseData = requestError?.response?.data;
      const validationErrors = responseData?.errors
        ?.map((item) => item.msg)
        .filter(Boolean)
        .join(" ");
      setError(
        responseData?.message ||
          validationErrors ||
          "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    color: "#1b1c1a",
    borderBottom: "1px solid #d0c5b5",
    fontFamily: "'Inter', sans-serif",
  };

  const handleFocus = (event) => {
    event.target.style.borderBottomColor = "#C9A96E";
  };

  const handleBlur = (event) => {
    event.target.style.borderBottomColor = "#d0c5b5";
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen flex flex-col lg:flex-row selection:bg-[#C9A96E]/30"
        style={{ backgroundColor: "#fbf9f6", fontFamily: "'Inter', sans-serif" }}
      >
        <section
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
          style={{ backgroundColor: "#f5f3f0" }}
        >
          <img
            src="/snitch_editorial_warm.png"
            alt="Snitch fashion editorial"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.97)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(27,24,20,0.62) 0%, rgba(27,24,20,0.08) 45%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 p-14 flex flex-col justify-between z-10">
            <Link
              to="/login"
              className="w-fit text-sm font-medium tracking-[0.35em] uppercase"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#C9A96E",
              }}
            >
              Snitch.
            </Link>
            <div>
              <p
                className="text-5xl xl:text-6xl font-light leading-[1.08] text-white mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Your style,
                <br />
                <em>your story.</em>
              </p>
              <p
                className="text-sm font-light leading-relaxed max-w-xs"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Sign in to continue discovering modern essentials and timeless
                styles.
              </p>
            </div>
          </div>
        </section>

        <section
          className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-8 sm:px-14 lg:px-20 py-16"
          style={{ backgroundColor: "#fbf9f6" }}
        >
          <div className="w-full max-w-sm">
            <div className="lg:hidden mb-14">
              <Link
                to="/login"
                className="text-sm tracking-[0.35em] uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#C9A96E",
                }}
              >
                Snitch.
              </Link>
            </div>

            <header className="mb-12">
              <p
                className="text-[10px] uppercase tracking-[0.22em] mb-4 font-medium"
                style={{ color: "#C9A96E" }}
              >
                Welcome back
              </p>
              <h1
                className="text-[2.6rem] xl:text-5xl font-light leading-[1.1]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1b1c1a",
                }}
              >
                Sign in to Snitch
              </h1>
              <p className="mt-3 text-sm leading-6" style={{ color: "#7A6E63" }}>
                Enter your email and password to access your account.
              </p>
            </header>

            {error && (
              <p
                role="alert"
                className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </p>
            )}
            {success && (
              <p
                role="status"
                className="mb-6 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                {success}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-9">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="login-email"
                  className="text-[10px] uppercase tracking-[0.18em] font-medium"
                  style={{ color: "#7A6E63" }}
                >
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="hello@example.com"
                  className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="login-password"
                  className="text-[10px] uppercase tracking-[0.18em] font-medium"
                  style={{ color: "#7A6E63" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full bg-transparent outline-none py-3 pr-12 text-sm transition-colors duration-300"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[#7A6E63] hover:text-[#C9A96E]"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor: "#1b1c1a",
                  color: "#fbf9f6",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(event) => {
                  if (!loading) {
                    event.currentTarget.style.backgroundColor = "#C9A96E";
                    event.currentTarget.style.color = "#1b1c1a";
                  }
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.backgroundColor = "#1b1c1a";
                  event.currentTarget.style.color = "#fbf9f6";
                }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-center text-[11px]" style={{ color: "#B5ADA3" }}>
                New to Snitch?{" "}
                <Link
                  to="/register"
                  className="transition-colors duration-200"
                  style={{
                    color: "#7A6E63",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
