


import React from "react";
import { Search } from "lucide-react";
import Navbar2 from "../components/Navbar2.jsx";
import Footer from "../components/Footer.jsx";

function Leaderboard() {
  const data = [
    { rank: 1, name: "Startup Alpha", industry: "FinTech", score: 980 },
    { rank: 2, name: "Beta Corp", industry: "HealthTech", score: 960 },
    { rank: 3, name: "Gamma Labs", industry: "EdTech", score: 945 },
    { rank: 4, name: "Delta Innovations", industry: "AI", score: 930 },
    { rank: 5, name: "Epsilon Systems", industry: "E-commerce", score: 920 },
    { rank: 6, name: "Zeta Robotics", industry: "Robotics", score: 905 },
    { rank: 7, name: "Eta Energy", industry: "Energy", score: 890 },
    { rank: 8, name: "Theta Motors", industry: "Automobile", score: 875 },
    { rank: 9, name: "Iota Foods", industry: "FoodTech", score: 860 },
    { rank: 10, name: "Kappa Media", industry: "Media", score: 850 }
  ];

  return (
    <div>
      <Navbar2 />

      <div className="w-full p-6 space-y-6 sm:p-6 md:p-10 lg:px-25">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold">Leaderboard</h1>

        {/* Search Box */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search startups..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none shadow-sm"
          />
        </div>

        {/* Table Section */}
        <div className="space-y-4">
          <h2 className="text-xl pb-2 font-semibold">Top startups of the month</h2>

          {/* Table Header */}
          <div className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
            text-center font-semibold text-blue-600 shadow-md p-4 
            rounded-lg bg-white
          ">
            <span>Rank</span>
            <span>Startup Name</span>
            <span className="hidden sm:block">Industry</span>
            <span className="hidden md:block">Score / 1000</span>
          </div>

          {/* Table Rows */}
          <div className="space-y-2 shadow-md p-4 rounded-lg bg-white">
            {data.map((item) => (
              <div
                key={item.rank}
                className="
                  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                  text-center py-3 rounded-lg hover:bg-gray-100 transition
                "
              >
                <span>{item.rank}</span>
                <span>{item.name}</span>
                <span className="hidden sm:block">{item.industry}</span>
                <span className="hidden md:block">{item.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold pt-4">Quick Insights</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-2xl shadow-md bg-white">
              <p className="text-md text-gray-600 pb-2">Total pitches</p>
              <p className="text-2xl font-bold text-blue-600">140</p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl shadow-md bg-white">
              <p className="text-md text-gray-600 pb-2">Pitch with highest rank</p>
              <p className="text-xl font-semibold text-blue-600">Startup Alpha</p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl shadow-md bg-white">
              <p className="text-md text-gray-600 pb-2">Highest pitch coins</p>
              <p className="text-xl font-bold text-blue-600">
                1000 <span className="text-yellow-600">Gold</span>
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl shadow-md bg-white">
              <p className="text-md text-gray-600 pb-2">Growth</p>
              <p className="text-xl font-semibold text-blue-600">High</p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Leaderboard;
