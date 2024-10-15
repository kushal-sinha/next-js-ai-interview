"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm';
import { desc } from 'drizzle-orm';
import InterviewItemCard from './InterviewItemCard';
interface Interview {
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    joDesc: string;
    jobExperience: string;
    createBy: string;
    createdAt: string;
    mockId: string;
}

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState<Interview[]>([]);
    useEffect(() => {

        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createBy, user?.primaryEmailAddress?.emailAddress || 'unknown'))
            .orderBy(desc(MockInterview.id))
        console.log(result);
        setInterviewList(result)
    }
    return (
        <div>
            <h2 className='font-bold text-xl'>Previous Mock Interview</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                {interviewList && interviewList.map((interview, index: number) => (
                    <InterviewItemCard
                        interview={interview}
                        key={index} />
                ))}
            </div>
        </div>
    )
}

export default InterviewList