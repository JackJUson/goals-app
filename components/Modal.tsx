import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Button } from '@/components/ui/button';
import { CardWithForm } from './Card';
import { TextareaForm } from './Form';

export function AlertDialogDemo() {
  // Handler for form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.currentTarget);
    const title = formData.get('goal-title') as string;
    const description = formData.get('goal-description') as string;

    try {
      // Send a POST request to the backend
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create goal');
      }

      // Process the response
      const goal = await response.json();
      console.log('Goal created:', goal);

      // Optionally, clear the form, close the modal, or show a success message
    } catch (error) {
      console.error('Error creating goal:', error);
      // Optionally, show an error message to the user
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>Create Goal</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <CardTitle className='text-3xl font-bold'>What is your Goal?</CardTitle>
            <CardDescription>What goal would you like to achieve in 12 weeks?</CardDescription>
          </AlertDialogHeader>

          <div className='flex flex-col space-y-3 my-5'>
            <Label htmlFor='goal-title'>Goal Title</Label>
            <Input id='goal-title' name='goal-title' placeholder='Name of your goal' />
          </div>
          <div className='flex flex-col space-y-3 my-3'>
            <Label htmlFor='goal-description'>Goal Description</Label>
            <Textarea
              id='goal-description'
              name='goal-description'
              placeholder='Tell us a little bit about the goal'
              className='resize-none'
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogAction type='submit'>Submit</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
