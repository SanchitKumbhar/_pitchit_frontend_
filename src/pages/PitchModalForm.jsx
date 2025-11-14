  import React, { useState } from "react";
  import { FaTimes } from "react-icons/fa";
  import Navbar2 from "../components/Navbar2";
  import Footer from "../components/Footer";



  // TeamDetails component remains the same, but we need to pass the change handler for the toggle
  const TeamDetails = ({
    selectedRoles,
    toggleRole,
    lookingForMembers,
    handleCheckboxChange,
    handleInputChange,
    inviteUsersValue,
  }) => {
    const roles = [
      "Backend Developer", "Frontend Developer", "UI/UX Designer",
      "Marketing Specialist", "Business Analyst", "Product Manager",
      "Data Scientist", "Sales Executive",
    ];

    return (
      <section className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex-1 h-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Team Details</h2>
        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Looking for team members?</span>
            <label className="relative inline-flex items-center cursor-pointer">
              {/* ✅ UPDATED: Connected to state */}
              <input
                type="checkbox"
                name="lookingForMembers"
                className="sr-only peer"
                checked={lookingForMembers}
                onChange={handleCheckboxChange}
              />
              <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          {/* This section will only show if the user is looking for members */}
          {lookingForMembers && (
            <div>
              <p className="mb-4 text-gray-600">Team Roles Required</p>
              <div className="grid grid-cols-2 gap-2 text-xs mb-6">
                {roles.map((role) => {
                  const isSelected = selectedRoles.includes(role);
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`border px-3 py-2 rounded-md transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500"
                          : "text-blue-500 border-gray-300"
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-600 mb-1">
              Invite Specific Users (Optional)
            </label>
            {/* ✅ UPDATED: Connected to state */}
            <input
              type="text"
              name="inviteUsers"
              placeholder="Enter comma-separated usernames"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={inviteUsersValue}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>
    );
  };


  const PitchModalForm = () => {
    // ✅ ADDED: State for all form fields
    const [formData, setFormData] = useState({
      pitchTitle: "",
      tagline: "",
      fullDescription: "",
      lookingForMembers: true,
      inviteUsers: "",
      category: "",
      privacy: "Public",
      tags: "",
      videoLink: "",
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [pitchDeck, setPitchDeck] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);

    // ✅ ADDED: Generic handler for text inputs
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    // ✅ ADDED: Specific handler for the checkbox toggle
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    };

    // ✅ UPDATED: handleSubmit function to send all data
    // In your PitchModalForm component...

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    // ... (all your formData.append lines are correct) ...
    dataToSubmit.append("pitchTitle", formData.pitchTitle);
    dataToSubmit.append("tagline", formData.tagline);
    dataToSubmit.append("fullDescription", formData.fullDescription);
    dataToSubmit.append("lookingForMembers", formData.lookingForMembers);
    dataToSubmit.append("inviteUsers", formData.inviteUsers);
    dataToSubmit.append("category", formData.category);
    dataToSubmit.append("privacy", formData.privacy);
    dataToSubmit.append("tags", formData.tags);
    dataToSubmit.append("videoLink", formData.videoLink);
    dataToSubmit.append("rolesRequired", selectedRoles.join(","));
    if (thumbnail) dataToSubmit.append("image", thumbnail);
    if (pitchDeck) dataToSubmit.append("pitchDeck", pitchDeck);


    try {
      // ✅ CHANGED: Read token from cookie instead of localStorage
      
      const res = await fetch("/api/create-pitch", {
        method: "POST",
        body: dataToSubmit,
        credentials: "include",
        
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Pitch created successfully:", data);
        alert("Pitch created successfully!");
      } else {
        console.error("Error creating pitch:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("A network error occurred:", err);
      alert("A network error occurred. Please try again.");
    }
  };
    const handleThumbnailUpload = (e) => {
      const file = e.target.files[0];
      if (file) setThumbnail(file);
    };

    const handlePitchDeckUpload = (e) => {
      const file = e.target.files[0];
      if (file) setPitchDeck(file);
    };

    const handleThumbnailRemove = () => {
      setThumbnail(null);
      // Also reset the file input field
      document.getElementById("thumbnail-input").value = "";
    };

    const toggleRole = (role) => {
      setSelectedRoles((prev) =>
        prev.includes(role)
          ? prev.filter((r) => r !== role)
          : [...prev, role]
      );
    };

    return (
      <div className="bg-gray-50">
        <Navbar2 />
        {/* Use a form tag to wrap everything for proper semantics and submission */}
        <form onSubmit={handleSubmit} className="p-6 md:p-10 lg:px-24 w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Create New Pitch</h2>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 mb-6">
            {/* Pitch Details */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex-1 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">Pitch Details</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-gray-600 mb-1">Pitch Title</label>
                  {/* ✅ UPDATED: Connected to state */}
                  <input
                    type="text"
                    name="pitchTitle"
                    placeholder="Enter pitch title"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={formData.pitchTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Tagline / Short Description</label>
                  {/* ✅ UPDATED: Connected to state */}
                  <input
                    type="text"
                    name="tagline"
                    placeholder="Short description"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={formData.tagline}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Full Description</label>
                  {/* ✅ UPDATED: Connected to state */}
                  <textarea
                    rows="6"
                    name="fullDescription"
                    placeholder="Enter detailed description..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Team Details */}
            {/* ✅ UPDATED: Pass handlers to TeamDetails */}
            <TeamDetails
              selectedRoles={selectedRoles}
              toggleRole={toggleRole}
              lookingForMembers={formData.lookingForMembers}
              handleCheckboxChange={handleCheckboxChange}
              handleInputChange={handleChange}
              inviteUsersValue={formData.inviteUsers}
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            {/* Media */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">Media & Attachments</h2>
              <div className="space-y-5 text-sm">
                <div>
                  <label className="block text-gray-600 mb-1">Image Upload (Thumbnail / Poster)</label>
                  <div className="flex items-center gap-4">
                    <input
                      id="thumbnail-input"
                      type="file"
                      accept="image/*"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      onChange={handleThumbnailUpload}
                    />
                    {thumbnail && (
                      <div className="flex items-center gap-2">
                        <button onClick={handleThumbnailRemove} className="text-red-600 hover:text-red-800">
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Pitch Deck (PDF/Slides - Optional)</label>
                  {/* ✅ UPDATED: Connected to handler */}
                  <input
                    type="file"
                    accept=".pdf,.ppt,.pptx"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    onChange={handlePitchDeckUpload}
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Video Link (YouTube/Vimeo - Optional)</label>
                  {/* ✅ UPDATED: Connected to state */}
                  <input
                    type="url"
                    name="videoLink"
                    placeholder="https://example.com/video"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={formData.videoLink}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Categorization */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">Categorization & Privacy</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-gray-600 mb-1">Pitch Category / Domain</label>
                  {/* ✅ UPDATED: Connected to state */}
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. AI, Healthcare, FinTech"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={formData.category}
                    onChange={handleChange}
                  />
                  {/* ... suggestion spans ... */}
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Pitch Type / Privacy</p>
                  <div className="flex flex-col gap-2">
                    {/* ✅ UPDATED: Connected radio buttons to state */}
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="privacy" value="Public" className="accent-blue-500" checked={formData.privacy === 'Public'} onChange={handleChange} />
                      Public (visible to all users)
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="privacy" value="Private" className="accent-blue-500" checked={formData.privacy === 'Private'} onChange={handleChange} />
                      Private (only mentors/invitees can view)
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Tags */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">Tags / Keywords</h2>
              <label className="block text-gray-600 mb-1 text-sm">Add Tags/Keywords (comma-separated)</label>
              {/* ✅ UPDATED: Connected to state */}
              <input
                type="text"
                name="tags"
                placeholder="e.g. innovation, startup, AI"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                value={formData.tags}
                onChange={handleChange}
              />
              {/* ... suggestion spans ... */}
            </section>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-10">
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer text-sm sm:text-base">
              Save Draft
            </button>
            <button type="button" className="px-4 py-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 cursor-pointer text-sm sm:text-base">
              Preview Pitch
            </button>
            {/* Changed to type="submit" to trigger the form's onSubmit */}
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer text-sm sm:text-base">
              Submit Pitch
            </button>
          </div>
        </form>
        <Footer />
      </div>
    );
  };

  export default PitchModalForm;