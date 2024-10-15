"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface InterViewProps {
    params: {
        interviewId: string;
    };
}

interface FeedbackItem {
    id: number;
    mockIdRef: string;
    question: string;
    correctAns: string;
    userAns: string;
    feedback: string | null;
    rating: string | null;
    userEmail: string | null;
    reatedAt: string | null;
}

const Feedback: React.FC<InterViewProps> = ({ params }) => {
    const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, []);

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);
        console.log(result);
        setFeedbackList(result);
    };

    // Calculate the overall rating
    const calculateOverallRating = () => {
        const totalRating = feedbackList.reduce((sum, item) => {
            // Convert rating to a number, use 0 if it's null
            const rating = item.rating ? parseFloat(item.rating) : 0;
            return sum + rating;
        }, 0);

        // Calculate the average rating
        const averageRating = feedbackList.length > 0 ? totalRating / feedbackList.length : 0;
        return averageRating.toFixed(1); // Round to one decimal place
    };

    return (
        <div className='p-10'>
            <h2 className='text-3xl font-bold text-green-500 animate-pulse'>Congratulations!</h2>
            <h2 className='text-2xl font-bold'>Here is your interview feedback</h2>
            {feedbackList.length === 0 ?
                <h2 className='font-bold text-xl text-grey-500'>No interview Feedback Record Found</h2> : <>
                    <h2 className='text-primary text-lg my-3'>
                        Your overall interview rating: <strong>{calculateOverallRating()}/10</strong>
                    </h2>
                    <h2 className='text-sm text-gray-500'>Find below interview questions with correct answers, your answers, and feedback for improvement</h2>
                    {feedbackList.map((item: FeedbackItem, index: number) => (
                        <Collapsible key={index} className='mt-7'>
                            <CollapsibleTrigger className='p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full'>
                                {item.question}
                                <ChevronsUpDown className='h-5 w-5' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong> {item.rating}</h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong> {item.userAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:</strong> {item.correctAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-primary-50 text-sm text-primary'><strong>Feedback:</strong> {item.feedback}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            }

            <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    );
};

export default Feedback;
