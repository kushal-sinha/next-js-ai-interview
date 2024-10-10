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


function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-10 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='text-lg text-center '>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                            <div className='  flex gap-5 justify-end'>
                                <Button className='font-bold' variant="ghost">Cancel</Button>
                                <Button className='font-bold' >Start InterView</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default AddNewInterview