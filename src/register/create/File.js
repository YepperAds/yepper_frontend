import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/select.css';

function File() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError(null);

        if (selectedFile && (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/'))) {
            setFilePreview(URL.createObjectURL(selectedFile));
        } else {
            setFilePreview(null);
            setError('Please upload a valid image or video file');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!file) {
                setError('Please choose a file to continue');
                setLoading(false);
            } else {
                navigate('/add-categories', {
                    state: { file }
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    return (
        <div className="new-file-container">
            <div className="form-wrapper">
                <h1>Upload Your Ad</h1>
                <p>Select an image or video file to create your ad</p>

                <form onSubmit={handleSave}>
                    <div className="file-input">
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="file-input-hidden"
                        />
                        <label htmlFor="file-upload" className="file-upload-label">
                            <img src="https://cdn-icons-png.flaticon.com/512/685/685817.png" alt="Upload icon" />
                            Select File
                        </label>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {filePreview && (
                        <div className="file-preview">
                            {file?.type.startsWith('image/') && (
                                <img src={filePreview} alt="Selected file" className="preview-image" />
                            )}
                            {file?.type.startsWith('video/') && (
                                <video src={filePreview} controls className="preview-video" />
                            )}
                        </div>
                    )}

                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? 'Processing...' : 'Next'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default File;
