"use client"
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

type ResultType = {
    speechBlob?: Blob;
    timestamp: number;
    transcript: string;
};
interface InterviewQuestion {
    question: string;
    answer: string;
}
interface InterviewData {
    mockId: string;
}

interface InterViewQuestionProps {
    mockInterviewQuestion: InterviewQuestion[];
    activeQuestionIndex: number;
    interviewData: InterviewData
}



const RecordAnswerSection: React.FC<InterViewQuestionProps> = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState<string>('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    const { user } = useUser();
    const [loading, setloading] = useState<boolean>(false);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? (() => { throw new Error("Database URL is undefined"); })());
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    // Update userAnswer when results change
    useEffect(() => {
        const combinedResults = (results as ResultType[]).map((result) => result?.transcript).join(' ');
        setUserAnswer(combinedResults);
        console.log("useranser", userAnswer);
    }, [results]);
    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer();
        }
    }, [userAnswer])

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();

            toast('Answer saved successfully');
        }
        else {
            startSpeechToText();
        }
    };
    const UpdateUserAnswer = async () => {
        console.log(userAnswer);
        setloading(true)
        const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestionIndex]?.question +
            ". User Answer: " + userAnswer +
            ". Based on the question and user answer, please provide a rating for the answer (1 to 5) and feedback as areas of improvement, if any. " +
            "Make sure the output is in plain JSON format without any formatting markers like '```json' or '```'. " +
            "The response should include two fields: 'rating' and 'feedback', and keep the feedback concise (3 to 5 lines).";

        const result = await model.generateContent(feedbackPrompt);
        const JsonFeedbackResp = JSON.parse((result.response.text()));
        console.log(JsonFeedbackResp)
        const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId || "",
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            reatedAt: moment().format('DD-MM-yyyy')
        });


        if (resp) {
            toast('User Answer recorded successfully');
            setUserAnswer('');
            setResults([]);
        }
        setResults([]);
        setloading(false);
    }


    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
                <Image src={'/webcam.png'} width={200} height={200} alt='webcam image' className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            <Button disabled={loading} variant="outline" className='my-10 font-bold' onClick={StartStopRecording}>
                {isRecording ? <h2 className='text-red-600 flex gap-2'><StopCircle />Stop Recording</h2> : <h2 className='text-blue-600 flex gap-2 items-center'><Mic /> Record Answer</h2>}
            </Button>
        </div>
    );
}

export default RecordAnswerSection;
