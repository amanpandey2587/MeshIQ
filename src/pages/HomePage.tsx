import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Users, Shield, Zap, ArrowRight, Star, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              The Future of
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ML Collaboration
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover, trade, and collaboratively train machine learning models in a decentralized marketplace powered by federated learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/marketplace"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/federated-learning"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Start Training
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionizing ML Development
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines the power of blockchain with cutting-edge federated learning technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Marketplace</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover and purchase high-quality ML models from a curated marketplace with transparent pricing and reviews.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Federated Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Collaborate on model training without sharing sensitive data, ensuring privacy while improving model performance.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Transparent</h3>
              <p className="text-gray-600 leading-relaxed">
                Built on Algorand blockchain ensuring secure transactions, transparent governance, and immutable records.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Rewards</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn tokens for contributing to federated learning sessions and get rewarded for model improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-yellow-500 mr-2" />
                <span className="text-4xl font-bold text-gray-900">1,247</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ML Models</h3>
              <p className="text-gray-600">Available in our marketplace</p>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-500 mr-2" />
                <span className="text-4xl font-bold text-gray-900">5,832</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Active Users</h3>
              <p className="text-gray-600">Contributing to federated learning</p>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-500 mr-2" />
                <span className="text-4xl font-bold text-gray-900">98.7%</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Success Rate</h3>
              <p className="text-gray-600">For federated training sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your ML Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of developers and researchers who are already building the future of machine learning.
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}