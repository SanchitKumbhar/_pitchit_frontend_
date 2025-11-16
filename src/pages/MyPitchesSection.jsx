import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaEye,
  FaSpinner, // Added for loading
} from "react-icons/fa";
import { Link } from "react-router-dom";

// A simple utility to format the date (you can replace this with a library like date-fns)
const formatActivityDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MyPitchesSection = () => {
  // --- State Management ---
  // Store pitches from the API
  const [pitches, setPitches] = useState([]);
  // Handle loading state while fetching
  const [isLoading, setIsLoading] = useState(true);
  // Handle any errors during the fetch
  const [error, setError] = useState(null);
  // Store the search term
  const [searchTerm, setSearchTerm] = useState("");

  // --- Data Fetching ---
  useEffect(() => {
    // Define the async function to fetch data
    const fetchMyPitches = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // IMPORTANT: Replace '/api/my-pitches' with the actual route 
        // you've configured in your Express router for the 'get_all_pitches' controller.
        const response = await fetch("/api/get-all-pitches");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch pitches");
        }

        const result = await response.json();
        
        // Your API returns data in a { data: [...] } object
        setPitches(result.data); 

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the fetch function when the component mounts
    fetchMyPitches();
  }, []); // Empty dependency array means this runs once on mount

  // --- Filtering Logic ---
  // Filter pitches based on the search term
  const filteredPitches = pitches.filter(
    (pitch) =>
      pitch.pitchTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pitch.fullDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Render Logic ---

  // 1. Handle Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        <span className="ml-4 text-xl text-gray-700">Loading Pitches...</span>
      </div>
    );
  }

  // 2. Handle Error State
  if (error) {
    return (
      <div className="p-10 text-center">
        <h3 className="text-2xl font-semibold text-red-600">
          Error loading pitches
        </h3>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  // 3. Handle Empty State
  const renderEmptyState = () => (
     <div className="text-center col-span-1 sm:col-span-2 lg:col-span-3 py-16 px-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800">No pitches found.</h3>
        <p className="text-gray-500 mt-2 mb-4">
          {searchTerm 
            ? "Try adjusting your search." 
            : "Get started by creating your first pitch!"}
        </p>
        {!searchTerm && (
           <Link 
              to="/create-pitch"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
            >
             <FaPlus />
             <span>Create New Pitch</span>
           </Link>
        )}
     </div>
  );

  // 4. Render Main Content
  return (
    <div className="p-4 sm:p-6 md:p-10 lg:px-25 w-full mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        My Pitches
      </h2>

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        {/* Search Field */}
        <div className="relative w-full md:w-[40%]">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search Pitches by title or summary..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Create Buttons */}
        <div className="flex gap-3 w-full md:w-auto">
          <Link
            to="/create-post"
            className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 w-full md:w-auto"
          >
            <FaPlus />
            <span>Create Post</span>
          </Link>
          <Link
            to="/create-pitch"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto"
          >
            <FaPlus />
            <span>Create New Pitch</span>
          </Link>
        </div>
      </div>

      {/* Pitch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPitches.length > 0 
          ? filteredPitches.map((pitch) => (
              <div
                // Use pitch._id from MongoDB as the key
                key={pitch._id}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between border border-gray-200"
              >
                {/* Row 1: Title + Visibility */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {/* Data from Schema: pitchTitle */}
                    {pitch.pitchTitle}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      // Data from Schema: categorization.privacy
                      pitch.categorization.privacy === "Public"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {pitch.categorization.privacy}
                  </span>
                </div>

                {/* Row 2: Description */}
                {/* NOTE: Upvotes and Members were removed as they are not in your Mongoose Schema. */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {/* Data from Schema: fullDescription */}
                    {pitch.fullDescription}
                  </p>
                </div>

                {/* Row 3: Actions + Activity */}
                <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <FaEdit /> Edit Pitch
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <FaEye /> View Details
                    </button>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {/* Data from Schema: updatedAt (from timestamps: true) */}
                    {formatActivityDate(pitch.updatedAt)}
                  </span>
                </div>
              </div>
            ))
          : renderEmptyState() // Show empty state if no pitches match
        }
      </div>
    </div>
  );
};

export default MyPitchesSection;