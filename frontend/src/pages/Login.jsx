import { useRef, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Mail, Lock, UserPlus } from "lucide-react";

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const formRef = useRef(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);

      if (window.PasswordCredential && navigator.credentials?.store && formRef.current) {
        try {
          const credential = new window.PasswordCredential(formRef.current);
          await navigator.credentials.store(credential);
        } catch {
          // Ignore browser password manager failures and continue login flow.
        }
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
        duration: 2500,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password.",
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
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <LogIn size={28} color="white" />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f5f5f5", marginBottom: 8 }}>Welcome Back</h1>
          <p style={{ fontSize: 14, color: "#6b7280" }}>Sign in to your MentorConnect account</p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} autoComplete="on" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ position: "relative" }}>
            <Mail size={16} color="#6b7280" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
            <input
              required
              name="username"
              type="email"
              placeholder="Email address"
              autoComplete="username"
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
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
              className="glow-focus"
            />
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
              background: loading ? "#1e3a6e" : "linear-gradient(135deg, #3b82f6, #2563eb)",
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
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={16} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "32px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
          <span style={{ fontSize: 12, color: "#6b7280" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
        </div>

        {/* Register Link */}
        <button
          onClick={() => navigate("/register")}
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
          <UserPlus size={16} />
          Create New Account
        </button>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280", marginTop: 24 }}>
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
