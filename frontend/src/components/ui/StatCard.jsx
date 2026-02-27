export default function StatCard({ icon: Icon, label, value, change, accent, delay = 0 }) {
  const colors = {
    blue: { bg: "rgba(59,130,246,0.08)", icon: "#3b82f6", glow: "rgba(59,130,246,0.15)" },
    purple: { bg: "rgba(139,92,246,0.08)", icon: "#8b5cf6", glow: "rgba(139,92,246,0.15)" },
    green: { bg: "rgba(16,185,129,0.08)", icon: "#10b981", glow: "rgba(16,185,129,0.15)" },
    amber: { bg: "rgba(245,158,11,0.08)", icon: "#f59e0b", glow: "rgba(245,158,11,0.15)" },
  };
  const c = colors[accent] || colors.blue;

  return (
    <div
      className="animate-fade-in card-hover"
      style={{
        animationDelay: `${delay}ms`,
        background: "#1a1a1a",
        border: "1px solid #252525",
        borderRadius: 14,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 400 }}>{label}</span>
        <div style={{
          width: 34, height: 34, borderRadius: 9, background: c.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 12px ${c.glow}`
        }}>
          <Icon size={16} color={c.icon} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.5px", lineHeight: 1 }}>
          {value}
        </span>
        {change && (
          <span style={{
            fontSize: 11, fontWeight: 500,
            color: change.startsWith("+") ? "#10b981" : "#ef4444",
            background: change.startsWith("+") ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
            padding: "3px 7px", borderRadius: 20
          }}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}