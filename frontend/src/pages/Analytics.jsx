import { useState, useEffect } from "react";
import { fetchSessions, fetchMentors } from "@/services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Calendar, Award } from "lucide-react";
import StatCard from "@/components/ui/StatCard";

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 8, padding: "8px 12px" }}>
        <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ fontSize: 13, fontWeight: 600, color: p.color || p.fill || "#3b82f6" }}>{p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [sessions, setSessions] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchSessions(),
      fetchMentors(),
    ]).then(([s, m]) => {
      setSessions(s);
      setMentors(m);
      setLoading(false);
    });
  }, []);

  // Build monthly data
  const monthlyData = (() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts = Array(12).fill(0);
    sessions.forEach(s => {
      if (s.date) {
        const m = new Date(s.date).getMonth();
        counts[m]++;
      }
    });
    return months.slice(0, new Date().getMonth() + 1).map((m, i) => ({ month: m, sessions: counts[i] }));
  })();

  // Status breakdown
  const statusData = [
    { name: "Upcoming", value: sessions.filter(s => s.status === "upcoming").length },
    { name: "Completed", value: sessions.filter(s => s.status === "completed").length },
    { name: "Cancelled", value: sessions.filter(s => s.status === "cancelled").length },
  ].filter(d => d.value > 0);

  // Top mentors by sessions
  const mentorStats = (() => {
    const counts = {};
    sessions.forEach(s => { if (s.mentor_name) counts[s.mentor_name] = (counts[s.mentor_name] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name: name.split(" ")[0], count }));
  })();

  const upcoming = sessions.filter(s => s.status === "upcoming").length;
  const completed = sessions.filter(s => s.status === "completed").length;

  return (
    <div style={{ padding: "32px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="animate-fade-in" style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, color: "#4b5563", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Insights</p>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.4px" }}>Analytics</h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Track your mentorship progress over time.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
        <StatCard icon={Users} label="Total Mentors" value={mentors.length} change="" accent="blue" />
        <StatCard icon={Calendar} label="Total Sessions" value={sessions.length} change="" accent="purple" />
        <StatCard icon={TrendingUp} label="Upcoming" value={upcoming} change="" accent="green" />
        <StatCard icon={Award} label="Completed" value={completed} change="" accent="amber" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Sessions over time */}
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f5", marginBottom: 16 }}>Sessions Over Time</p>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#2a2a2a" tick={{ fontSize: 11, fill: "#6b7280" }} />
                <YAxis stroke="#2a2a2a" tick={{ fontSize: 11, fill: "#6b7280" }} />
                <Tooltip content={<CustomTooltip active={false} payload={[]} label="" />} />
                <Line type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", color: "#4b5563", fontSize: 13 }}>No data yet</div>
          )}
        </div>

        {/* Status breakdown */}
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f5", marginBottom: 16 }}>Session Status</p>
          {statusData.length > 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60}>
                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {statusData.map((d, i) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i], flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>{d.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#f5f5f5", marginLeft: "auto" }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", color: "#4b5563", fontSize: 13 }}>No data yet</div>
          )}
        </div>
      </div>

      {/* Top mentors */}
      {mentorStats.length > 0 && (
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f5", marginBottom: 16 }}>Top Mentors by Sessions</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={mentorStats} barSize={32}>
              <XAxis dataKey="name" stroke="#2a2a2a" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <YAxis stroke="#2a2a2a" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <Tooltip content={<CustomTooltip active={false} payload={[]} label="" />} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}