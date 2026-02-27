import { Star, Clock, Briefcase, ExternalLink } from "lucide-react";

const availabilityConfig = {
  available: { label: "Available", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  busy: { label: "Busy", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  away: { label: "Away", color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
};

export default function MentorCard({ mentor, onBook, delay = 0 }) {
  const av = availabilityConfig[mentor.availability || "available"];

  return (
    <div
      className="animate-fade-in card-hover"
      style={{
        animationDelay: `${delay}ms`,
        background: "#1a1a1a",
        border: "1px solid #252525",
        borderRadius: 14,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        cursor: "default",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          {mentor.avatar_url ? (
            <img
              src={mentor.avatar_url}
              alt={mentor.name}
              style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover", border: "2px solid #252525" }}
            />
          ) : (
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 700, color: "white"
            }}>
              {mentor.name?.[0] || "M"}
            </div>
          )}
          <span style={{
            position: "absolute", bottom: -3, right: -3,
            width: 12, height: 12, borderRadius: "50%",
            background: av.color, border: "2px solid #1a1a1a"
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f5", marginBottom: 2 }}>{mentor.name}</p>
          <p style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {mentor.title}
          </p>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 600, color: av.color,
          background: av.bg, padding: "3px 8px", borderRadius: 20, flexShrink: 0
        }}>
          {av.label}
        </span>
      </div>

      {/* Company */}
      {mentor.company && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Briefcase size={12} color="#4b5563" />
          <span style={{ fontSize: 12, color: "#6b7280" }}>{mentor.company}</span>
        </div>
      )}

      {/* Tags */}
      {mentor.expertise?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {mentor.expertise.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontSize: 11, color: "#8b9cf4", background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.15)", padding: "3px 8px", borderRadius: 20
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Star size={12} color="#f59e0b" fill="#f59e0b" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#f5f5f5" }}>{mentor.rating?.toFixed(1) || "—"}</span>
          </div>
          <span style={{ width: 1, height: 12, background: "#2a2a2a" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={11} color="#4b5563" />
            <span style={{ fontSize: 12, color: "#6b7280" }}>{mentor.sessions_completed || 0} sessions</span>
          </div>
        </div>
        <button
          onClick={() => onBook(mentor)}
          className="btn-lift"
          style={{
            padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
            background: "rgba(59,130,246,0.12)", color: "#3b82f6",
            border: "1px solid rgba(59,130,246,0.2)", cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.background = "rgba(59,130,246,0.2)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.background = "rgba(59,130,246,0.12)";
          }}
        >
          Book Session
        </button>
      </div>
    </div>
  );
}