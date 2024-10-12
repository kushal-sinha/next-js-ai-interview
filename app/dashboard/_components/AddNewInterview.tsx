"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader, LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/router';



function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setloading] = useState(false)
    const [jsonRespose, setJsonResponse] = useState([]);
    const router = useRouter()
    const { user } = useUser();
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? (() => { throw new Error("Database URL is undefined"); })());
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setloading(true);
        e.preventDefault();
        console.log(jobPosition, jobDescription, jobExperience);

        const InputPrompt = "Job position: " + jobPosition + " , Job Description:" + jobDescription + ",  Years of Experience:" + jobExperience + ", Depending on the Job Position , Job Description and years of Experience give top " + process.env.NEXT_AI_MOCK_INTERVIEW + " most important and most frequently asked questions in an interview along with answers in JSON format , Give questions and answer field on JSON  give me the output in the proper JSON format with no syntax  issues that could cause problem when i parse it with JSON.parse remove the top ```json and the bottom ```json";


        const result = await model.generateContent(InputPrompt);
        const MockJsonResp = JSON.parse((result.response.text()));
        setJsonResponse(MockJsonResp)
        if (MockJsonResp) {
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: JSON.stringify(MockJsonResp), // Ensure it is a string
                jobPosition: jobPosition,
                joDesc: jobDescription,
                jobExperience: jobExperience,
                createBy: user?.primaryEmailAddress?.emailAddress || 'unknown',
                createdAt: moment().format('DD-MM-yyyy')
            }).returning({ mockId: MockInterview.mockId });
            console.log("Inserted ID", resp);
            if (resp) {
                setOpenDialog(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId)
            }
        }
        else {
            console.log("Error");
        }
        setloading(false);
    }
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-10 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='text-lg text-center '>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onsubmit}>
                                <div>
                                    <h2>Add Details about your job position/role, Job description and years of experience</h2>
                                    <div className='mt-7 my-2'>
                                        <label>Job Role/Job Position</label>
                                        <Input placeholder='Ex. Full Stack Devloper' required onChange={(event) => setJobPosition(event.target.value)} ></Input>
                                    </div>
                                    <div className=' my-3'>
                                        <label>Job Description/ Tech Stack (In short)</label>
                                        <Textarea placeholder='Angular , React , MySql , NodeJs' required onChange={(event) => setJobDescription(event.target.value)} />
                                    </div>

                                    <div className=" my-3">
                                        <label>Years of Experience</label>
                                        <Input placeholder='Ex.5' type='number' max={100} required onChange={(event) => setJobExperience(event.target.value)}></Input>
                                    </div>
                                </div>
                                <div className='  flex gap-5 justify-end'>
                                    <Button type='button' className='font-bold' variant="ghost" onClick={() => { setOpenDialog(false) }}>Cancel</Button>
                                    <Button disabled={loading} type='submit' className='font-bold' >
                                        {loading ? <> <LoaderCircle className='animate-spin' />'Generating from AI' </> : 'start InterView'}</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default AddNewInterview