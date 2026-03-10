import { useState, useEffect } from "react";
import { fetchSessions, deleteSession } from "@/services/api";
import { Calendar, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SessionRow from "@/components/sessions/SessionRow";

const tabs = ["all", "upcoming", "missed", "completed", "cancelled"];

export default function Sessions() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const load = async () => {
    setLoading(true);
    const data = await fetchSessions();
    setSessions(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = activeTab === "all" ? sessions : sessions.filter(s => s.status === activeTab);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this session?')) return;
    try {
      await deleteSession(id);
      setSessions(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Session deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Failed to delete session',
        variant: "destructive",
      });
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: 900, margin: "0 auto" }}>
      <div className="animate-fade-in" style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, color: "#4b5563", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Schedule</p>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.4px" }}>Sessions</h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{sessions.length} sessions total</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, borderBottom: "1px solid #1f1f1f", paddingBottom: 0 }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "8px 14px", fontSize: 13, fontWeight: activeTab === tab ? 600 : 400,
            color: activeTab === tab ? "#f5f5f5" : "#6b7280",
            background: "none", border: "none", cursor: "pointer",
            borderBottom: activeTab === tab ? "2px solid #3b82f6" : "2px solid transparent",
            marginBottom: -1, textTransform: "capitalize", transition: "all 0.15s ease",
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 14, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 20px", borderBottom: "1px solid #1f1f1f" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#4b5563", flex: 1, textTransform: "uppercase", letterSpacing: "0.06em" }}>Session</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em", width: 140 }}>Date / Time</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em", width: 80 }}>Priority</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em", width: 90 }}>Status</span>
          <span style={{ width: 30 }} />
        </div>

        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4b5563", fontSize: 13 }}>Loading sessions…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center" }}>
            <Calendar size={28} color="#252525" style={{ margin: "0 auto 12px" }} />
            <p style={{ color: "#6b7280", fontSize: 13 }}>No {activeTab !== "all" ? activeTab : ""} sessions</p>
          </div>
        ) : (
          filtered.map((s, i) => (
            <div key={s.id} style={{ position: "relative" }}>
              <SessionRow session={s} index={i} />
              <button
                onClick={() => handleDelete(s.id)}
                style={{
                  position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6,
                  color: "#4b5563", transition: "color 0.15s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}