import React, { useState } from 'react'

const Audio = () => {
    const [file, setFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [transcript, setTranscript] = useState(""); // State to store the script
  
    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);
        setShowPopup(true); // Show popup when file is selected
        // Assuming you have an API endpoint that processes the file and returns a transcript
        const formData = new FormData();
        formData.append('audioFile', event.target.files[0]);
        const response = await fetch('API_ENDPOINT', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        setTranscript(data.transcript); // Set the transcript from API response
        setShowPopup(false); // Hide popup after fetching the transcript
    };
  
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  return (
    <section className='max-container'>
        <div className='items-center justify-center flex flex-col'>
        <input type="file" accept="audio/*" onChange={handleFileChange} className="btn btn-primary mb-2" />
                {file && (
                    <audio controls src={URL.createObjectURL(file)} className="mt-2">
                        Your browser does not support the audio element.
                    </audio>
                )}
                {file && transcript && (
                    <div className="transcript-output p-4 mt-4 bg-gray-100 rounded shadow">
                        <h3 className="text-lg font-semibold">Transcript:</h3>
                        <p>{transcript}</p>
                    </div>
                )}
                {showPopup && (
                    <div className="modal show fade" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">File Upload</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClosePopup}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Processing: {file.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    </section>

  )
}

export default Audio