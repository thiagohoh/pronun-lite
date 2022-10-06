export default function speechSynthesis(phrase: string, lang: string) {
  //   @ts-ignore
  const synth = window.speechSynthesis;
  console.log(synth.getVoices());

  if (phrase !== "") {
    const sayThis = new SpeechSynthesisUtterance(phrase);

    sayThis.onend = function (event) {
      console.log("Synthesis end");
    };

    sayThis.lang = lang;
    sayThis.volume = 100;

    synth.speak(sayThis);
  }
}
