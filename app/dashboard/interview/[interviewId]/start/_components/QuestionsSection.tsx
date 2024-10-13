import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

interface InterviewQuestion {
    question: string;
}

interface InterViewQuestionProps {
    mockInterviewQuestion: InterviewQuestion[];
    activeQuestionIndex: number;
}

const QuestionsSection: React.FC<InterViewQuestionProps> = ({ mockInterviewQuestion, activeQuestionIndex }) => {
    //textToSpeech is implemented for the speak feature of the question
    const textToSpeech = (text: string | undefined) => {
        if ('speechSynthesis' in window) {
            if (text) {
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
            }
        } else {
            console.error("Sorry, your browser does not support text-to-speech.");
        }
    };

    return (
        <div className='p-5 border rounded-lg my-10'>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.isArray(mockInterviewQuestion) && mockInterviewQuestion.length > 0 ? (
                    mockInterviewQuestion.map((item, index) => (
                        <div key={index}>
                            <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index ? 'bg-blue-600 text-white' : ''}`}>
                                Question #{index + 1}
                            </h2>
                        </div>
                    ))
                ) : (
                    <p>No questions available.</p>
                )}
            </div>
            <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
            <Volume2
                className="cursor-pointer"
                onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
            />
            <div className="border rounded-lg p-5 bg-blue-100 mt-20">
                <h2 className="flex gap-2 items-center text-blue-600">
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <h2 className="text-sm text-primary my-2">{process.env.NEXT_PUBLIC_INTERVIEW_INFORMATION}</h2>
            </div>
        </div>
    );
}

export default QuestionsSection;
