import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

import { registerUser } from "../services/authService";
import { useToast } from "../context/ToastContext";
import { useLoading } from "../context/LoadingContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { showSuccess, showError } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const checkPasswordStrength = (pwd) => {
    if (!pwd) return "";

    let strength = 0;

    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    if (strength <= 1) return "Weak";
    if (strength <= 3) return "Medium";

    return "Strong";
  };

  const passwordStrength =
    checkPasswordStrength(password);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      startLoading();

      const res = await registerUser({
        name,
        email,
        password,
      });

      showSuccess(
        res.message || "Account created successfully"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      showError(
        err.response?.message ||
          "Something went wrong"
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
              powered by AI and crafted for your unique goals.
            </p>
          </div>

          <div className="space-y-3 text-[14px] text-stone-300">
            <div>✦ Personalized gemstone insights</div>
            <div>✦ AI-generated recommendations</div>
            <div>✦ Recommendation history tracking</div>
            <div>✦ Premium astrology experience</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md">
          
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-800">
              Create Account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Start your journey with GemAura AI.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-1"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <div className="flex items-center rounded-xl border border-stone-300 px-4 transition focus-within:border-amber-600">
                <User size={18} className="text-stone-400" />

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent px-3 py-2.5 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-stone-300 px-4 transition focus-within:border-amber-600">
                <Mail size={18} className="text-stone-400" />

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-transparent px-3 py-2.5 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-stone-300 px-4 transition focus-within:border-amber-600">
                <Lock size={18} className="text-stone-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="w-full bg-transparent px-3 py-2.5 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone-500 hover:text-slate-700 transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {password && (
                <div className="mt-2">
                  <div className="h-1.5 overflow-hidden rounded-full bg-stone-200">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength === "Weak"
                          ? "w-1/3 bg-red-500"
                          : passwordStrength === "Medium"
                          ? "w-2/3 bg-yellow-500"
                          : "w-full bg-emerald-500"
                      }`}
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Password Strength:
                    <span className="ml-1 font-medium">
                      {passwordStrength}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-amber-700 py-2.5 font-medium text-white transition hover:bg-amber-800"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-500">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-2 cursor-pointer font-medium text-amber-700 hover:text-amber-800"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
);
  
};

export default Register;

