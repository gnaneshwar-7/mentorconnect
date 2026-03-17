import { useState, useEffect } from "react";
import { fetchMentors, fetchSessions } from "@/services/api";
import { Users, Calendar, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import StatCard from "@/components/ui/StatCard";
import MentorCard from "@/components/mentors/MentorCard";
import SessionRow from "@/components/sessions/SessionRow";
import BookSessionModal from "@/components/sessions/BookSessionModal";

export default function Dashboard() {
  const [mentors, setMentors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    console.log('🚀 Dashboard: Starting to load data...');
    setLoading(true);
    const [m, s] = await Promise.all([
      fetchMentors(),
      fetchSessions(),
    ]);
    console.log('📊 Dashboard: Mentors received:', m);
    console.log('📊 Dashboard: Sessions received:', s);
    setMentors(m);
    setSessions(s);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upcoming = sessions.filter(s => s.status === "upcoming").length;
  const completed = sessions.filter(s => s.status === "completed").length;

  return (
    <div style={{ padding: "32px 32px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Page header */}
      <div className="animate-fade-in" style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, color: "#4b5563", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
          Overview
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.5px" }}>
          Your Mentorship Dashboard 🚀
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
          Connect with expert mentors and accelerate your career growth.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 36 }}>
        <StatCard icon={Users} label="Total Mentors" value={mentors.length} change="+3 this week" accent="blue" delay={0} />
        <StatCard icon={Calendar} label="Sessions Booked" value={sessions.length} change="+2 today" accent="purple" delay={50} />
        <StatCard icon={Zap} label="Upcoming Sessions" value={upcoming} change="" accent="green" delay={100} />
        <StatCard icon={TrendingUp} label="Completed" value={completed} change="↑ 12%" accent="amber" delay={150} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}>
        {/* Mentors Discovery */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5" }}>Featured Mentors</h2>
            <Link to={createPageUrl("Mentors")} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#3b82f6", textDecoration: "none" }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ height: 200, background: "#1a1a1a", borderRadius: 14, border: "1px solid #252525", opacity: 0.5 }} />
              ))}
            </div>
          ) : mentors.length === 0 ? (
            <EmptyMentors />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {mentors.map((m, i) => (
                <MentorCard key={m.id} mentor={m} onBook={setSelectedMentor} delay={i * 60} />
              ))}
            </div>
          )}
        </div>

        {/* Sessions */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5" }}>Recent Sessions</h2>
            <Link to={createPageUrl("Sessions")} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#3b82f6", textDecoration: "none" }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 14, overflow: "hidden" }}>
            {loading ? (
              <div style={{ padding: 20, color: "#4b5563", fontSize: 13 }}>Loading…</div>
            ) : sessions.length === 0 ? (
              <EmptySessions />
            ) : (
              sessions.map((s, i) => <SessionRow key={s.id} session={s} index={i} compact />)
            )}
          </div>
        </div>
      </div>

      {selectedMentor && (
        <BookSessionModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
          onSuccess={load}
        />
      )}
    </div>
  );
}

function EmptyMentors() {
  return (
    <div style={{
      border: "1px dashed #252525", borderRadius: 14, padding: 32,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center"
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Users size={18} color="#3b82f6" />
      </div>
      <p style={{ fontSize: 13, fontWeight: 500, color: "#9ca3af" }}>No mentors yet</p>
      <p style={{ fontSize: 12, color: "#4b5563" }}>Add mentors on the Mentors page</p>
      <Link to={createPageUrl("Mentors")} style={{
        marginTop: 4, padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 500,
        background: "rgba(59,130,246,0.1)", color: "#3b82f6",
        border: "1px solid rgba(59,130,246,0.2)", textDecoration: "none"
      }}>
        Go to Mentors
      </Link>
    </div>
  );
}

function EmptySessions() {
  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
      <Calendar size={20} color="#4b5563" />
      <p style={{ fontSize: 13, color: "#6b7280" }}>No sessions yet</p>
      <p style={{ fontSize: 12, color: "#4b5563" }}>Book your first session with a mentor</p>
    </div>
  );
}