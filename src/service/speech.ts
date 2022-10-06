export default function speechTool(
    phrase : string,
    onError: (error: string, word:string) => void,
    onSuccess: (success: string) => void,
    lang?:string,
    onSpeechStartEnd?: (b:boolean) => void
  ) {
    const SpeechRecognition =
      //   @ts-ignore
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      //   @ts-ignore
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent =
      //   @ts-ignore
      window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
  
    const recognition = new SpeechRecognition();
    let speechRecognitionList = new SpeechGrammarList(); // list that countains our grammar
    let grammar = "#JSGF V1.0; grammar phrase ; public <phrase > = " + phrase  + ";"; // formart version; type of term; public rule; <recognized name>
    
    speechRecognitionList.addFromString(grammar, 1); // add the grammar to the list
    recognition.grammars = speechRecognitionList;
    recognition.lang = lang? lang : "en-US"; //set language
    recognition.interimResults = false; //Interim results or final results false = final
    recognition.maxAlternatives = 1; // number of alternatives -- MAY BE USEFULL
  
    recognition.start();
  
    recognition.onresult = function (event: any) {
      var speechResult = event.results[0][0].transcript.toLowerCase();
  
      if (speechResult === phrase.toLowerCase()) {
        onSuccess(event.results[0][0].confidence);
      } else {
        onError(event.results[0][0].confidence, speechResult);
      }
  
      return "Confidence: " + event.results[0][0].confidence;
    };
  
    recognition.onspeechend = function () {
      if(onSpeechStartEnd) onSpeechStartEnd(false)
      recognition.stop();
    };
  
    recognition.onerror = function (event: { error: any }) {
      onError(`NO SPEECH ${event.error}`,'no speech');
      if(onSpeechStartEnd) onSpeechStartEnd(false)

      return event;
    };
  
    recognition.onaudiostart = function (event: any) {
      //Fired when the user agent has started to capture audio.
      if(onSpeechStartEnd) onSpeechStartEnd(true)
      console.log("SpeechRecognition.onaudiostart", event);
    };
  
    recognition.onaudioend = function (event: any) {
      //Fired when the user agent has finished capturing audio.
      console.log("SpeechRecognition.onaudioend", event);
    };
  
    recognition.onend = function (event: any) {
      //Fired when the speech recognition service has disconnected.
      console.log("SpeechRecognition.onend", event);
    };
  
    recognition.onnomatch = function (event: any) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log("SpeechRecognition.onnomatch", event);
    };
  
    recognition.onsoundstart = function (event: any) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log("SpeechRecognition.onsoundstart", event);
    };
  
    recognition.onsoundend = function (event: any) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log("SpeechRecognition.onsoundend", event);
    };
  
    recognition.onspeechstart = function (event: any) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log("SpeechRecognition.onspeechstart", event);
    };
  
    recognition.onstart = function (event: any) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log("SpeechRecognition.onstart", event);
    };
  }
  