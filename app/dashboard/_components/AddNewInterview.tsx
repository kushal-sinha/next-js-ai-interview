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


function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobExperience, setJobExperience] = useState('');

    const onsubmit = (e: any) => {
        e.preventDefault();
        console.log(jobPosition, jobDescription, jobExperience);
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
                                    <Button type='submit' className='font-bold' >Start InterView</Button>
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