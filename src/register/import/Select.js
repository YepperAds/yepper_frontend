import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { CloudUpload, FileText, Image, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../../components/backToPreviousHeader';

function ImprovedSelect() {
  const navigate = useNavigate();
  const { user } = useClerk();
  const userId = user?.id;
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.includes(selectedFile.type)) {
      setError('Unsupported file type. Please upload JPEG, PNG, GIF, or MP4.');
      return;
    }

    if (selectedFile.size > maxSize) {
      setError('File is too large. Maximum size is 50MB.');
      return;
    }

    setFile(selectedFile);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview({
        url: reader.result,
        type: selectedFile.type
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    processFile(selectedFile);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    try {
      setLoading(true);
      navigate('/business', {
        state: { userId, file }
      });
    } catch (error) {
      setError('An error occurred during upload');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="ad-waitlist min-h-screen bg-gradient-to-br from-white to-green-50">
      <Header />
      <div className='flex justify-center items-center p-8'>
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-3xl font-extrabold mb-3 text-blue-950">Upload Your Ad Creative</h2>
          <p className="text-sm text-gray-600 mb-6">
            Supported formats: JPEG, PNG, GIF, MP4 (max 50MB)
          </p>

          <div 
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer
                      transition-all duration-300 hover:bg-gray-50 hover:border-blue-500
                      flex flex-col items-center justify-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime"
              onChange={handleFileChange}
              className="hidden"
            />
            <CloudUpload className="w-12 h-12 text-blue-600 mb-4" />
            <p className="text-gray-600">Drag and drop or click to upload</p>
          </div>

          {error && (
            <div className="mt-4 mb-4 flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg">
              <FileText className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {filePreview && (
            <div className="mt-6 relative">
              <div className="absolute top-3 right-3 z-10">
                {filePreview.type.startsWith('image/') ? (
                  <Image className="w-8 h-8 p-2 bg-white rounded-full text-blue-500 shadow-md" />
                ) : (
                  <Video className="w-8 h-8 p-2 bg-white rounded-full text-blue-500 shadow-md" />
                )}
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                {filePreview.type.startsWith('image/') ? (
                  <img 
                    src={filePreview.url} 
                    alt="Preview" 
                    className="w-full max-h-[500px] object-cover" 
                  />
                ) : (
                  <video 
                    src={filePreview.url} 
                    controls 
                    className="w-full max-h-[500px] object-cover"
                  />
                )}
              </div>
            </div>
          )}

          <motion.button 
            onClick={handleSave} 
            disabled={!file || loading}
            className="w-full mt-6 bg-[#3bb75e] text-white px-3 py-2 rounded-lg text-sm font-bold sm:text-base
                      transition-all duration-300 hover:bg-green-500 hover:-translate-y-0.5
                      disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? 'Processing...' : 'Next'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default ImprovedSelect;