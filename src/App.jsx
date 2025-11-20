
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import MyPitches from './pages/MyPitches.jsx';
import Dashboard from './pages/Dashboard.jsx';
import RecentPitches from './pages/RecentPitches.jsx';
import PitchModalForm from './pages/PitchModalForm.jsx';
import JoinedTeams from './pages/JoinedTeams.jsx';
import Explore from './pages/Explore.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import EventForm from './pages/EventForm.jsx'
import ViewPitch from './pages/ViewPitch.jsx'
import EditPitch from './pages/EditPitch.jsx';
import EditPost from './pages/EditPost.jsx';
import HiringForm from './pages/HiringForm.jsx';
import SentimentAndFeedbackInsights from './pages/SentimentAndFeedbackInsights.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/my-pitches" element={<MyPitches />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-pitch" element={<PitchModalForm />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/event-publish" element={<EventForm />} />
        <Route path="/view-pitch" element={<ViewPitch />} />
        <Route path="/edit-pitch" element={<EditPitch />} />
        <Route path="/edit-post" element={<EditPost />} />
        <Route path="/hiring-form" element={<HiringForm />} />
        <Route path="/sentiment-insights" element={<SentimentAndFeedbackInsights />} />



        

      </Routes>
    </BrowserRouter>
  );
}

export default App;