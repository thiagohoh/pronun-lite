import { useState, useEffect } from 'react';

function useHasSpeechRecognition() {
    const [hasSpeech, setHasSpeech] = useState<boolean>(false)

    useEffect(()=>{
        function hasS(){
          if ("webkitSpeechRecognition" in window) {
            setHasSpeech(true);
          }
        }
        hasS()
    },[])
  return hasSpeech
}

export default useHasSpeechRecognition