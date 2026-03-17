import { Search } from "lucide-react";

const selectStyle = {
  padding: "8px 12px", background: "#1a1a1a",
  border: "1px solid #252525", borderRadius: 9,
  fontSize: 12, color: "#9ca3af", cursor: "pointer",
  outline: "none", fontFamily: "inherit",
};

const defaultExpertise = [
  "Product",
  "Engineering",
  "Design",
  "Marketing",
  "Leadership",
  "Data Science",
  "Startups",
];

const defaultAvailability = [
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "away", label: "Away" },
];

export default function MentorFilters({
  search,
  setSearch,
  availability,
  setAvailability,
  expertise,
  setExpertise,
  expertiseOptions = defaultExpertise,
  availabilityOptions = defaultAvailability,
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      {/* Search */}
      <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
        <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#4b5563" }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search mentors..."
          className="glow-focus"
          style={{
            width: "100%", paddingLeft: 30, paddingRight: 12,
            ...selectStyle, color: "#f5f5f5",
          }}
        />
      </div>

      <select value={availability} onChange={e => setAvailability(e.target.value)} style={selectStyle} className="glow-focus">
        <option value="">All Availability</option>
        {availabilityOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select value={expertise} onChange={e => setExpertise(e.target.value)} style={selectStyle} className="glow-focus">
        <option value="">All Expertise</option>
        {expertiseOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}