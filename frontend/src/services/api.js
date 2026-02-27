const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('auth_token');

// Set auth token in localStorage
const setAuthToken = (token) => localStorage.setItem('auth_token', token);

// Remove auth token from localStorage
const removeAuthToken = () => localStorage.removeItem('auth_token');

// Get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Transform backend mentor data to frontend format
const transformMentor = (mentor) => ({
  id: mentor._id,
  name: mentor.name,
  title: mentor.domain,  // Backend: domain -> Frontend: title
  company: mentor.company || `${mentor.experience}+ years exp.`,  // Fallback to experience
  expertise: mentor.skills || [],  // Backend: skills -> Frontend: expertise
  rating: mentor.rating,
  sessions_completed: mentor.sessions || 0,
  avatar_url: mentor.avatar_url || null,
  availability: mentor.mode === 'Online' ? 'available' : mentor.mode === 'Offline' ? 'busy' : 'available',  // Backend: mode -> Frontend: availability
  ...mentor  // Keep original data as fallback
});

// Transform backend session data
const transformSession = (session) => {
  const mentorName = session.mentor?.name || session.mentor_name || 'Unknown';
  const mentorId = session.mentor?._id || session.mentor;
  const rawStatus = (session.status || 'Scheduled').toLowerCase();
  const normalizedStatus = rawStatus === 'scheduled' ? 'upcoming' : rawStatus;

  return {
    id: session._id,
    mentor_id: mentorId,
    mentor_name: mentorName,
    student_name: session.studentName,
    email: session.email,
    topic: session.topic,
    date: session.datetime,
    time: session.datetime ? new Date(session.datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null,
    status: normalizedStatus,
    priority: (session.priority || 'medium').toLowerCase(),
    mode: session.mode,
    ...session
  };
};

// Fetch all mentors
export const fetchMentors = async () => {
  try {
    console.log('🔍 Fetching mentors from:', `${API_BASE_URL}/mentors`);
    const response = await fetch(`${API_BASE_URL}/mentors`);
    console.log('📡 Response status:', response.status);
    if (!response.ok) throw new Error('Failed to fetch mentors');
    const data = await response.json();
    console.log('📦 Raw data received:', data);
    const transformed = Array.isArray(data) ? data.map(transformMentor) : [];
    console.log('✨ Transformed mentors:', transformed);
    return transformed;
  } catch (error) {
    console.error('❌ Error fetching mentors:', error);
    return [];
  }
};

// Fetch all sessions
export const fetchSessions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions`);
    if (!response.ok) throw new Error('Failed to fetch sessions');
    const data = await response.json();
    return Array.isArray(data) ? data.map(transformSession) : [];
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return [];
  }
};

// Book a session
export const bookSession = async (sessionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData),
    });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const details = Array.isArray(errorBody?.errors) ? `: ${errorBody.errors.join(", ")}` : "";
      const message = (errorBody?.message || errorBody?.error || 'Failed to book session') + details;
      throw new Error(message);
    }
    return await response.json();
  } catch (error) {
    console.error('Error booking session:', error);
    throw error;
  }
};

// Create a new mentor
export const createMentor = async (mentorData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mentors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mentorData),
    });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const details = Array.isArray(errorBody?.errors) ? `: ${errorBody.errors.join(", ")}` : "";
      const message = (errorBody?.message || errorBody?.error || 'Failed to create mentor') + details;
      throw new Error(message);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating mentor:', error);
    throw error;
  }
};

// Delete a session
export const deleteSession = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete session');
    return await response.json();
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
};

// Update a session
export const updateSession = async (sessionId, sessionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData),
    });
    if (!response.ok) throw new Error('Failed to update session');
    return await response.json();
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
};

// ==================== AUTH API ====================

// Register new user
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data.message || data.error || 'Registration failed';
      throw new Error(message);
    }
    // Store token
    if (data.data?.token) {
      setAuthToken(data.data.token);
    }
    return data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data.message || data.error || 'Login failed';
      throw new Error(message);
    }
    // Store token
    if (data.data?.token) {
      setAuthToken(data.data.token);
    }
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Logout user
export const logout = () => {
  removeAuthToken();
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = getAuthToken();
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      // If token is invalid, remove it
      if (response.status === 401) {
        removeAuthToken();
      }
      return null;
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    removeAuthToken();
    return null;
  }
};

export { getAuthToken, setAuthToken, removeAuthToken, getAuthHeaders };

// Fetch mentor by ID
export const fetchMentorById = async (mentorId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mentors/${mentorId}`);
    if (!response.ok) throw new Error('Failed to fetch mentor');
    return await response.json();
  } catch (error) {
    console.error('Error fetching mentor:', error);
    return null;
  }
};
