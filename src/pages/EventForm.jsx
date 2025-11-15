
import React from "react";
import Navbar2 from "../components/Navbar2.jsx";
import Footer from "../components/Footer.jsx";
import { FileText, AlignLeft, Calendar, MapPin, Tag, X, Send } from "lucide-react";

function EventForm() {
  return (
    <div>
      <Navbar2 />

      <div className="w-full px-4 py-6 md:px-10 lg:px-32">

        <h1 className="text-2xl md:text-3xl mt-5 font-bold mb-6">
          Publish Event Publicity Post
        </h1>

        <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-4 sm:p-6 space-y-6">

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Event Title
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
              <FileText size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Enter event title"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Event Description
            </label>

            <div className="flex items-start gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
              <AlignLeft size={20} className="text-gray-500 mt-1" />
              <textarea
                rows="4"
                placeholder="Write event description..."
                className="w-full bg-transparent outline-none resize-none"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Event Date
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                <Calendar size={20} className="text-gray-500" />
                <input
                  type="date"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Event Location
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                <MapPin size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Associate with Pitch
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
              <Tag size={20} className="text-gray-500" />
              <select className="w-full bg-transparent outline-none">
                <option>Select an associated pitch</option>
                <option>Pitch 1</option>
                <option>Pitch 2</option>
                <option>Pitch 3</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">

            <button className="flex items-center gap-2 px-6 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-100 transition">
              <X size={18} />
              Cancel
            </button>

            <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition">
              <Send size={18} />
              Publish Event
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EventForm;
