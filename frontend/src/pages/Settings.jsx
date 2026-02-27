import { useState } from "react";
import { User, Bell, Palette, Shield, ChevronRight } from "lucide-react";

const inputStyle = {
  width: "100%", padding: "10px 12px",
  background: "#151515", border: "1px solid #2a2a2a",
  borderRadius: 9, fontSize: 13, color: "#f5f5f5",
  outline: "none", fontFamily: "inherit",
};

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

export default function Settings() {
  const [active, setActive] = useState("profile");

  return (
    <div style={{ padding: "32px", maxWidth: 900, margin: "0 auto" }}>
      <div className="animate-fade-in" style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, color: "#4b5563", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Configuration</p>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.4px" }}>Settings</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20, alignItems: "start" }}>
        {/* Sidebar nav */}
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 12, overflow: "hidden" }}>
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "11px 14px", background: active === s.id ? "rgba(59,130,246,0.08)" : "transparent",
                border: "none", borderBottom: i < sections.length - 1 ? "1px solid #1f1f1f" : "none",
                cursor: "pointer", color: active === s.id ? "#3b82f6" : "#9ca3af",
                fontSize: 13, fontWeight: active === s.id ? 500 : 400, textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              <s.icon size={14} />
              {s.label}
              {active === s.id && <ChevronRight size={12} style={{ marginLeft: "auto" }} />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 12, padding: 24 }}>
          {active === "profile" && <ProfileSettings inputStyle={inputStyle} />}
          {active === "notifications" && <NotificationSettings />}
          {active === "appearance" && <AppearanceSettings />}
          {active === "security" && <SecuritySettings inputStyle={inputStyle} />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ inputStyle }) {
  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5", marginBottom: 20 }}>Profile Settings</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { label: "Full Name", placeholder: "Your name", defaultValue: "John Doe" },
          { label: "Email", placeholder: "you@example.com", defaultValue: "john@example.com" },
          { label: "Role / Title", placeholder: "e.g. Mentee, Product Manager" },
          { label: "Bio", placeholder: "A brief description about yourself...", textarea: true },
        ].map(({ label, placeholder, defaultValue, textarea }) => (
          <div key={label}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>{label}</label>
            {textarea ? (
              <textarea rows={3} placeholder={placeholder} defaultValue={defaultValue} style={{ ...inputStyle, resize: "vertical" }} className="glow-focus" />
            ) : (
              <input placeholder={placeholder} defaultValue={defaultValue} style={inputStyle} className="glow-focus" />
            )}
          </div>
        ))}
        <div style={{ paddingTop: 4 }}>
          <button className="btn-lift" style={{ padding: "9px 20px", borderRadius: 9, fontSize: 13, fontWeight: 600, background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", border: "none", cursor: "pointer" }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [prefs, setPrefs] = useState({ email: true, reminders: true, updates: false, marketing: false });
  const items = [
    { key: "email", label: "Email Notifications", desc: "Receive session confirmations via email" },
    { key: "reminders", label: "Session Reminders", desc: "Get reminded 24h before your sessions" },
    { key: "updates", label: "Platform Updates", desc: "News about new features and improvements" },
    { key: "marketing", label: "Marketing Emails", desc: "Tips and mentorship content" },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5", marginBottom: 20 }}>Notification Preferences</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {items.map((item, i) => (
          <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < items.length - 1 ? "1px solid #1f1f1f" : "none" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5", marginBottom: 2 }}>{item.label}</p>
              <p style={{ fontSize: 12, color: "#6b7280" }}>{item.desc}</p>
            </div>
            <button
              onClick={() => setPrefs(p => ({ ...p, [item.key]: !p[item.key] }))}
              style={{
                width: 40, height: 22, borderRadius: 11, background: prefs[item.key] ? "#3b82f6" : "#2a2a2a",
                border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s ease", flexShrink: 0
              }}
            >
              <span style={{
                position: "absolute", top: 3, left: prefs[item.key] ? 21 : 3,
                width: 16, height: 16, borderRadius: "50%", background: "white",
                transition: "left 0.2s ease",
              }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5", marginBottom: 20 }}>Appearance</h2>
      <div style={{ display: "flex", gap: 12 }}>
        {["Dark", "Light", "System"].map((mode) => (
          <button key={mode} style={{
            padding: "10px 20px", borderRadius: 9, fontSize: 13, fontWeight: 500,
            background: mode === "Dark" ? "rgba(59,130,246,0.1)" : "#1a1a1a",
            border: mode === "Dark" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #2a2a2a",
            color: mode === "Dark" ? "#3b82f6" : "#9ca3af", cursor: "pointer",
          }}>
            {mode}
          </button>
        ))}
      </div>
      <p style={{ fontSize: 12, color: "#4b5563", marginTop: 12 }}>Currently showing dark mode (default)</p>
    </div>
  );
}

function SecuritySettings({ inputStyle }) {
  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5", marginBottom: 20 }}>Security</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { label: "Current Password", placeholder: "••••••••" },
          { label: "New Password", placeholder: "••••••••" },
          { label: "Confirm New Password", placeholder: "••••••••" },
        ].map(({ label, placeholder }) => (
          <div key={label}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>{label}</label>
            <input type="password" placeholder={placeholder} style={inputStyle} className="glow-focus" />
          </div>
        ))}
        <button className="btn-lift" style={{ alignSelf: "flex-start", padding: "9px 20px", borderRadius: 9, fontSize: 13, fontWeight: 600, background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", border: "none", cursor: "pointer" }}>
          Update Password
        </button>
      </div>
    </div>
  );
}