import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useLoading } from "../context/LoadingContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      startLoading("Authenticating...");

      const res = await loginUser({
        email,
        password,
      });

      if (!res?.token || !res?.user) {
        throw new Error("Invalid response from server");
      }

      showSuccess("Welcome back to GemAura");

      login(res.token, res.user);
    } catch (err) {
      showError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid email or password"
      );
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="h-[87.5vh] w-full overflow-hidden bg-[#FCFBF8] px-6 py-4 flex items-center justify-center">
      <div className="grid h-full max-h-[700px] w-full max-w-5xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm md:grid-cols-2">

        <div className="relative hidden overflow-hidden md:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900" />

          <div className="absolute right-[-120px] top-[-120px] h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="absolute left-[-80px] bottom-[-80px] h-48 w-48 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 lg:p-10 text-white">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs backdrop-blur">
                <Sparkles size={14} />
                AI-Powered Recommendations
              </div>

              <h1
                className="mt-6 text-4xl lg:text-5xl font-bold"
                style={{
                  fontFamily: "Playfair Display, serif",
                }}
              >
                GemAura
              </h1>

              <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-300">
                Discover personalized gemstone recommendations
                powered by AI and crafted using ancient wisdom
                and modern intelligence.
              </p>
            </div>

            <div className="space-y-3 text-[14px] text-stone-300">
              <div>✦ Personalized Gemstone Recommendations</div>
              <div>✦ AI-Powered Spiritual Insights</div>
              <div>✦ Recommendation History Tracking</div>
              <div>✦ Premium Astrology Experience</div>
            </div>

            <div className="text-sm text-stone-400">
              Trusted by seekers discovering the perfect gemstone.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">

            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800">
                Welcome Back
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sign in to continue your gemstone journey.
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <div className="flex items-center rounded-xl border border-stone-300 px-4 transition focus-within:border-amber-600">
                  <Mail
                    size={18}
                    className="text-stone-400"
                  />

                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-transparent px-3 py-2.5 outline-none"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-stone-300 px-4 transition focus-within:border-amber-600">
                  <Lock
                    size={18}
                    className="text-stone-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter password"
                    className="w-full bg-transparent px-3 py-2.5 outline-none"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="text-stone-500 hover:text-slate-700 transition"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() =>
                      setRememberMe(!rememberMe)
                    }
                    className="accent-amber-700"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                  className="font-medium text-amber-700 hover:text-amber-800"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-amber-700 py-2.5 font-medium text-white transition-all duration-300 hover:bg-amber-800"
              >
                Sign In
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
              Don't have an account?
              <span
                onClick={() =>
                  navigate("/register")
                }
                className="ml-2 cursor-pointer font-medium text-amber-700 hover:text-amber-800"
              >
                Create Account
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
