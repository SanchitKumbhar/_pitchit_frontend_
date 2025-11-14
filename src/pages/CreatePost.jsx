import React, { useCallback, useRef, useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Navbar2 from "../components/Navbar2";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [pitch, setPitch] = useState(""); // This will hold the selected pitch ID

  const [pitchList, setPitchList] = useState([]);
  const [loadingPitches, setLoadingPitches] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const fileInputRef = useRef(null);

  // --- This useEffect to fetch pitches is correct and unchanged ---
  useEffect(() => {
    const fetchPitches = async () => {
      try {
        setLoadingPitches(true);
        setFetchError(null);
        
        // IMPORTANT: Replace '/api/pitches' with your actual API endpoint to get all pitches
        const res = await axios.get("/api/get-all-pitches", {
          withCredentials: true,
        });

        if (res.data && res.data.data) {
          setPitchList(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching pitches:", err);
        setFetchError("Failed to load pitches.");
      } finally {
        setLoadingPitches(false);
      }
    };

    fetchPitches();
  }, []);

  const handleFiles = useCallback((selectedFiles) => {
    const incoming = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...incoming]);
  }, []);

  // --- Drag and drop handlers (unchanged) ---
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onFileInputChange = (e) => {
    if (e.target.files && e.target.files.length) {
      handleFiles(e.target.files); // Corrected this from e.dataTransfer.files
    }
    e.target.value = null;
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const removeFile = (index) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFiles([]);
    setPitch("");
  };

  // ===================================================================
  // --- MODIFIED handleSubmit FUNCTION TO MATCH YOUR API ---
  // ===================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!pitch) {
      alert("Please select a pitch.");
      return;
    }
    
    // Check if at least one file is attached, as the backend expects 'image'
    if (files.length === 0) {
        alert("Please attach at least one file (e.g., video or pitch deck).");
        return;
    }

    try {
      const formData = new FormData();
      
      // 1. Append text fields matching the backend controller
      formData.append("title", title);
      formData.append("description", description);
      formData.append("pitchid", pitch); // 'pitch' state correctly holds the ID

      // 2. Append files matching the backend keys 'image' and 'pitchDeck'
      // Your backend expects: req.files.image (for video) and req.files.pitchDeck (for photo)
      // Since the UI has one box, we'll assume:
      // - The first file (files[0]) is the 'image' (video)
      // - The second file (files[1]), if it exists, is the 'pitchDeck' (photo)
      
      if (files[0]) {
        formData.append("image", files[0]);
      }
      if (files[1]) {
        formData.append("pitchDeck", files[1]);
      }
      // Note: If you want to upload more files, you'd need to adjust the backend
      // or send them as arrays and loop on the backend.
      // This logic strictly matches your provided controller.

      // IMPORTANT: Make sure '/api/create-post' is the correct endpoint
      const res = await axios.post("/api/create-new-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          
        },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log("Upload progress:", percent + "%");
        },
      });

      console.log("Success:", res.data);
      alert("Post created successfully!");
      resetForm();

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to create post. Check console.");
    }
  };
  // ===================================================================
  // --- END OF MODIFIED FUNCTION ---
  // ===================================================================

  return (
    <div className="bg-gray-50">
      <Navbar2 />
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 space-y-8 "
      >
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>

        {/* Section 1 - Post Details */}
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Post Details</h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Post Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter post title"
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-300 outline-none"
              required // Added for good practice
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Post Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-300 outline-none"
              required // Added for good practice
            />
          </div>
        </div>

        {/* Section 2 - Attachments */}
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-center text-gray-700">
            Attachments
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Add files: 1. Video (required), 2. Pitch Deck (optional)
          </p>

          {/* Upload Box */}
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center space-y-3 hover:bg-gray-50 cursor-pointer transition ${
              dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
            }`}
            onClick={openFileDialog}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={onFileInputChange}
              className="hidden"
            />

            <Upload className="mx-auto w-10 h-10 text-gray-500" />
            <p className="text-gray-600">
              Drag and drop files here or{" "}
              <span className="text-blue-600 font-medium">click to browse</span>
            </p>

            {files.length > 0 && (
              <div className="mt-4 text-left max-h-40 overflow-auto">
                <ul className="space-y-2">
                  {files.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md border"
                    >
                      <div className="text-sm">
                        <div className="font-medium">{f.name}</div>
                        <div className="text-xs text-gray-500">
                          {(f.size / 1024).toFixed(1)} KB
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          removeFile(idx);
                        }}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Select Pitch Dropdown (unchanged) */}
          <div className="space-y-2">
            <label
              htmlFor="pitch-select"
              className="block text-sm font-medium text-gray-600"
            >
              Select Pitch
            </label>
            <select
              id="pitch-select"
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              disabled={loadingPitches}
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-300 outline-none text-gray-700 bg-white"
              required // Added for good practice
            >
              <option value="" disabled className="text-gray-500">
                {loadingPitches
                  ? "Loading pitches..."
                  : fetchError
                  ? fetchError
                  : "-- Select a pitch --"}
              </option>
              {!loadingPitches &&
                !fetchError &&
                pitchList.map((p) => (
                  <option key={p._id} value={p._id} className="text-gray-900">
                    {p.pitchTitle} 
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4 py-5">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;