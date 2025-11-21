import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is used for API calls
import Navbar2 from "../components/Navbar2.jsx";
import Footer from "../components/Footer.jsx";
import {
  FileText,
  AlignLeft,
  Calendar,
  MapPin,
  Tag,
  X,
  Send,
  Globe, // Added for event type
} from "lucide-react";

// --- API CONSTANTS ---
// Adjust the base URL and endpoints as necessary for your environment
// const API_BASE_URL = "http://localhost:5000/api";
const CREATE_EVENT_ENDPOINT = `/api/events`;
// Assuming your pitch API endpoint is /api/pitches based on common REST conventions
const GET_PITCHES_ENDPOINT = `/api/get-all-pitches`; 
// --- API CONSTANTS ---

function EventForm() {
  // New State for Pitches and Loading Status
  const [pitches, setPitches] = useState([]);
  const [isPitchesLoading, setIsPitchesLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pitch: "", // Will hold the pitch ID (e.g., MongoDB _id)
    event_type: "online",
    // Fields not in the provided API but for a complete form:
    eventDate: "",
    eventLocation: "",
    media: {},
  });

  const [loading, setLoading] = useState(false); // For event submission
  const [message, setMessage] = useState(null); // For submission success or error messages
  
  // 💡 EFFECT HOOK: Fetch all pitches on component mount
  useEffect(() => {
    const fetchPitches = async () => {
      try {
        setIsPitchesLoading(true);
        // Assuming no authentication header is required for this specific endpoint, 
        // or that it is handled globally by an axios interceptor.
        const response = await axios.get(GET_PITCHES_ENDPOINT);
        
        // Use response.data.data because your API response is wrapped: { data: [...] }
        setPitches(response.data.data || []);
      } catch (error) {
        console.error("Error fetching pitches:", error);
        // Set an error message if pitch loading fails
        setMessage({ type: "error", text: "Failed to load associated pitches." });
      } finally {
        setIsPitchesLoading(false);
      }
    };

    fetchPitches();
  }, []); // Empty dependency array runs once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (message) setMessage(null);
  };

  const handleMediaChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, media: { count: files.length } }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    // 1. **Data Validation**
    if (!formData.title || !formData.description || !formData.pitch) {
      setMessage({ type: "error", text: "Please fill in all required fields (Title, Description, and Pitch)." });
      setLoading(false);
      return;
    }

    // 2. **Construct API Payload**
    const payload = {
      pitch: formData.pitch,
      event_type: formData.event_type,
      title: formData.title,
      description: formData.description,
      media: formData.media,
      // NOTE: You might need to add 'pitch_user' if the backend requires it explicitly in the body.
    };

    // 3. **API Call**
    try {
      const response = await axios.post(CREATE_EVENT_ENDPOINT, payload, {
        // Add auth headers if necessary
      });

      // 4. **Handle Success**
      setMessage({ type: "success", text: response.data.message || "Event successfully published!" });
      // Reset form
      setFormData({
        title: "",
        description: "",
        pitch: "",
        event_type: "online",
        eventDate: "",
        eventLocation: "",
        media: {},
      });
    } catch (error) {
      // 5. **Handle Error**
      console.error("Event creation error:", error.response || error);
      const errorMessage = error.response?.data?.message || "Failed to publish event. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      pitch: "",
      event_type: "online",
      eventDate: "",
      eventLocation: "",
      media: {},
    });
    setMessage(null);
  };

  return (
    <div>
      <Navbar2 />

      <div className="w-full px-4 py-6 md:px-10 lg:px-32">
        <h1 className="text-2xl md:text-3xl mt-5 font-bold mb-6">
          Publish Event Publicity Post
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-4 sm:p-6 space-y-6">
            
            {/* Title Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Event Title *
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                <FileText size={20} className="text-gray-500" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  className="w-full bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Event Description *
              </label>
              <div className="flex items-start gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                <AlignLeft size={20} className="text-gray-500 mt-1" />
                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write event description..."
                  className="w-full bg-transparent outline-none resize-none"
                  required
                ></textarea>
              </div>
            </div>

            {/* Grid for Event Type, Date, Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Event Type Select */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Event Type
                    </label>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                        <Globe size={20} className="text-gray-500" />
                        <select
                            name="event_type"
                            value={formData.event_type}
                            onChange={handleChange}
                            className="w-full bg-transparent outline-none"
                        >
                            <option value="online">Online</option>
                            <option value="physical">Physical</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                </div>

                {/* Event Date Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Event Date
                    </label>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                        <Calendar size={20} className="text-gray-500" />
                        <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            className="w-full bg-transparent outline-none"
                        />
                    </div>
                </div>

                {/* Event Location Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Event Location
                    </label>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                        <MapPin size={20} className="text-gray-500" />
                        <input
                            type="text"
                            name="eventLocation"
                            value={formData.eventLocation}
                            onChange={handleChange}
                            placeholder="Enter location"
                            className="w-full bg-transparent outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Associate with Pitch Select - Updated Section */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Associate with Pitch *
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                <Tag size={20} className="text-gray-500" />
                <select
                  name="pitch"
                  value={formData.pitch}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                  required
                  disabled={isPitchesLoading} // Disable while loading
                >
                  <option value="" disabled>
                    {isPitchesLoading 
                        ? "Loading pitches..." 
                        : pitches.length === 0 
                            ? "No pitches found" 
                            : "Select an associated pitch"
                    }
                  </option>
                  
                  {/* Map over the fetched pitches */}
                  {pitches.map((pitch) => (
                    // Assuming your pitch object has a unique '_id' and a user-facing 'title'
                    <option key={pitch._id} value={pitch._id}> 
                      {pitch.title || `Pitch ID: ${pitch._id}`} 
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Media & Attachments Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Media & Attachments
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm bg-gray-50 cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  multiple
                  onChange={handleMediaChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {formData.media.count > 0 && (
                  <p className="text-sm text-gray-500 mt-1">Selected {formData.media.count} files.</p>
              )}
            </div>

            {/* Message Display (Success/Error) */}
            {message && (
              <div
                className={`p-3 rounded-lg text-sm font-medium ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                role="alert"
              >
                {message.text}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-100 transition"
                disabled={loading}
              >
                <X size={18} />
                Cancel
              </button>

              <button
                type="submit"
                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-white shadow-sm transition ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading || isPitchesLoading} // Disabled if either event or pitch fetching is loading
              >
                <Send size={18} />
                {loading ? "Publishing..." : "Publish Event"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default EventForm;