import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/lib/AuthContext";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Zap,
  Menu,
  X,
  LogOut,
  User as UserIcon
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { label: "Mentors", icon: Users, page: "Mentors" },
  { label: "Sessions", icon: Calendar, page: "Sessions" },
  { label: "Analytics", icon: BarChart3, page: "Analytics" },
  { label: "Settings", icon: Settings, page: "Settings" },
];

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .nav-link { transition: all 0.15s ease; }
        .nav-link:hover { background: #1e1e1e; color: #f5f5f5; }
        .nav-link.active { background: rgba(59,130,246,0.1); color: #3b82f6; }
        .nav-link.active .nav-icon { color: #3b82f6; }
        .search-input:focus { outline: none; border-color: rgba(59,130,246,0.5) !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.08); }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "#111111",
          borderRight: "1px solid #1f1f1f",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 30,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }}
        className="lg:translate-x-0 lg:static lg:transform-none"
      >
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid #1f1f1f" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Zap size={16} color="white" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5", letterSpacing: "-0.3px" }}>
              MentorConnect
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 12px", flex: 1, overflowY: "auto" }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: "#4b5563", letterSpacing: "0.08em", textTransform: "uppercase", padding: "8px 8px 12px" }}>
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className="nav-link"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 10px", borderRadius: 8, marginBottom: 2,
                  textDecoration: "none",
                  color: isActive ? "#3b82f6" : "#9ca3af",
                  background: isActive ? "rgba(59,130,246,0.08)" : "transparent",
                  fontSize: 14, fontWeight: isActive ? 500 : 400,
                }}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={16} className="nav-icon" style={{ color: isActive ? "#3b82f6" : "#6b7280" }} />
                {item.label}
                {isActive && <ChevronRight size={12} style={{ marginLeft: "auto", color: "#3b82f6" }} />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "16px", borderTop: "1px solid #1f1f1f" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 10, 
            padding: "8px 10px", 
            borderRadius: 8, 
            background: "#1a1a1a",
            marginBottom: 8
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 600, color: "white"
            }}>
              {getUserInitials()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: "#f5f5f5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.name || 'User'}
              </p>
              <p style={{ fontSize: 11, color: "#6b7280", textTransform: "capitalize" }}>
                {user?.role || 'Student'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "8px",
              borderRadius: 8,
              background: "#1e1e1e",
              border: "1px solid #252525",
              color: "#9ca3af",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#252525";
              e.currentTarget.style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1e1e1e";
              e.currentTarget.style.color = "#9ca3af";
            }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, marginLeft: 0 }} className="lg:ml-60">
        {/* Top bar */}
        <header style={{
          height: 56, background: "rgba(15,15,15,0.9)",
          borderBottom: "1px solid #1f1f1f",
          display: "flex", alignItems: "center",
          padding: "0 24px", gap: 16,
          position: "sticky", top: 0, zIndex: 10,
          backdropFilter: "blur(12px)",
        }}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", padding: 4 }}
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 360, position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#4b5563" }} />
            <input
              placeholder="Search mentors, sessions..."
              className="search-input"
              style={{
                width: "100%", paddingLeft: 32, paddingRight: 12, height: 34,
                background: "#1a1a1a", border: "1px solid #252525",
                borderRadius: 8, fontSize: 13, color: "#f5f5f5",
                transition: "all 0.2s ease",
              }}
            />
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            {/* Notification */}
            <button style={{
              width: 34, height: 34, borderRadius: 8, background: "#1a1a1a",
              border: "1px solid #252525", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", position: "relative"
            }}>
              <Bell size={15} color="#9ca3af" />
              <span style={{
                position: "absolute", top: 7, right: 7, width: 6, height: 6,
                background: "#3b82f6", borderRadius: "50%"
              }} />
            </button>

            {/* User avatar */}
            <div style={{ position: "relative" }} ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "white", cursor: "pointer",
                  border: "none"
                }}
              >
                {getUserInitials()}
              </button>
              
              {/* User dropdown menu */}
              {showUserMenu && (
                <div style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  width: 200,
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 12,
                  padding: 8,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  zIndex: 50,
                }}>
                  <div style={{ padding: "12px", borderBottom: "1px solid #252525", marginBottom: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f5", marginBottom: 4 }}>
                      {user?.name || 'User'}
                    </p>
                    <p style={{ fontSize: 11, color: "#6b7280" }}>
                      {user?.email || ''}
                    </p>
                    <span style={{
                      display: "inline-block",
                      marginTop: 8,
                      padding: "4px 8px",
                      borderRadius: 6,
                      background: "rgba(59,130,246,0.1)",
                      color: "#3b82f6",
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      {user?.role || 'student'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 12px",
                      borderRadius: 8,
                      background: "transparent",
                      border: "none",
                      color: "#9ca3af",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#252525";
                      e.currentTarget.style.color = "#ef4444";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#9ca3af";
                    }}
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}