import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  upcoming: { label: "Upcoming", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  soon: { label: "Starting Soon", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  missed: { label: "Missed", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  completed: { label: "Completed", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  cancelled: { label: "Cancelled", color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
};

const priorityConfig = {
  high: { color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  low: { color: "#6b7280", bg: "rgba(107,114,128,0.08)" },
};

export default function SessionRow({ session, index, onStatusChange, compact = false }) {
  const effectiveStatus = session.status === "upcoming" && session.is_soon ? "soon" : session.status;
  const st = statusConfig[effectiveStatus] || statusConfig.upcoming;
  const pr = priorityConfig[session.priority] || priorityConfig.medium;

  if (compact) {
    return (
      <div
        className="animate-fade-in"
        style={{
          animationDelay: `${index * 50}ms`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 14px",
          borderBottom: "1px solid #1f1f1f",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#1e1e1e"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0
        }}>
          {session.mentor_name?.[0] || "M"}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#f5f5f5",
            marginBottom: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {session.topic}
          </p>
          <p style={{
            fontSize: 12,
            color: "#6b7280",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            with {session.mentor_name}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 3, flexShrink: 0, alignItems: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Calendar size={11} color="#4b5563" />
            <span style={{ fontSize: 11, color: "#9ca3af" }}>
              {session.date ? format(new Date(session.date), "MMM d") : "—"}
            </span>
          </div>
          <span style={{
            display: "inline-flex",
            fontSize: 10,
            fontWeight: 500,
            color: st.color,
            background: st.bg,
            padding: "3px 8px",
            borderRadius: 20
          }}>
            {st.label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="animate-fade-in"
      style={{
        animationDelay: `${index * 50}ms`,
        display: "flex", alignItems: "center", gap: 16,
        padding: "14px 56px 14px 20px", borderBottom: "1px solid #1f1f1f",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "#1e1e1e"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: 9,
        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0
      }}>
        {session.mentor_name?.[0] || "M"}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ 
          fontSize: 13, 
          fontWeight: 500, 
          color: "#f5f5f5", 
          marginBottom: 3,
          wordWrap: "break-word",
          wordBreak: "break-word",
          lineHeight: "1.4"
        }}>
          {session.topic}
        </p>
        <p style={{ 
          fontSize: 12, 
          color: "#6b7280",
          wordWrap: "break-word",
          wordBreak: "break-word",
        }}>
          with {session.mentor_name}
        </p>
      </div>

      {/* Date & Time */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        gap: 4, 
        flexShrink: 0,
        width: 140
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Calendar size={12} color="#4b5563" />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            {session.date ? format(new Date(session.date), "MMM d") : "—"}
          </span>
        </div>
        {session.time && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={11} color="#4b5563" />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>{session.time}</span>
          </div>
        )}
      </div>

      {/* Priority dot */}
      <div style={{ width: 80, flexShrink: 0 }}>
        {session.priority && pr && (
          <span style={{
            fontSize: 10, fontWeight: 600, color: pr.color,
            background: pr.bg, padding: "3px 8px", borderRadius: 20,
            textTransform: "capitalize", display: "inline-flex"
          }}>
            {session.priority}
          </span>
        )}
      </div>

      {/* Status */}
      <div style={{ width: 90, flexShrink: 0 }}>
        {onStatusChange ? (
          <select
            value={session.status}
            onChange={(e) => onStatusChange(session.id, e.target.value)}
            style={{
              width: "100%",
              fontSize: 11, fontWeight: 500, color: st.color,
              background: st.bg, padding: "4px 10px", borderRadius: 20,
              border: "1px solid transparent", cursor: "pointer", outline: "none",
              fontFamily: "inherit",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = st.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
          >
            <option value="upcoming">Upcoming</option>
            <option value="missed" disabled>Missed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        ) : (
          <span style={{
            display: "inline-flex",
            fontSize: 11, fontWeight: 500, color: st.color,
            background: st.bg, padding: "4px 10px", borderRadius: 20
          }}>
            {st.label}
          </span>
        )}
      </div>
    </div>
  );
}