

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Briefcase,
  User,
  FileText,
  CheckCircle,
  Upload,
  MapPin,
  Calendar,
  Linkedin,
  Github,
} from "lucide-react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "Select",
  address: "",
  jobRole: "",
  jobType: "Select",
  location: "",
  expectedSalary: "",
  qualification: "",
  yearsExperience: "",
  pastCompanies: "",
  resumeFile: null,
  linkedinUrl: "",
  githubUrl: "",
  joiningDate: "",
  introduction: "",
  agreement1: false,
  agreement2: false,
};

const completionFields = {
  1: ["fullName", "email", "dob", "phone", "gender", "address"],

  2: ["jobRole", "jobType", "location"],

  3: ["qualification", "yearsExperience", "resumeFile"],

  4: ["joiningDate"],
};

const skillsList = [
  "React.js",
  "Java",
  "Docker",
  "Node.js",
  "Python",
  "SQL",
  "MongoDB",
  "Figma",
  "Kubernetes",
  "AWS",
];

const HiringForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [completedSections, setCompletedSections] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const fileInputRef = useRef(null);
  const totalSections = 4;

  const personalRef = useRef(null);
  const positionRef = useRef(null);
  const skillsRef = useRef(null);
  const additionalRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFormData((prev) => ({ ...prev, resumeFile: null }));
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      e.target.value = null;
      setFormData((prev) => ({ ...prev, resumeFile: null }));
      return;
    }

    setFormData((prev) => ({ ...prev, resumeFile: file }));
    console.log("Uploaded PDF:", file.name);
  };

  const checkSectionCompletion = useCallback(
    (sectionId) => {
      const fields = completionFields[sectionId];
      if (!fields) return false;

      const isFieldsFilled = fields.every((field) => {
        const value = formData[field];
        return value && value !== "" && value !== "Select";
      });

      if (sectionId === 3) {
        return isFieldsFilled && selectedSkills.length > 0;
      }

      return isFieldsFilled;
    },
    [formData, selectedSkills]
  );

  useEffect(() => {
    const newCompletedSections = {};
    for (let i = 1; i <= totalSections; i++) {
      newCompletedSections[i] = checkSectionCompletion(i);
    }
    setCompletedSections(newCompletedSections);

    if (activeStep < totalSections && newCompletedSections[activeStep]) {
      setActiveStep(activeStep + 1);
    }
  }, [formData, selectedSkills, checkSectionCompletion, activeStep]);

  const goToSection = (step) => {
    setActiveStep(step);

    const refs = {
      1: personalRef,
      2: positionRef,
      3: skillsRef,
      4: additionalRef,
    };

    refs[step].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const completedCount =
    Object.values(completedSections).filter(Boolean).length;
  const progressPercent = (completedCount / totalSections) * 100;

  return (
    <div className="bg-gray-50">
      <Navbar2 />
      <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-5 text-gray-800 mt-5 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">pitchlt</h1>
          </div>

          <h2 className="text-xl sm:text-3xl font-semibold text-gray-800">
            Universal Hiring Form
          </h2>
        </div>
        <div>
          <hr className="border-gray-300 mb-10 md:mb-20" />
        </div>




        <div className="relative w-full mb-10 pt-8 sm:pt-0">
          <div className="w-full bg-gray-200 h-3 rounded-full"></div>

          <div
            className={`absolute top-0 h-3 bg-blue-600 rounded-full transition-all duration-500`}
            style={{ width: `${progressPercent}%` }}
          ></div>

          {/* Responsive Step Labels */}
          <div className="absolute w-full top-[-35px] sm:top-[-35px] flex justify-between text-xs sm:text-sm font-medium">
            {Object.keys(completionFields).map((step) => (
              <p
                key={step}
                className={`cursor-pointer w-1/4 text-center sm:w-auto 
                  ${
                    +step === activeStep
                      ? "text-blue-600 font-bold"
                      : completedSections[+step]
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                onClick={() => goToSection(+step)}
              >
                {step === "1"
                  ? "Personal Info"
                  : step === "2"
                  ? "Position Details"
                  : step === "3"
                  ? "Skills & Exp"
                  : "Additional"}
              </p>
            ))}
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
          {/* Personal Information Section */}
          <div
            ref={personalRef}
            className={`space-y-5 shadow-lg p-5 rounded-2xl border transition-all ${
              completedSections[1] ? "border-blue-400" : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User size={20} className="text-blue-600" /> Personal Information
              {completedSections[1] && (
                <CheckCircle size={18} className="text-green-600 ml-2" />
              )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-medium">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg mt-1 text-gray-500 focus:outline-none"
              >
                <option value="Select">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer Not to Say</option>
              </select>
            </div>

            <div>
              <label className="font-medium">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                rows={3}
              ></textarea>
            </div>
          </div>

          {/* Position Details Section */}
          <div
            ref={positionRef}
            className={`space-y-5 shadow-lg p-5 rounded-2xl border transition-all ${
              completedSections[2] ? "border-blue-400" : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" /> Position Details
              {completedSections[2] && (
                <CheckCircle size={18} className="text-green-600 ml-2" />
              )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium">
                  Job Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-medium">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                >
                  <option value="Select">Select</option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium flex items-center gap-1">
                  <MapPin size={16} /> Preferred Location{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-medium">Expected Salary (Optional)</label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Skills & Experience Section */}
          <div
            ref={skillsRef}
            className={`space-y-5 shadow-lg p-5 rounded-2xl border transition-all ${
              completedSections[3] ? "border-blue-400" : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle size={20} className="text-purple-600" /> Skills &
              Experience
              {completedSections[3] && (
                <CheckCircle size={18} className="text-green-600 ml-2" />
              )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium">
                  Highest Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-medium">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-medium">
                Technical Skills <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {skillsList.map((skill) => (
                  <span
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 shadow-sm rounded-full cursor-pointer text-sm transition-colors ${
                      selectedSkills.includes(skill)
                        ? "bg-blue-600 text-white font-semibold"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium">Past Companies (Optional)</label>
              <input
                type="text"
                name="pastCompanies"
                value={formData.pastCompanies}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-medium flex items-center gap-2">
                <Upload size={18} /> Resume Upload{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden focus:outline-none"
              />

              <div
                onClick={() => fileInputRef.current.click()}
                className="mt-2 border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                {formData.resumeFile ? (
                  <p className="text-blue-600 font-medium text-sm sm:text-base">
                    {formData.resumeFile.name} (Uploaded!)
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm sm:text-base">Click or drag a PDF file here</p>
                )}
                <button
                  type="button"
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                >
                  Browse File
                </button>
              </div>
            </div>
          </div>

          {/* Additional Details Section */}
          <div
            ref={additionalRef}
            className={`space-y-5 shadow-lg p-5 rounded-2xl border transition-all ${
              completedSections[4] ? "border-blue-400" : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText size={20} className="text-orange-600" /> Additional
              Details
              {completedSections[4] && (
                <CheckCircle size={18} className="text-green-600 ml-2" />
              )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium flex items-center gap-1">
                  <Linkedin size={16} /> LinkedIn Profile URL (Optional)
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-medium flex items-center gap-1">
                  <Github size={16} /> Portfolio / GitHub URL (Optional)
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-medium flex items-center gap-1">
                <Calendar size={16} /> Available Joining Date{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-medium">
                Short Self Introduction (Optional)
              </label>
              <textarea
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none"
                rows={3}
              ></textarea>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="space-y-4 p-5">
            <h2 className="text-xl font-semibold">Agreement</h2>

            <div className="flex items-start gap-3 text-sm sm:text-base">
              <input
                type="checkbox"
                name="agreement1"
                checked={formData.agreement1}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
              />
              <p>
                I confirm that the information provided is accurate to the best of
                my knowledge. <span className="text-red-500">*</span>
              </p>
            </div>

            <div className="flex items-start gap-3 text-sm sm:text-base">
              <input
                type="checkbox"
                name="agreement2"
                checked={formData.agreement2}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
              />
              <p>
                I agree to the company’s terms & conditions regarding data privacy
                and application processing.{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={() => goToSection(Math.max(1, activeStep - 1))}
              className="px-4 py-2 sm:px-6 sm:py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors text-sm sm:text-base"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => goToSection(Math.min(totalSections, activeStep + 1))}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg transition-colors text-sm sm:text-base
                ${
                  activeStep < totalSections
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : progressPercent === 100 &&
                      formData.agreement1 &&
                      formData.agreement2
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              disabled={
                activeStep === totalSections &&
                (!formData.agreement1 ||
                  !formData.agreement2 ||
                  progressPercent !== 100)
              }
            >
              {activeStep < totalSections ? "Next" : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default HiringForm;




