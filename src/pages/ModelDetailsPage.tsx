import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Download, Eye, Brain, Shield, Zap, Users, Award } from 'lucide-react';
import { useContract } from '../contexts/ContractContext';
import { useWallet } from '../contexts/WalletContext';

// Mock model data
const mockModel = {
  id: 1,
  name: "Advanced Image Classifier",
  description: "State-of-the-art CNN model for image classification with 95% accuracy on ImageNet. This model has been trained on millions of images and can classify over 1000 different object categories with exceptional precision.",
  category: "Computer Vision",
  price: 50,
  rating: 4.8,
  downloads: 1247,
  owner: "ALGO...X7Y9",
  accuracy: 95.2,
  size: "125 MB",
  framework: "TensorFlow",
  version: "2.1.0",
  lastUpdated: "2024-01-15",
  license: "MIT",
  isActive: true,
  features: [
    "High accuracy image classification",
    "Support for 1000+ object categories",
    "Optimized for production deployment",
    "Comprehensive documentation included",
    "Pre-trained weights available"
  ],
  technicalSpecs: {
    inputSize: "224x224x3",
    outputClasses: 1000,
    parameters: "25.6M",
    flops: "4.1B",
    memoryUsage: "512MB"
  },
  reviews: [
    {
      id: 1,
      user: "ALGO...B5C6",
      rating: 5,
      comment: "Excellent model! Works perfectly for our use case. The accuracy is impressive and the documentation is comprehensive.",
      date: "2024-01-10"
    },
    {
      id: 2,
      user: "ALGO...D7E8",
      rating: 4,
      comment: "Great performance, though the model size is a bit large for mobile deployment. Overall very satisfied.",
      date: "2024-01-08"
    },
    {
      id: 3,
      user: "ALGO...F9G0",
      rating: 5,
      comment: "Outstanding results! Integrated seamlessly into our production pipeline. Highly recommended.",
      date: "2024-01-05"
    }
  ]
};

export default function ModelDetailsPage() {
  const { id } = useParams();
  const [model, setModel] = useState(mockModel);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { client } = useContract();
  const { isConnected } = useWallet();

  const handlePurchaseModel = async () => {
    if (!client || !isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      // This would integrate with the smart contract
      console.log('Purchasing model:', id);
      alert('Purchase functionality will be implemented with smart contract integration');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
              ? 'text-yellow-400 fill-current opacity-50' 
              : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/marketplace"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Model Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{model.name}</h1>
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {model.category}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(model.rating)}
                    <span className="text-sm font-medium text-gray-700 ml-2">{model.rating}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {model.downloads.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {(model.downloads * 3.2).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{model.description}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{model.accuracy}%</div>
                  <div className="text-sm text-green-700">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{model.size}</div>
                  <div className="text-sm text-blue-700">Model Size</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{model.framework}</div>
                  <div className="text-sm text-purple-700">Framework</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{model.version}</div>
                  <div className="text-sm text-orange-700">Version</div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {model.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'technical', label: 'Technical Specs' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Model Information</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Owner:</span>
                          <span className="font-medium text-gray-900 ml-2">{model.owner}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Updated:</span>
                          <span className="font-medium text-gray-900 ml-2">{model.lastUpdated}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">License:</span>
                          <span className="font-medium text-gray-900 ml-2">{model.license}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <span className="font-medium text-green-600 ml-2">Active</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Use Cases</h4>
                      <p className="text-gray-600 leading-relaxed">
                        This model is perfect for applications requiring high-accuracy image classification, 
                        including e-commerce product categorization, content moderation, medical imaging 
                        analysis, and autonomous vehicle perception systems. The model has been extensively 
                        tested and validated across various domains.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'technical' && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(model.technicalSpecs).map(([key, value]) => (
                        <div key={key} className="p-4 bg-gray-50 rounded-xl">
                          <div className="text-sm text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-lg font-semibold text-gray-900">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-900">User Reviews</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(model.rating)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {model.rating} out of 5 ({model.reviews.length} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {model.reviews.map((review) => (
                        <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {review.user.slice(-2)}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900">{review.user}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">{model.price} ALGO</div>
                <p className="text-gray-600">One-time purchase</p>
              </div>

              <button
                onClick={handlePurchaseModel}
                disabled={loading || !isConnected}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? 'Processing...' : isConnected ? 'Purchase Model' : 'Connect Wallet'}
              </button>

              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure blockchain transaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4 text-blue-500" />
                  <span>Instant download after purchase</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  <span>Commercial license included</span>
                </div>
              </div>
            </div>

            {/* Model Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Downloads</span>
                  <span className="font-semibold text-gray-900">{model.downloads.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-semibold text-gray-900">{model.rating}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Model Size</span>
                  <span className="font-semibold text-gray-900">{model.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Framework</span>
                  <span className="font-semibold text-gray-900">{model.framework}</span>
                </div>
              </div>
            </div>

            {/* Related Models */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Models</h3>
              <div className="space-y-3">
                <Link to="/model/2" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="font-medium text-gray-900">NLP Sentiment Analyzer</div>
                  <div className="text-sm text-gray-600">35 ALGO</div>
                </Link>
                <Link to="/model/3" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="font-medium text-gray-900">Time Series Forecaster</div>
                  <div className="text-sm text-gray-600">75 ALGO</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}