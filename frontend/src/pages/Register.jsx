import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Mail, Lock, User, LogIn } from "lucide-react";

export default function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      toast({
        title: "Account Created!",
        description: "Welcome to MentorConnect. Let's get started!",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    paddingLeft: "44px",
    background: "#151515",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    fontSize: 14,
    color: "#f5f5f5",
    outline: "none",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  };

  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0f0f0f"
      }}>
        <div className="spinner" style={{ width: 32, height: 32 }} />
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: 20,
      background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 420,
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        borderRadius: 20,
        padding: "40px 36px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
      }} className="animate-fade-in">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 64,
            height: 64,
            margin: "0 auto 16px",
            background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <UserPlus size={28} color="white" />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f5f5f5", marginBottom: 8 }}>Create Account</h1>
          <p style={{ fontSize: 14, color: "#6b7280" }}>Join MentorConnect and start learning</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ position: "relative" }}>
            <User size={16} color="#6b7280" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
            <input
              required
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
              className="glow-focus"
            />
          </div>

          <div style={{ position: "relative" }}>
            <Mail size={16} color="#6b7280" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
            <input
              required
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              className="glow-focus"
            />
          </div>

          <div style={{ position: "relative" }}>
            <Lock size={16} color="#6b7280" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
            <input
              required
              type="password"
              placeholder="Password (min 6 characters)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
              className="glow-focus"
              minLength={6}
            />
          </div>

          <div style={{ position: "relative" }}>
            <Lock size={16} color="#6b7280" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
            <input
              required
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              style={inputStyle}
              className="glow-focus"
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 8 }}>
              Register as
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={{
                ...inputStyle,
                paddingLeft: "16px",
                cursor: "pointer",
              }}
              className="glow-focus"
            >
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-lift"
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              background: loading ? "#1e3a6e" : "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              color: "white",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 8,
            }}
          >
            {loading ? (
              <>
                <div className="spinner" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus size={16} />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
          <span style={{ fontSize: 12, color: "#6b7280" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
        </div>

        {/* Login Link */}
        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            background: "#252525",
            color: "#9ca3af",
            border: "1px solid #2a2a2a",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2a2a2a";
            e.currentTarget.style.color = "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#252525";
            e.currentTarget.style.color = "#9ca3af";
          }}
        >
          <LogIn size={16} />
          Sign In Instead
        </button>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280", marginTop: 24 }}>
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
