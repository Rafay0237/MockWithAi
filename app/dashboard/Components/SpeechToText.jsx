import { Ghost,Mic } from 'lucide-react';
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';



const SpeechToText = ({setAnswer}) => {
    const {toast}=useToast()
    const {
        isRecording,
        interimResult,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      

      const saveSpeech=async()=>{
        if(isRecording){
          stopSpeechToText()
          if(interimResult.length<10){
            toast({
              title: "Too Short Answer!",
              description: "Answer should be more than 5 words, Record again",
            })
          }else{
            setAnswer(interimResult)
          }
        }else{
          startSpeechToText()
        }
        }

  return (
    <>
      <Button className={"gap-2 w-40 border "+(isRecording?" bg-red-700 hover:bg-red-600  text-white":"bg-slate-100 hover:bg-slate-200 ")}
        variant={Ghost}
        onClick={saveSpeech}>
        <Mic/>
        {isRecording ? 'Stop Recording' : 'Record Answer'}</Button>
    </>
  )
}

export default SpeechToText
