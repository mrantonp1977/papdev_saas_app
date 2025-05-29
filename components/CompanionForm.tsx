'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { subjects } from '@/constants';
import { Textarea } from './ui/textarea';
import { createCompanion } from '@/lib/actions/companion.actions';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required and must be at least 1 character long.',
  }),
  subject: z.string().min(1, {
    message: 'Subject is required and must be at least 1 character long.',
  }),
  topic: z.string().min(1, {
    message: 'Topic is required and must be at least 1 character long.',
  }),
  voice: z.string().min(1, {
    message: 'Voice is required and must be at least 1 character long.',
  }),
  style: z.string().min(1, {
    message: 'Style is required and must be at least 1 character long.',
  }),
  duration: z.coerce.number().min(1, {
    message: 'Duration is required and must be at least 1 character long.',
  }),
});

const CompanionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      subject: '',
      topic: '',
      voice: '',
      style: '',
      duration: 15,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const companion = await createCompanion(values);

      if (companion) {
        redirect(`/companions/${companion.id}`);
      } else {
        console.log('Error creating companion');
        redirect('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-4 bg-amber-100 shadow-orange-600 shadow-md border-orange-600 p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the companion name"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        value={subject}
                        key={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex. Derivates & Integrals"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer text-md bg-orange-500 hover:bg-orange-500"
        >
          {isSubmitting ? 'Building...' : 'Build Your Companion'}
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
