

import React from "react";
import { Search, Trophy, TrendingUp, Zap, Star, Shield, Award } from "lucide-react";
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

  const getRankColor = (rank) => {
    if (rank === 1) return "text-yellow-500 font-extrabold";
    if (rank === 2) return "text-red-400 font-bold";
    if (rank === 3) return "text-blue-700 font-semibold";
    return "text-gray-700";
  };

  return (
    <div className="min-h-screen">
      <Navbar2 />

      <div className="w-full p-6 space-y-8 sm:p-6 md:p-10 lg:px-20">
        
        <h1 className="text-4xl font-extrabold flex items-center gap-3 text-gray-800">
          <Trophy className="w-8 h-8 text-blue-600" /> Leaderboard
        </h1>

        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search startups by name or industry..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md transition-all"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl pb-2 font-bold flex items-center gap-2 text-gray-700">
            <Award className="w-6 h-6 text-orange-500" /> Top Startups of the Month
          </h2>

          <div className="overflow-x-auto shadow-xl rounded-xl">
            <div className="min-w-[600px] space-y-1 p-3 bg-white border border-gray-100 rounded-xl">
              
              <div className="
                grid grid-cols-4 
                text-center font-bold text-white shadow-lg p-4 
                rounded-xl bg-blue-600/90
              ">
                <span className="min-w-[100px]">Rank</span>
                <span className="min-w-[180px]">Startup Name</span>
                <span className="min-w-[120px]">Industry</span>
                <span className="min-w-[120px]">Score / 1000</span>
              </div>

              {data.map((item) => (
                <div
                  key={item.rank}
                  className="
                    grid grid-cols-4
                    text-center py-4 px-2 rounded-lg hover:bg-gray-200 transition-colors
                    border-b border-gray-100 last:border-b-0
                  "
                >
                  <span className={`text-lg font-mono ${getRankColor(item.rank)}`}>
                    {item.rank}
                  </span>
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="text-sm text-gray-600">{item.industry}</span>
                  <span className="text-gray-700 font-medium">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-700">
            <Zap className="w-6 h-6 text-purple-600" /> Quick Insights
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow">
              <p className="text-md text-gray-500 pb-2 flex items-center gap-2"><Trophy className="w-4 h-4" /> Total Pitches</p>
              <p className="text-3xl font-extrabold text-blue-600">140</p>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow">
              <p className="text-md text-gray-500 pb-2 flex items-center gap-2"><Star className="w-4 h-4" /> Top Performer</p>
              <p className="text-xl font-bold text-blue-600 truncate">Startup Alpha</p>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow">
              <p className="text-md text-gray-500 pb-2 flex items-center gap-2"><Shield className="w-4 h-4" /> Highest Coins</p>
              <p className="text-xl font-bold">
                 <span className="text-yellow-600 font-extrabold"> 1000 Gold</span>
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow">
              <p className="text-md text-gray-500 pb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Growth Trend</p>
              <p className="text-xl font-bold text-red-600">High</p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Leaderboard;