import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ExperimentList from './pages/ExperimentList';
import ExperimentDetail from './pages/ExperimentDetail';
import MCQPage from './pages/MCQPage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import Todo from './pages/Todo';
import MainLayout from './components/layout/MainLayout';
import Chatbot from './components/chat/Chatbot';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Login page without Sidebar */}
        <Route path="/" element={<LoginPage />} />

        {/* ✅ Pages with Sidebar (inside MainLayout) */}
        <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/todo" element={<MainLayout><Todo /></MainLayout>} />
        <Route path="/my-experiments" element={<MainLayout><ExperimentList /></MainLayout>} />
        <Route path="/experiments" element={<MainLayout><ExperimentList /></MainLayout>} />
        <Route path="/experiments/:id" element={<MainLayout><ExperimentDetail /></MainLayout>} />
        <Route path="/mcq" element={<MainLayout><MCQPage /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
