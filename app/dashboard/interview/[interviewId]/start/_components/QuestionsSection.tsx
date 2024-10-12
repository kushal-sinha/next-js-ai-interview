import { Lightbulb } from "lucide-react";

interface InterviewQuestion {
    question: string; // Structure based on your data

}

interface InterViewQuestionProps {
    mockInterviewQuestion: InterviewQuestion[]; // This should be an array of InterviewQuestion objects
    activeQuestionIndex: number
}

const QuestionsSection: React.FC<InterViewQuestionProps> = ({ mockInterviewQuestion, activeQuestionIndex }) => {
    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-10'>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.isArray(mockInterviewQuestion) && mockInterviewQuestion.length > 0 ? (
                    mockInterviewQuestion.map((item, index) => (
                        <div key={index}>
                            <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index && 'bg-blue-600 text-white'}`}>Question #{index + 1}</h2>
                        </div>
                    ))
                ) : (
                    <p>No questions available.</p> // Provide feedback if there are no questions
                )}
            </div>
            <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
            <div className="border rounded-lg p-5 bg-blue-100">
                <h2 className="flex gap-2 items-center text-blue-500">
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
            </div>
        </div>
    );
}
export default QuestionsSection;