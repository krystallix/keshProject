// src/api.ts

import axios from 'axios';
import type { Members } from '@/components/dataTable/data/columns';
import { useToast } from '@/components/ui/toast';
import { h } from 'vue';
import eventBus from '@/eventBus'; // Import the event bus


export async function fetchMembers(role?: string): Promise<Members[]> {
    try {
        const userState = localStorage.getItem('userState');
        const token = userState ? JSON.parse(userState).token : '';

        const response = await axios.get('http://localhost:5000/api/members', {
            params: { role },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return (response.data as Members[]).map((member, index) => ({
            ...member,
            number: index + 1
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


export async function updateMember(formData: FormData, closeDialog: () => void) {
    try {
        const userState = localStorage.getItem('userState');
        const token = userState ? JSON.parse(userState).token : '';


        const values = JSON.stringify(Object.fromEntries(formData.entries()));

        console.log(values)
        const response = await axios.put('http://localhost:5000/api/update-member', values, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Use application/json for JSON data
            }
        });
        eventBus.emit('data-updated'); // Emit event on success

        const { toast } = useToast();
        toast({
            title: response.data,
            description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(response.data, null, 2))),
            // duration: 1000 // Ensure it hides after 5 seconds
        });

        closeDialog(); // Close the dialog on success

    } catch (error) {
        let errorMessage = 'Failed to submit the form.';

        if (axios.isAxiosError(error) && error.response) {
            console.error('Axios Error:', error.response.data);
            errorMessage = error.response.data.message || 'Unknown error occurred';
        } else {
            console.error('General Error:', error);
        }

        const { toast } = useToast();
        toast({
            variant: 'destructive',
            title: 'Error',
            description: errorMessage,
            // duration: 1000 // Ensure it hides after 5 seconds

        });
    }
}


export async function deleteMember(formData: FormData, closeDialog: () => void) {
    try {
        const userState = localStorage.getItem('userState');
        const token = userState ? JSON.parse(userState).token : '';

        const values = JSON.stringify(Object.fromEntries(formData.entries()));

        const response = await axios.delete('http://localhost:5000/api/delete-member', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Use application/json for JSON data
            },
            data: values // Mengirimkan data di body request
        });

        eventBus.emit('data-updated'); // Emit event on success

        const { toast } = useToast();
        toast({
            title: response.data,
            description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(response.data, null, 2))),
            // duration: 1000 // Ensure it hides after 5 seconds
        });

        closeDialog(); // Close the dialog on success

    } catch (error) {
        let errorMessage = 'Failed to submit the form.';

        if (axios.isAxiosError(error) && error.response) {
            console.error('Axios Error:', error.response.data);
            errorMessage = error.response.data.message || 'Unknown error occurred';
        } else {
            console.error('General Error:', error);
        }

        const { toast } = useToast();
        toast({
            variant: 'destructive',
            title: 'Error',
            description: errorMessage,
            // duration: 1000 // Ensure it hides after 5 seconds
        });
    }
}


export async function addMember(newMember: {
    name: string;
    rt: string;
    role: string;
    phone_number: string;
}, closeDialog: () => void) {
    try {
        const userState = localStorage.getItem('userState');
        const token = userState ? JSON.parse(userState).token : '';

        const response = await axios.post('http://localhost:5000/api/add-member', newMember, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const { toast } = useToast();
        toast({
            title: response.data,
            description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(newMember, null, 2))),
            // duration: 1000 // Ensure it hides after 5 seconds

        });

        // Close the dialog after success
        closeDialog();
    } catch (error) {
        let errorMessage = 'Failed to submit the form.';

        if (axios.isAxiosError(error) && error.response) {
            console.error('Axios Error:', error.response.data);
            errorMessage = error.response.data.message || 'Unknown error occurred';
        } else {
            console.error('General Error:', error);
        }

        const { toast } = useToast();
        toast({
            variant: 'destructive',
            title: 'Error',
            description: errorMessage,
            // duration: 1000 // Ensure it hides after 5 seconds

        });
    }
}
