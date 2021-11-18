import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechtoText = () => {
  const commands = [
    {
      commands: 'reset',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]
  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default SpeechtoText;