"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import QuestionSection from "./_components/QuestionsSection"
import RecordAnswerSection from './_components/RecordAnswerSection';


interface InterViewProps {
    params: {
        interviewId: string;
    };
}

const StartInterView: React.FC<InterViewProps> = ({ params }) => {
    const [interviewData, setInterviewData] = useState<any>(null);
    const [mockInterviewQuestion, setMockInterViewQuestions] = useState([]); // Initialize as an empty array
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    // Fetch interview details when the component mounts
    useEffect(() => {
        GetInterviewDetails();
    }, []); // Empty dependency array to run only on mount

    // Function to get interview details
    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log("questions", jsonMockResp.questions); // Log the questions array
        setMockInterViewQuestions(jsonMockResp.questions); // Set the questions array
        setInterviewData(result[0]);
        console.log(mockInterviewQuestion); // This should log the questions array now
    }


    // Log the updated mockInterviewQuestion whenever it changes
    useEffect(() => {
        console.log("Updated mockInterviewQuestion:", mockInterviewQuestion);
    }, [mockInterviewQuestion]);

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex} />

                {/* Video/Audio Recording */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData} />
            </div>
        </div>
    );
};

export default StartInterView;
