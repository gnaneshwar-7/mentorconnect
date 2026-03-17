import { useState, useEffect } from "react";
import { fetchMentors, createMentor } from "@/services/api";
import { Plus, X, Users } from "lucide-react";
import MentorCard from "@/components/mentors/MentorCard";
import MentorFilters from "@/components/mentors/MentorFilters";
import BookSessionModal from "@/components/sessions/BookSessionModal";
import { useToast } from "@/components/ui/use-toast";

const inputStyle = {
  width: "100%", padding: "10px 12px",
  background: "#151515", border: "1px solid #2a2a2a",
  borderRadius: 9, fontSize: 13, color: "#f5f5f5",
  outline: "none", fontFamily: "inherit",
  transition: "all 0.2s ease",
};

export default function Mentors() {
  const { toast } = useToast();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("");
  const [expertise, setExpertise] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [bookMentor, setBookMentor] = useState(null);
  const [form, setForm] = useState({ name: "", title: "", company: "", bio: "", expertise: "", rating: "", hourly_rate: "", availability: "available" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await fetchMentors();
    setMentors(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const expertiseOptions = Array.from(
    new Set(mentors.flatMap(m => m.expertise || []))
  ).sort((a, b) => a.localeCompare(b));
  const availabilityOptions = ["available", "busy", "away"].map((value) => ({
    value,
    label: `${value.charAt(0).toUpperCase()}${value.slice(1)}`,
  }));

  const filtered = mentors.filter(m => {
    const matchSearch = !search || m.name?.toLowerCase().includes(search.toLowerCase()) || m.company?.toLowerCase().includes(search.toLowerCase()) || m.title?.toLowerCase().includes(search.toLowerCase());
    const matchAv = !availability || m.availability === availability;
    const matchEx = !expertise || m.expertise?.includes(expertise);
    return matchSearch && matchAv && matchEx;
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    
    // Validate rating range
    const rating = parseFloat(form.rating);
    if (form.rating && (rating < 0 || rating > 5)) {
      toast({
        title: "Invalid Rating",
        description: "Rating must be between 0 and 5.",
        variant: "destructive",
      });
      return;
    }

    // Validate hourly rate
    const hourlyRate = parseFloat(form.hourly_rate);
    if (form.hourly_rate && hourlyRate < 0) {
      toast({
        title: "Invalid Rate",
        description: "Hourly rate must be a positive number.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const mentorData = {
        name: form.name.trim(),
        domain: form.title.trim() || 'General', // Frontend 'title' -> Backend 'domain'
        company: form.company.trim() || 'Independent',
        bio: form.bio.trim() || 'No bio provided',
        skills: form.expertise ? form.expertise.split(',').map(s => s.trim()).filter(Boolean) : [], // Convert comma-separated to array
        rating: rating || 5.0,
        hourly_rate: hourlyRate || 0,
        mode: form.availability === 'available' ? 'Online' : 'Offline',
        experience: 0, // Default value
        sessions: 0, // Default value
      };
      await createMentor(mentorData);
      toast({
        title: "Success",
        description: `${form.name} has been added as a mentor.`,
      });
      setShowAdd(false);
      setForm({ name: "", title: "", company: "", bio: "", expertise: "", rating: "", hourly_rate: "", availability: "available" });
      load();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Failed to create mentor',
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div className="animate-fade-in" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, color: "#4b5563", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Directory</p>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.4px" }}>Mentors</h1>
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{mentors.length} mentors available</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-lift"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "9px 16px", borderRadius: 9, fontSize: 13, fontWeight: 600,
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "white", border: "none", cursor: "pointer"
          }}
        >
          <Plus size={14} /> Add Mentor
        </button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 24 }}>
        <MentorFilters
          search={search}
          setSearch={setSearch}
          availability={availability}
          setAvailability={setAvailability}
          expertise={expertise}
          setExpertise={setExpertise}
          expertiseOptions={expertiseOptions}
          availabilityOptions={availabilityOptions}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ height: 220, background: "#1a1a1a", borderRadius: 14, border: "1px solid #252525", opacity: 0.4 }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Users size={32} color="#2a2a2a" style={{ margin: "0 auto 12px" }} />
          <p style={{ color: "#6b7280", fontSize: 14 }}>No mentors found</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {filtered.map((m, i) => (
            <MentorCard key={m.id} mentor={m} onBook={setBookMentor} delay={i * 40} />
          ))}
        </div>
      )}

      {/* Add Mentor Modal */}
      {showAdd && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16
        }} onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
          <div style={{
            background: "#1a1a1a", border: "1px solid #2a2a2a",
            borderRadius: 16, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
          }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #212121", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5" }}>Add Mentor</p>
              <button onClick={() => setShowAdd(false)} style={{ background: "#252525", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={14} color="#9ca3af" />
              </button>
            </div>
            <form onSubmit={handleAdd} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { key: "name", label: "Full Name *", placeholder: "Jane Smith", required: true },
                { key: "title", label: "Title", placeholder: "Senior Product Manager" },
                { key: "company", label: "Company", placeholder: "Google" },
                { key: "expertise", label: "Expertise (comma-separated)", placeholder: "Product, Leadership, Strategy" },
                { key: "bio", label: "Short Bio", placeholder: "10+ years in product..." },
                { key: "hourly_rate", label: "Hourly Rate ($)", placeholder: "150", type: "number", min: 0 },
                { key: "rating", label: "Rating (0–5)", placeholder: "4.8", type: "number", min: 0, max: 5, step: 0.1 },
              ].map(({ key, label, placeholder, required, type, min, max, step }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>{label}</label>
                  <input
                    required={required}
                    type={type || "text"}
                    min={min}
                    max={max}
                    step={step || (type === "number" ? "0.1" : undefined)}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={inputStyle}
                    className="glow-focus"
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6 }}>Availability</label>
                <select value={form.availability} onChange={e => setForm({ ...form, availability: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }} className="glow-focus">
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="away">Away</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button type="button" onClick={() => setShowAdd(false)} style={{ flex: 1, padding: "10px", borderRadius: 9, fontSize: 13, fontWeight: 500, background: "#252525", color: "#9ca3af", border: "1px solid #2a2a2a", cursor: "pointer" }}>Cancel</button>
                <button type="submit" disabled={saving} className="btn-lift" style={{ flex: 1, padding: "10px", borderRadius: 9, fontSize: 13, fontWeight: 600, background: saving ? "#1e3a6e" : "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {saving ? (
                    <>
                      <div className="spinner" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus size={14} /> Add Mentor
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {bookMentor && (
        <BookSessionModal mentor={bookMentor} onClose={() => setBookMentor(null)} onSuccess={load} />
      )}
    </div>
  );
}