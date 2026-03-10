import { useState } from "react";
import { X, Calendar, Clock, FileText, Zap } from "lucide-react";
import { bookSession } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

export default function BookSessionModal({ mentor, onClose, onSuccess }) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    studentName: "",
    email: "",
    topic: "",
    date: "",
    time: "10:00",
    duration: 60,
    priority: "medium",
    mode: "Online",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setLoading(false);
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }

      // Validate date is in the future
      const dateValue = form.date ? new Date(`${form.date}T${form.time || "10:00"}:00`) : null;
      if (!dateValue || Number.isNaN(dateValue.getTime())) {
        setLoading(false);
        toast({
          title: "Invalid Date",
          description: "Please enter a valid date and time.",
          variant: "destructive",
        });
        return;
      }

      if (dateValue < new Date()) {
        setLoading(false);
        toast({
          title: "Invalid Date",
          description: "Session date must be in the future.",
          variant: "destructive",
        });
        return;
      }

      const datetime = dateValue.toISOString();
      const priority = form.priority
        ? `${form.priority.charAt(0).toUpperCase()}${form.priority.slice(1)}`
        : undefined;

      await bookSession({
        studentName: form.studentName,
        email: form.email,
        mentor: mentor.id,
        datetime,
        mode: form.mode,
        topic: form.topic,
        priority,
      });
      toast({
        title: "Success",
        description: `Session booked with ${mentor.name}!`,
      });
      setLoading(false);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to book session:', error);
      const message = error?.message || 'Failed to book session. Please try again.';
      toast({
        title: "Booking Failed",
        description: message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px",
    background: "#151515", border: "1px solid #2a2a2a",
    borderRadius: 9, fontSize: 13, color: "#f5f5f5",
    outline: "none", transition: "all 0.2s ease",
    fontFamily: "inherit",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          onClose();
        }
      }}
    >
      <div style={{
        background: "#1a1a1a", border: "1px solid #2a2a2a",
        borderRadius: 16, width: "100%", maxWidth: 480,
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
        animation: "fadeInUp 0.2s ease",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #212121", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5" }}>Book a Session</p>
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>with {mentor.name}</p>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }} 
            type="button"
            style={{ 
              background: "#252525", 
              border: "none", 
              borderRadius: 8, 
              width: 30, 
              height: 30, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#333333"}
            onMouseLeave={e => e.currentTarget.style.background = "#252525"}
          >
            <X size={14} color="#9ca3af" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Student */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Student Name *</label>
              <input
                required
                value={form.studentName}
                onChange={e => setForm({ ...form, studentName: e.target.value })}
                placeholder="Your name"
                style={inputStyle}
                className="glow-focus"
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                style={inputStyle}
                className="glow-focus"
              />
            </div>
          </div>

          {/* Topic */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Session Topic *</label>
            <input
              required
              value={form.topic}
              onChange={e => setForm({ ...form, topic: e.target.value })}
              placeholder="e.g. Career growth in product management"
              style={inputStyle}
              className="glow-focus"
            />
          </div>

          {/* Date & Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Date *</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                style={{ ...inputStyle, colorScheme: "dark" }}
                className="glow-focus"
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Time</label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                style={{ ...inputStyle, colorScheme: "dark" }}
                className="glow-focus"
              />
            </div>
          </div>

          {/* Duration & Priority */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Duration (min)</label>
              <select
                value={form.duration}
                onChange={e => setForm({ ...form, duration: Number(e.target.value) })}
                style={{ ...inputStyle, cursor: "pointer" }}
                className="glow-focus"
              >
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
                <option value={90}>90 min</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value })}
                style={{ ...inputStyle, cursor: "pointer" }}
                className="glow-focus"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Mode</label>
            <select
              value={form.mode}
              onChange={e => setForm({ ...form, mode: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}
              className="glow-focus"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              placeholder="Add any context or questions..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
              className="glow-focus"
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: "10px", borderRadius: 9, fontSize: 13, fontWeight: 500,
              background: "#252525", color: "#9ca3af", border: "1px solid #2a2a2a", cursor: "pointer"
            }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-lift"
              style={{
                flex: 1, padding: "10px", borderRadius: 9, fontSize: 13, fontWeight: 600,
                background: loading ? "#1e3a6e" : "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "white", border: "none", cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6
              }}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Booking...
                </>
              ) : (
                <>
                  <Zap size={13} /> Book Session
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}