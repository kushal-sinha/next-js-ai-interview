import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

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

interface InterviewItemCardProps {
    interview: Interview;
}

function InterviewItemCard({ interview }: InterviewItemCardProps) {
    const router = useRouter();
    const onStart = () => {
        router.push('./dashboard/interview/' + interview.mockId)

    }

    const onFeedbackPress = () => {
        router.push('./dashboard/interview/' + interview.mockId + "/feedback")
    }
    return (
        <div className="border shadow-sm rounded-lg p-3">
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-grey-600'>{interview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-grey-400'>Created At: {interview?.createdAt}</h2>
            <div className='flex justify-between mt-2 gap-5'>
                <Button size="sm" variant="outline" className='w-full' onClick={onFeedbackPress}>Feedback</Button>
                <Button size="sm" className='w-full' onClick={onStart}>Start</Button>
            </div>

        </div>
    );
}

export default InterviewItemCard;
