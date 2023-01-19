import { useState } from "react";
import speechTool from "../service/speech";
import speechSynthesis from "../service/speechSynthesis";
import { delay } from "../utils/utils";
import Button from "./Button";
import useHasSpeechRecognition from "./hooks/useHasSpeechRecognition";
import Input from "./Input";
import Label from "./Label";
import Select from "./Select";

function Speech() {
  const [input, setInp] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [select, setSelect] = useState<string>("en-US");
  const [onSpeech, setOnSpeech] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [wrongWord, setWrongWord] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);
  const [textCopy, setTextCopy] = useState<string>("");

  function onInputFocus() {
    delay(setError, false);
    delay(setCorrect, false);
    setTextCopy("");
  }

  function onResult(result: string, b: boolean) {
    setResult(result);
  }

  function onSuccess(success: string) {
    onResult(success, true);
    setCorrect(true);
    setOnSpeech(false);
  }

  function onError(error: string, word: string) {
    onResult(error, true);
    setError(true);

    setWrongWord(word);
    setOnSpeech(false);
  }

  function phraseText() {
    setOnSpeech(true);
    speechTool(input, onError, onSuccess, select, onSpeechStartEnd);
    setTextCopy(input);
    setInp("");
  }

  function onSpeechStartEnd(b: boolean) {
    setIsSpeaking(b);
  }

  return (
    <>
      {!useHasSpeechRecognition() && (
        <div className="flex place-content-center p-2 ">
          <h1 className="font-semibold text-base text-rose-600">
            Browser not supported
          </h1>
        </div>
      )}

      {result && (
        <div>
          {error && (
            <div>
              <h1 className="font-semibold text-base text-center text-rose-600 p-2">
                That's not quite right confidence:{" "}
                {(Number(result) * 100).toFixed(2)}%
              </h1>
              <h1 className="font-semibold text-base text-gray-300 p-2">
                This is what I understood: {wrongWord}
              </h1>
            </div>
          )}
          {correct && (
            <h1 className="font-semibold text-center text-green-500 p-2">
              That's correct with {(Number(result) * 100).toFixed(2)}% of
              confidence!
            </h1>
          )}
        </div>
      )}

      {isSpeaking && (
        <div className="flex place-content-center">
          <img className="w-1/6" src=".\assets\mic.gif" alt="mic.gif" />
        </div>
      )}

      <div className="flex place-content-end p-2 mb-4">
        <div className="p-2">
          <Select onOption={setSelect} />
        </div>
      </div>

      <div>
        <Label label="Enter a phrase or word bellow to test your pronunciation." />

        <Input
          onChange={setInp}
          onFocus={onInputFocus}
          value={input}
          disable={onSpeech}
        />
      </div>

      <div className="p-2 ">
        <Label label="The word/phrase you want to say:" />
        <p className="break-all block mb-2 mt-2 text-base text-center font-semibold text-gray-200">
          {input ? input : textCopy}
        </p>
        <div className="pt-4 pb-4">
          <Label label="Speech synthesiser to help you pronounce it." />
          <Button
            text="Say it to me"
            onClick={() => {
              speechSynthesis(input, select);
            }}
          />
        </div>
      </div>

      <div className="flex place-content-center">
        <Button
          text="Start"
          onClick={phraseText}
          disable={input ? false : true}
        />
      </div>
    </>
  );
}

export default Speech;
