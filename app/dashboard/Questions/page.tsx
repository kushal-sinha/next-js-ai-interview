import React from 'react';

function Questions() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-500 hover:scale-105">
                <h1 className="text-3xl font-bold text-blue-600 mb-4 animate-bounce">
                    Still on the Way!
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    We're working hard to bring you the best interview questions.
                </p>
                <p className="text-md text-gray-500 mb-6">
                    Please hang tight while we prepare the content for you.
                </p>
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
                </div>
            </div>
        </div>
    );
}

export default Questions;
