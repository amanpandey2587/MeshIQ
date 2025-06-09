import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Download, Eye, TrendingUp, Brain, Users } from 'lucide-react';
import { useContract } from '../contexts/ContractContext';
import { useWallet } from '../contexts/WalletContext';

interface Model {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  downloads: number;
  owner: string;
  accuracy: number;
  size: string;
  framework: string;
  isActive: boolean;
}

// Mock data for demonstration
const mockModels: Model[] = [
  {
    id: 1,
    name: "Advanced Image Classifier",
    description: "State-of-the-art CNN model for image classification with 95% accuracy on ImageNet",
    category: "Computer Vision",
    price: 50,
    rating: 4.8,
    downloads: 1247,
    owner: "ALGO...X7Y9",
    accuracy: 95.2,
    size: "125 MB",
    framework: "TensorFlow",
    isActive: true
  },
  {
    id: 2,
    name: "NLP Sentiment Analyzer",
    description: "BERT-based model for sentiment analysis with multilingual support",
    category: "Natural Language",
    price: 35,
    rating: 4.6,
    downloads: 892,
    owner: "ALGO...A3B4",
    accuracy: 92.8,
    size: "340 MB",
    framework: "PyTorch",
    isActive: true
  },
  {
    id: 3,
    name: "Time Series Forecaster",
    description: "LSTM model optimized for financial time series prediction",
    category: "Finance",
    price: 75,
    rating: 4.9,
    downloads: 634,
    owner: "ALGO...M8N2",
    accuracy: 88.5,
    size: "89 MB",
    framework: "TensorFlow",
    isActive: true
  },
  {
    id: 4,
    name: "Medical Image Segmentation",
    description: "U-Net architecture for precise medical image segmentation",
    category: "Healthcare",
    price: 120,
    rating: 4.7,
    downloads: 456,
    owner: "ALGO...K5L6",
    accuracy: 94.1,
    size: "256 MB",
    framework: "PyTorch",
    isActive: true
  },
  {
    id: 5,
    name: "Speech Recognition Engine",
    description: "Transformer-based ASR model with real-time processing capabilities",
    category: "Audio",
    price: 90,
    rating: 4.5,
    downloads: 723,
    owner: "ALGO...P9Q1",
    accuracy: 96.3,
    size: "412 MB",
    framework: "TensorFlow",
    isActive: true
  },
  {
    id: 6,
    name: "Recommendation System",
    description: "Collaborative filtering model for e-commerce recommendations",
    category: "Recommendation",
    price: 45,
    rating: 4.4,
    downloads: 1089,
    owner: "ALGO...R7S8",
    accuracy: 87.9,
    size: "67 MB",
    framework: "Scikit-learn",
    isActive: true
  }
];

export default function MarketplacePage() {
  const [models, setModels] = useState<Model[]>(mockModels);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [loading, setLoading] = useState(false);
  
  const { client } = useContract();
  const { isConnected } = useWallet();

  const categories = ['All', 'Computer Vision', 'Natural Language', 'Finance', 'Healthcare', 'Audio', 'Recommendation'];

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory;
    return matchesSearch && matchesCategory && model.isActive;
  });

  const sortedModels = [...filteredModels].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default: // popularity
        return b.downloads - a.downloads;
    }
  });

  const handlePurchaseModel = async (modelId: number) => {
    if (!client || !isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      // This would integrate with the smart contract
      console.log('Purchasing model:', modelId);
      alert('Purchase functionality will be implemented with smart contract integration');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ML Model Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and purchase high-quality machine learning models from our curated marketplace
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[180px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[160px]"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedModels.map((model) => (
            <div key={model.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
              {/* Model Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {model.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{model.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {model.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {model.description}
                </p>

                {/* Model Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Accuracy:</span>
                    <span className="font-semibold text-green-600 ml-1">{model.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Size:</span>
                    <span className="font-semibold text-gray-700 ml-1">{model.size}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Framework:</span>
                    <span className="font-semibold text-gray-700 ml-1">{model.framework}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="font-semibold text-gray-700">{model.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Model Footer */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{model.price}</span>
                    <span className="text-gray-500 ml-1">ALGO</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    by {model.owner}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/model/${model.id}`}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                  <button
                    onClick={() => handlePurchaseModel(model.id)}
                    disabled={loading || !isConnected}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Purchase'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedModels.length === 0 && (
          <div className="text-center py-16">
            <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No models found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse different categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}