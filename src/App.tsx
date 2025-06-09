import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { ContractProvider } from './contexts/ContractContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import FederatedLearningPage from './pages/FederatedLearningPage';
import DashboardPage from './pages/DashboardPage';
import ModelDetailsPage from './pages/ModelDetailsPage';

function App() {
  return (
    <WalletProvider>
      <ContractProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/federated-learning" element={<FederatedLearningPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/model/:id" element={<ModelDetailsPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ContractProvider>
    </WalletProvider>
  );
}

export default App;