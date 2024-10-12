"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Webcam from "react-webcam";
import { Button } from '@/components/ui/button';


interface InterViewProps {
    params: {
        interviewId: string;
    };
}


const Interview: React.FC<InterViewProps> = ({ params }) => {
    const [interviewData, setInterviewData] = useState<any>(null);
    const [webCamEnable, setWebCamEnable] = useState(false)
    useEffect(() => {
        console.log("InterView Id", params.interviewId)
        GetInterviewDetails();
    }, []);
    /**
     * Used to Get InterView Details by MockId/Interview Id
     */
    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        console.log(result);
        setInterviewData(result[0])
    }
    return (



        <div className='my-10 flex justify-center flex-col items-center'>
            <h2 className='font-bold text-2xl animate-bounce'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>

                <div className='flex flex-col mt-8 gap-5 p-5 border rounded-lg'>
                    <div className='flex flex-col p-5  rounded-lg'>
                        {interviewData ? (
                            <>
                                <h2 className='text-lg'><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
                                <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong> <span>{interviewData.joDesc}</span></h2>
                                <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
                            </>
                        ) : (
                            <p>Loading interview details...</p>
                        )}
                    </div>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100 '>
                        <h2 className='flex gap-2 items-center text-yellow-500'> <Lightbulb /><strong>Information </strong></h2>
                        <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>
                <div>
                    {webCamEnable ? <Webcam
                        onUserMedia={() => setWebCamEnable(true)}
                        onUserMediaError={() => setWebCamEnable(false)}
                        mirrored={true}
                        style={{
                            height: 300,
                            width: 300
                        }} /> :
                        <>
                            <WebcamIcon className='h-72 w-72 my-7 p-20 bg-secondary rounded-lg border' />
                            <Button className='flex px-10' onClick={() => setWebCamEnable(true)}>Enable Web Cam and Microphone</Button>
                        </>
                    }
                </div>
            </div>



        </div>
    )
}

export default Interview;
