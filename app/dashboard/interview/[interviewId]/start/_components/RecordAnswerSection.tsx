"use client"
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from '@google/generative-ai';

type ResultType = {
    speechBlob?: Blob;
    timestamp: number;
    transcript: string;
};
interface InterviewQuestion {
    question: string;
}

interface InterViewQuestionProps {
    mockInterviewQuestion: InterviewQuestion[];
    activeQuestionIndex: number;
}

const RecordAnswerSection: React.FC<InterViewQuestionProps> = ({ mockInterviewQuestion, activeQuestionIndex }) => {
    const [userAnswer, setUserAnswer] = useState<string>('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    // Update userAnswer when results change
    useEffect(() => {
        const combinedResults = (results as ResultType[]).map((result) => result?.transcript).join(' ');
        setUserAnswer(combinedResults);
    }, [results]);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? (() => { throw new Error("Database URL is undefined"); })());
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const SaveUserAnswer = async () => {
        if (isRecording) {
            stopSpeechToText();
            if (userAnswer.length < 10) {
                toast('Error while saving your answer, please record again');
                return;
            }
            toast('Answer saved successfully');
            const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestionIndex]?.question +
                ". User Answer: " + userAnswer +
                ". Based on the question and user answer, please provide a rating for the answer (1 to 5) and feedback as areas of improvement, if any. " +
                "Make sure the output is in plain JSON format without any formatting markers like '```json' or '```'. " +
                "The response should include two fields: 'rating' and 'feedback', and keep the feedback concise (3 to 5 lines).";

            const result = await model.generateContent(feedbackPrompt);
            const MockJsonResp = JSON.parse((result.response.text()));
            console.log(MockJsonResp)
        } else {
            startSpeechToText();
        }
    };

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
            <Button variant="outline" className='my-10 font-bold' onClick={SaveUserAnswer}>
                {isRecording ? <h2 className='text-red-600 flex gap-2'><Mic />Stop Recording</h2> : 'Record Answer'}
            </Button>
            <Button onClick={() => console.log(userAnswer)}>Show user answer</Button>
        </div>
    );
}

export default RecordAnswerSection;
