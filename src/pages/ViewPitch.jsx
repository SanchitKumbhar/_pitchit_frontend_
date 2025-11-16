

import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { Edit, Share2, Trash2, ChevronDown, User, Zap, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditPitch from "./EditPitch";

function ViewPitch() {
    const [openProblem, setOpenProblem] = useState(false);
    const [openSolution, setOpenSolution] = useState(false);
    const [openUSP, setOpenUSP] = useState(false);
    const [openAudience, setOpenAudience] = useState(false);
    const navigate = useNavigate();

    const teamData = [
        { member: "John Doe", role: "Lead Engineer", contact: "123456789" },
        { member: "Jane Smith", role: "UX Designer", contact: "123456789" },
        { member: "Alice Brown", role: "Marketing Head", contact: "123456789" },
    ];

    const EditPitch = () => {
        navigate("/edit-pitch");
    };

    return (
        <div>
            <Navbar2 />

            <div className="w-full p-6 md:p-10 lg:px-20 space-y-8">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                    <h1 className="text-3xl font-bold text-gray-800">pitchlt - a pitch launching tool for startup companies</h1>

                    <div className="flex gap-3 flex-wrap">
                        <button onClick={EditPitch} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center justify-center gap-2 transition-colors">
                            <Edit size={18} /> Edit Pitch
                        </button>

                        <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center justify-center gap-2 transition-colors">
                            <Share2 size={18} /> Share
                        </button>

                        <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 flex items-center justify-center gap-2 transition-colors">
                            <Trash2 size={18} /> Delete
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10">

                    <div className="w-full md:w-[70%] space-y-8">

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 pb-2">Full Description</h2>

                            <div className="space-y-4">

                                <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setOpenProblem(!openProblem)}
                                        className="w-full flex justify-between items-center px-5 py-3 text-lg font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        Problem Statement
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${openProblem ? "rotate-180 text-blue-600" : "text-gray-500"}`}
                                        />
                                    </button>
                                    {openProblem && (
                                        <div className="px-5 pb-4 text-gray-700 pt-3 bg-white">
                                            The main problem addressed by this pitch is…
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setOpenSolution(!openSolution)}
                                        className="w-full flex justify-between items-center px-5 py-3 text-lg font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        Proposed Solution
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${openSolution ? "rotate-180 text-blue-600" : "text-gray-500"}`}
                                        />
                                    </button>
                                    {openSolution && (
                                        <div className="px-5 pb-4 text-gray-700 pt-3 bg-white">
                                            The proposed solution includes…
                                        </div>
                                    )}
                                </div>

                                {/* USP */}
                                <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setOpenUSP(!openUSP)}
                                        className="w-full flex justify-between items-center px-5 py-3 text-lg font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        Uniqueness / USP
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${openUSP ? "rotate-180 text-blue-600" : "text-gray-500"}`}
                                        />
                                    </button>
                                    {openUSP && (
                                        <div className="px-5 pb-4 text-gray-700 pt-3 bg-white">
                                            The unique selling point of this pitch is…
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setOpenAudience(!openAudience)}
                                        className="w-full flex justify-between items-center px-5 py-3 text-lg font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        Target Audience
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${openAudience ? "rotate-180 text-blue-600" : "text-gray-500"}`}
                                        />
                                    </button>
                                    {openAudience && (
                                        <div className="px-5 pb-4 text-gray-700 pt-3 bg-white">
                                            The target audience includes…
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="w-full md:w-[30%] space-y-8">

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold mb-2">Pitch Category / Domain</h2>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm">
                                    AI
                                </span>
                                <span className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm">
                                    FinTech
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold mb-2">Pitch Type</h2>
                            <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full text-sm">
                                Public
                            </span>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4">Media & Attachments</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <img className="rounded-lg border border-gray-300 object-cover w-full h-24" src="https://via.placeholder.com/150/0000FF/808080?text=Image+1" alt="Placeholder image 1" />
                                <img className="rounded-lg border border-gray-300 object-cover w-full h-24" src="https://via.placeholder.com/150/FF5733/FFFFFF?text=Image+2" alt="Placeholder image 2" />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold mb-3">Tags / Keywords</h2>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Tech</span>
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Innovation</span>
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Startup</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ViewPitch;             