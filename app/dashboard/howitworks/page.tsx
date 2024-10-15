import React from 'react';

const HowitWorks = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-center text-green-600 mb-6 animate-pulse">
                How It Works
            </h1>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <p className="text-lg text-gray-700 mb-4">
                    Tap on the URL given to enter a beautiful login page where you need to sign up if you are a new user. If you're an existing user, simply log in. There are several options available for signing up: GitHub, LinkedIn, or email.
                </p>
                <div className="my-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        <p className="text-lg text-gray-700">
                            After signing up, you will be redirected to the home page where you can enter the details regarding the interview you want to give.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        <p className="text-lg text-gray-700">
                            Once you've provided the details, tap on "Start Interview." You will then be redirected to your interview page.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        <p className="text-lg text-gray-700">
                            Here, you'll be prompted to turn on your webcam and microphone, and you will face a set of questions to answer.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        <p className="text-lg text-gray-700">
                            After answering all the questions, tap "End Interview" which will direct you to the feedback page.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        <p className="text-lg text-gray-700">
                            On the feedback page, you can view your answers along with the appropriate answers, as well as your rating and feedback for improvement.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        <p className="text-lg text-gray-700">
                            Finally, you can tap on "Go Home," which will redirect you to the home page.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowitWorks;
