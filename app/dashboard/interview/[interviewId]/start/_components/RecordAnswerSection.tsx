"use client"
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic } from 'lucide-react';
interface ResultType {
    transcript: string;
}

function RecordAnswerSection() {
    const [userAnswer, setUserAnswer] = useState<String>('');
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
    useEffect(() => {
        const combinedResults = (results as ResultType[]).map((result) => result?.transcript).join(' ');
        setUserAnswer(combinedResults);
    }, [results]);



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
                    }
                    }
                />
            </div>
            <Button variant="outline" className='my-10 font-bold' onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                {isRecording ? <h2 className='text-red-600 flex gap-2'>
                    <Mic />Stop Recording</h2> : 'Record Answer'}</Button>

            <Button onClick={() => console.log(userAnswer)}>Show user answer</Button>
        </div>
    )
}

export default RecordAnswerSection