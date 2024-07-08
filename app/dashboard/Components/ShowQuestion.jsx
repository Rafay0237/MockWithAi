import { Lightbulb, Volume2 } from 'lucide-react';

const ShowQuestion = ({ questions, currentIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your Browser does not support text to speech");
    }
  };

  return (
    <div className='flex flex-col border rounded-md rounder-md p-5 justify-evenly'>
      <div className='flex flex-wrap gap-3 font-[500]'>
        {questions?.map((q, index) => (
          <h2
            className={`border rounded-3xl p-2 px-3 text-sm ${
              currentIndex === index ? "bg-primary text-white" : "bg-gray-200"
            }`}
            key={index}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      <h2 className='text-[16px] my-7'>{questions && questions[currentIndex]?.question}</h2>
      <h2 className='h-10'>
        <Volume2
          className='hover:cursor-pointer'
          onClick={() => textToSpeech(questions[currentIndex]?.question)}
        />
      </h2>

      <div className='flex flex-col gap-3 p-4 mt-5 bg-blue-50 border text-[12px] rounded-md text-blue-900'>
        <h2 className='flex items-center gap-1'>
          <Lightbulb /> Note:
        </h2>
        <h2>{process.env.NEXT_PUBLIC_INTERVIEW_NOTE}</h2>
      </div>
    </div>
  );
};

export default ShowQuestion;
