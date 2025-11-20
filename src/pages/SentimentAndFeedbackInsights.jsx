


import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const sentimentData = [
  { name: "Positive", value: 45, color: "#22c55e" },
  { name: "Neutral", value: 16, color: "#8b5cf6" },
  { name: "Negative", value: 10, color: "#ef4444" },
];

const barData = [
  { name: "Problem/ Solution", value: 45 },
  { name: "Team & Execution", value: 70 },
  { name: "Market Fit", value: 90 },
  { name: "Revenue Model", value: 130 },
  { name: "Idea Clarity", value: 180 },
];

export default function SentimentAndFeedbackInsights() {
  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-900 min-h-screen">
      {/* Heading */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Sentiment and Feedback Insights</h1>
        <hr className="mt-2 border-gray-700" />
      </div>

      {/* Three Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Positive Feedback */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-300">Positive Feedback</h2>
          <p className="text-4xl font-bold mt-2">45%</p>
          <p className="flex items-center justify-center md:justify-start text-green-600 mt-2 font-medium">
            <ArrowUp size={18} /> 2.5% increase
          </p>
        </div>

        {/* Neutral Feedback */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-300">Neutral Feedback</h2>
          <p className="text-4xl font-bold mt-2">16%</p>
          <p className="flex items-center justify-center md:justify-start text-gray-500 mt-2 font-medium">
            <ArrowUp size={18} className="rotate-180" /> -1.2% change
          </p>
        </div>

        {/* Negative Feedback */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-300">Negative Feedback</h2>
          <p className="text-4xl font-bold mt-2">10%</p>
          <p className="flex items-center justify-center md:justify-start text-red-600 mt-2 font-medium">
            <ArrowDown size={18} /> 0.8% decrease
          </p>
        </div>
      </div>

      {/* Pie Chart + Tags Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Sentiment Distribution</h2>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} dataKey="value" nameKey="name" outerRadius="70%">
                  {sentimentData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-around mt-4 text-sm">
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full" /> Positive
            </p>
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 bg-violet-500 rounded-full" /> Neutral
            </p>
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" /> Negative
            </p>
          </div>
        </div>

        {/* Frequent Review Terms */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Frequent Review Terms</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "User Experience", "Usability", "Performance", "Bug Report",
              "Customer Support", "Speed", "Reliability", "Navigation",
              "Value Proposition"
            ].map((term) => (
              <span key={term} className="px-3 py-1 bg-blue-900 text-white text-sm rounded-full">
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Theme Clustering */}
      <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-md w-full">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Feedback Theme Clustering</h2>

        <div className="w-full h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              layout="vertical"
              
            >
              <XAxis type="number" ticks={[0, 45, 90, 135, 180]} domain={[0, 180]} />
              <YAxis type="category" dataKey="name" width={140} />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Feedback Assistant */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full">
        <h2 className="text-lg font-semibold text-gray-300">AI Feedback Assistant</h2>

        <h3 className="text-md font-semibold mt-4">Top 3 Improvement Tips:</h3>
        <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-300">
          <li>Redefine the onboarding flow to clarify the core value proposition.</li>
          <li>Add a "Request a Feature" option within the application.</li>
          <li>Improve performance during heavy usage to increase satisfaction.</li>
        </ul>

        <button className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700">
          Ask AI for Detailed Feedback
        </button>
      </div>
    </div>
  );
}












