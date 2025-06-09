import React, { useState, useEffect } from 'react';
import { Users, Brain, Zap, Clock, Award, Plus, Play, Pause } from 'lucide-react';
import { useContract } from '../contexts/ContractContext';
import { useWallet } from '../contexts/WalletContext';

interface TrainingSession {
  id: number;
  modelId: number;
  modelName: string;
  description: string;
  participants: number;
  maxParticipants: number;
  rewardPool: number;
  status: 'active' | 'completed' | 'pending';
  duration: string;
  accuracy: number;
  owner: string;
  contributionRequired: number;
}

// Mock data for demonstration
const mockSessions: TrainingSession[] = [
  {
    id: 1,
    modelId: 1,
    modelName: "Advanced Image Classifier",
    description: "Collaborative training to improve accuracy on medical imaging datasets",
    participants: 12,
    maxParticipants: 20,
    rewardPool: 500,
    status: 'active',
    duration: '2 days left',
    accuracy: 94.2,
    owner: "ALGO...X7Y9",
    contributionRequired: 25
  },
  {
    id: 2,
    modelId: 2,
    modelName: "NLP Sentiment Analyzer",
    description: "Training on multilingual sentiment data to improve global coverage",
    participants: 8,
    maxParticipants: 15,
    rewardPool: 350,
    status: 'active',
    duration: '5 days left',
    accuracy: 91.8,
    owner: "ALGO...A3B4",
    contributionRequired: 30
  },
  {
    id: 3,
    modelId: 3,
    modelName: "Time Series Forecaster",
    description: "Enhancing prediction accuracy with diverse financial datasets",
    participants: 15,
    maxParticipants: 15,
    rewardPool: 750,
    status: 'completed',
    duration: 'Completed',
    accuracy: 89.7,
    owner: "ALGO...M8N2",
    contributionRequired: 50
  }
];

export default function FederatedLearningPage() {
  const [sessions, setSessions] = useState<TrainingSession[]>(mockSessions);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newSession, setNewSession] = useState({
    modelId: '',
    rewardAmount: '',
    maxParticipants: '',
    description: ''
  });

  const { client } = useContract();
  const { isConnected } = useWallet();

  const handleJoinSession = async (sessionId: number) => {
    if (!client || !isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      // This would integrate with the smart contract
      console.log('Joining session:', sessionId);
      alert('Join functionality will be implemented with smart contract integration');
    } catch (error) {
      console.error('Join failed:', error);
      alert('Failed to join session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async () => {
    if (!client || !isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      // This would integrate with the smart contract
      console.log('Creating session:', newSession);
      alert('Create functionality will be implemented with smart contract integration');
      setShowCreateModal(false);
      setNewSession({ modelId: '', rewardAmount: '', maxParticipants: '', description: '' });
    } catch (error) {
      console.error('Create failed:', error);
      alert('Failed to create session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-4 w-4" />;
      case 'completed':
        return <Award className="h-4 w-4" />;
      case 'pending':
        return <Pause className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Federated Learning Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Collaborate on model training while keeping your data private and secure
          </p>
          
          {isConnected && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Training Session
            </button>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {sessions.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Play className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-3xl font-bold text-gray-900">
                  {sessions.reduce((sum, s) => sum + s.participants, 0)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rewards</p>
                <p className="text-3xl font-bold text-gray-900">
                  {sessions.reduce((sum, s) => sum + s.rewardPool, 0)}
                </p>
                <p className="text-sm text-gray-500">ALGO</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Training Sessions */}
        <div className="space-y-6">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{session.modelName}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(session.status)}`}>
                        {getStatusIcon(session.status)}
                        <span className="ml-1 capitalize">{session.status}</span>
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{session.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Participants:</span>
                        <div className="flex items-center mt-1">
                          <Users className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="font-semibold">{session.participants}/{session.maxParticipants}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Reward Pool:</span>
                        <div className="flex items-center mt-1">
                          <Award className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-semibold">{session.rewardPool} ALGO</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-green-500 mr-1" />
                          <span className="font-semibold">{session.duration}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Accuracy:</span>
                        <div className="flex items-center mt-1">
                          <Zap className="h-4 w-4 text-purple-500 mr-1" />
                          <span className="font-semibold">{session.accuracy}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:ml-8 flex flex-col space-y-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Contribution Required</p>
                      <p className="text-2xl font-bold text-gray-900">{session.contributionRequired} ALGO</p>
                    </div>
                    
                    {session.status === 'active' && session.participants < session.maxParticipants && (
                      <button
                        onClick={() => handleJoinSession(session.id)}
                        disabled={loading || !isConnected}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                      >
                        {loading ? 'Joining...' : 'Join Session'}
                      </button>
                    )}
                    
                    {session.status === 'active' && session.participants >= session.maxParticipants && (
                      <div className="px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl text-center">
                        Session Full
                      </div>
                    )}
                    
                    {session.status === 'completed' && (
                      <div className="px-6 py-3 bg-blue-100 text-blue-700 font-semibold rounded-xl text-center">
                        Completed
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Participation Progress</span>
                    <span>{Math.round((session.participants / session.maxParticipants) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Session Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Training Session</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model ID</label>
                  <input
                    type="number"
                    value={newSession.modelId}
                    onChange={(e) => setNewSession({...newSession, modelId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter model ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reward Amount (ALGO)</label>
                  <input
                    type="number"
                    value={newSession.rewardAmount}
                    onChange={(e) => setNewSession({...newSession, rewardAmount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter reward amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                  <input
                    type="number"
                    value={newSession.maxParticipants}
                    onChange={(e) => setNewSession({...newSession, maxParticipants: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter max participants"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newSession.description}
                    onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe the training session"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSession}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Session'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}