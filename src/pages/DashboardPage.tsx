import React, { useState, useEffect } from 'react';
import { Brain, Users, Award, TrendingUp, Download, Eye, Settings, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useWallet } from '../contexts/WalletContext';
import { useContract } from '../contexts/ContractContext';

// Mock data for demonstration
const mockUserData = {
  modelsOwned: 3,
  totalEarnings: 1250,
  federatedSessions: 8,
  totalDownloads: 2847
};

const mockOwnedModels = [
  {
    id: 1,
    name: "Advanced Image Classifier",
    downloads: 1247,
    earnings: 623.5,
    rating: 4.8,
    status: 'active'
  },
  {
    id: 2,
    name: "NLP Sentiment Analyzer", 
    downloads: 892,
    earnings: 446,
    rating: 4.6,
    status: 'active'
  },
  {
    id: 3,
    name: "Time Series Forecaster",
    downloads: 634,
    earnings: 317,
    rating: 4.9,
    status: 'active'
  }
];

const mockEarningsData = [
  { month: 'Jan', earnings: 120 },
  { month: 'Feb', earnings: 180 },
  { month: 'Mar', earnings: 240 },
  { month: 'Apr', earnings: 320 },
  { month: 'May', earnings: 280 },
  { month: 'Jun', earnings: 380 }
];

const mockDownloadsData = [
  { month: 'Jan', downloads: 45 },
  { month: 'Feb', downloads: 78 },
  { month: 'Mar', downloads: 123 },
  { month: 'Apr', downloads: 156 },
  { month: 'May', downloads: 189 },
  { month: 'Jun', downloads: 234 }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(mockUserData);
  const [ownedModels, setOwnedModels] = useState(mockOwnedModels);
  
  const { account, isConnected } = useWallet();
  const { client } = useContract();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <div className="text-center">
          <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your ML marketplace overview.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Models Owned</p>
                <p className="text-3xl font-bold text-gray-900">{userData.modelsOwned}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">{userData.totalEarnings}</p>
                <p className="text-sm text-gray-500">ALGO</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">FL Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{userData.federatedSessions}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-3xl font-bold text-gray-900">{userData.totalDownloads.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'models', label: 'My Models', icon: Brain },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Download className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Model Downloaded</p>
                        <p className="text-sm text-gray-600">Advanced Image Classifier was downloaded by ALGO...X7Y9</p>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Federated Session Joined</p>
                        <p className="text-sm text-gray-600">You joined the NLP Sentiment Analyzer training session</p>
                      </div>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Award className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Reward Received</p>
                        <p className="text-sm text-gray-600">Earned 25 ALGO from federated learning contribution</p>
                      </div>
                      <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 text-left">
                      <Plus className="h-8 w-8 text-blue-600 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Register New Model</h4>
                      <p className="text-sm text-gray-600">Upload and list your ML model in the marketplace</p>
                    </button>
                    
                    <button className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-left">
                      <Users className="h-8 w-8 text-purple-600 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Start FL Session</h4>
                      <p className="text-sm text-gray-600">Create a new federated learning training session</p>
                    </button>
                    
                    <button className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 text-left">
                      <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">View Analytics</h4>
                      <p className="text-sm text-gray-600">Check detailed performance metrics and insights</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'models' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">My Models</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                    <Plus className="h-4 w-4" />
                    <span>Add Model</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {ownedModels.map((model) => (
                    <div key={model.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{model.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              model.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {model.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Downloads:</span>
                              <span className="font-semibold text-gray-900 ml-1">{model.downloads.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Earnings:</span>
                              <span className="font-semibold text-green-600 ml-1">{model.earnings} ALGO</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Rating:</span>
                              <span className="font-semibold text-yellow-600 ml-1">{model.rating} ⭐</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <Settings className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Earnings Chart */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Monthly Earnings</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockEarningsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="earnings" 
                            stroke="#3B82F6" 
                            strokeWidth={3}
                            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Downloads Chart */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Monthly Downloads</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockDownloadsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="downloads" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}