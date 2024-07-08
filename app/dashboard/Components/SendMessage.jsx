"use client"

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      from_name: email,
      to_name:"Abdul Rafay",
      message:message,
    };

    emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID, 
      process.env.NEXT_PUBLIC_TEMPLATE_ID, 
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSending(false);
      setSent(true);
      setMessage('');
      setEmail('');
    }, (err) => {
      console.error('FAILED...', err);
      setSending(false);
      setError(err);
    });
  };

  return (
    <div className='w-full sm:w-2/3 lg:w-1/2 border shadow-md p-5 rounded-md '>
      
      <form onSubmit={sendEmail} className='flex flex-col gap-4 text-sm '>
       <div className='text-lg font-semibold text-gray-500 mb-2'>
        Send us any messages for any info.
       </div>
        <div className='flex gap-2 '>
          <label htmlFor="email"
          className='w-24 text-[16px] pt-1'>Name:</label>
          <input 
          className='p-2 border border-gray-400 rounded-sm w-full md:w-2/3 '
            type="text" 
            id="email" 
            name="email" 
            placeholder='Your name or email.'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='flex gap-2'>
          <label htmlFor="message" className='w-24 text-[16px] pt-1'>Message:</label>
          <textarea 
            className='p-2 border border-gray-400 rounded-sm w-full md:w-2/3 '
            id="message" 
            placeholder='Your message here.'
            name="message" 
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className='text-end mr-[12%]'>
        <Button type="submit" disabled={sending} className="w-24 h-9 bg-orange-600 hover:bg-orange-600 hover:opacity-95 ">
          {sending ? 
          <Loader2 className='animate-spin'/>
          : 'Send'}
        </Button>
        </div>
        
      </form>
      <div className='text-sm h-5 pt-2 sm:pt-0 -mb-3 '>
      {sent && <p className='text-green-700'>Message sent successfully!</p>}
      {error && <p className='text-red-700'>Failed to send message. Please try again later.</p>}
      </div>
    </div>
  );
};

export default SendMessage;
