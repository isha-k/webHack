import React, { useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';

// Tailwind CSS for styling
const Audio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [transcript, setTranscript] = useState({});
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      chunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError(`Failed to start recording: ${err.message}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setAudioBlob(selectedFile);
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', audioBlob);

      const response = await fetch('http://127.0.0.1:8001/uploadfile/', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload file: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setTranscript(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
      <section className="max-container">
         <div className="flex justify-center text-center items-center space-x-4">
  {!isRecording ? (
  <button
    onClick={startRecording}
    className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
  >
    {/* SVG for a microphone icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm7-3a7 7 0 0 1-14 0h2a5 5 0 0 0 10 0h2zm-6 5v3h3v2H8v-2h3v-3h2z" />
    </svg>
    Start Recording
  </button>
) : (
  <button
    onClick={stopRecording}
    className="flex items-center justify-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
  >
    {/* SVG for a stop icon */}
  
    Stop Recording
  </button>
)}

</div>
      <div className="items-center justify-center flex h-100vh">
        <p>
          <Spline scene="https://prod.spline.design/cAB2EgWqWcYhnHVa/scene.splinecode" />
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 mt-6">
        
        
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200"
        />
        
        <button
          onClick={uploadAudio}
          className="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200"
        >
          Upload Audio
        </button>

       {isUploading && (
  <div className="flex items-center justify-center text-gray-600">
    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
     Analyzing Voice...
  </div>
)}
        
        {error && (
          <div className="text-red-500 mt-2">Error: {error}</div>
        )}
        
        {!isUploading && transcript && Object.keys(transcript).length > 0 && (
          <div className="transcript-output p-5 bg-white rounded-md shadow-lg w-3/4 text-left border border-gray-200">
            <h3 className="text-2xl font-semibold mb-3">Transcript</h3>
            <div className="space-y-3">
              {Object.keys(transcript).map((key) => (
                <div key={key} className="flex flex-col">
                  <strong className="text-gray-900">{key}:</strong>
                  <span className="text-gray-600 pl-2">{transcript[key]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Audio;
