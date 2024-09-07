import { Textarea } from '@/components/ui/textarea';

const AnswerInText = ({answer,setAnswer}) => {
  return (
    <>
      <h2 className='text-red-600'> Speech to text is not supported on your browser.</h2>
       <h2 className='mt-3 underline font-serif'>Type your answer</h2>

       <div className='flex flex-col justify-center gap-3  h-full'>
       <label className="text-black text-sm ">Your Answer: </label>
        <Textarea className="text-sm" rows={5}
        placeholder="Write a breif answer, max 200 words."
        value={answer}
        required maxLength={300}
        onChange={(e)=>setAnswer(e.target.value)}/>
      </div>
    </>
  )
}

export default AnswerInText
