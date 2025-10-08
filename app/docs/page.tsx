'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/app/contexts/UserContext';
import Navbar from '@/app/New/Navbar';
import supabase from '@/app/supabase';

export default function UploadPage() {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userDocs, setUserDocs] = useState<Array<{name: string, id: string}>>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [docToDelete, setDocToDelete] = useState<{name: string, id: string} | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch user documents on page load
  useEffect(() => {
    const fetchUserDocs = async () => {
      if (!user) {
        setIsLoadingDocs(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('UserProfile')
          .select('docs')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user docs:', error);
        } else {
          console.log(data);
          setUserDocs(data?.docs || []);
        }
      } catch (error) {
        console.error('Error fetching user docs:', error);
      } finally {
        setIsLoadingDocs(false);
      }
    };

    fetchUserDocs();
  }, [user]);

  const handleDeleteClick = (doc: {name: string, id: string}) => {
    setDocToDelete(doc);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!docToDelete || !user) return;

    setIsDeleting(true);
          try {
        // Delete from documents table using a simpler approach
        console.log(JSON.stringify({ user_id: user.id, document_id: docToDelete.id }));
        const { error: deleteError } = await supabase
          .from('documents')
          .delete()
          .eq('metadata', JSON.stringify({ user_id: user.id, document_id: docToDelete.id }));

      if (deleteError) {
        console.error('Error deleting from documents table:', deleteError);
        setMessage('Failed to delete document. Please try again.');
        return;
      }

      // Remove from UserProfile docs array
      const updatedDocs = userDocs.filter(doc => doc.id !== docToDelete.id);
      
      const { error: updateError } = await supabase
        .from('UserProfile')
        .update({ docs: updatedDocs })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating UserProfile:', updateError);
        setMessage('Document deleted from documents table but failed to update profile.');
      } else {
        setUserDocs(updatedDocs);
        setMessage('Document deleted successfully!');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Error deleting document. Please check your connection.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDocToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDocToDelete(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is PDF or text
      const allowedTypes = ['application/pdf', 'text/plain'];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setMessage('');
      } else {
        setMessage('Please select a PDF or text file only.');
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !user) {
      setMessage('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', user.id);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/user/add`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      
      if (response.ok && data.documentId) {
        // First, get the current docs array
        const { data: profileData, error: fetchError } = await supabase
          .from('UserProfile')
          .select('docs')
          .eq('user_id', user.id)
          .single();

        if (fetchError) {
          console.error('Error fetching UserProfile:', fetchError);
          setMessage('File uploaded but failed to update profile. Please try again.');
          return;
        }

        // Append the new document to the existing docs array
        const currentDocs = profileData?.docs || [];
        const newDoc = {
          name: file.name,
          id: data.documentId
        };

        // Update UserProfile table with the new document
        const { error: updateError } = await supabase
          .from('UserProfile')
          .update({
            docs: [...currentDocs, newDoc]
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error updating UserProfile:', updateError);
          setMessage('File uploaded but failed to update profile. Please try again.');
        } else {
          setMessage('File uploaded successfully!');
          setFile(null);
          // Reset the file input
          const fileInput = document.getElementById('file-input') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
          
          // Refresh user docs
          setUserDocs([...currentDocs, newDoc]);
        }
      } else {
        setMessage('Upload failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error uploading file. Please check your connection.');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center relative xl:pt-28 py-20 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-2xl font-semibold text-white mb-4">Please Login</h1>
            <p className="text-gray-400 mb-6">You need to be logged in to upload documents.</p>
            <a href="/login" className="inline-block bg-gradient-to-r from-[#8F72D0] to-[#347FB0] hover:from-[#7A5FBA] hover:to-[#2D6BA0] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Go to Login
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black relative xl:pt-28 py-20 overflow-hidden">
      <Navbar />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-center text-2xl font-semibold text-white mb-8">
            Upload Documents
          </h1>
          
          {/* Document Limit Warning */}
          {userDocs.length >= 2 && (
            <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
              <div className="flex items-center">
                <div className="text-yellow-400 mr-2">⚠️</div>
                <p className="text-yellow-300">
                  You have reached the maximum limit of 2 documents. Please delete an existing document before uploading a new one.
                </p>
              </div>
            </div>
          )}
          
          {/* Current Documents Section */}
          {!isLoadingDocs && userDocs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Your Documents ({userDocs.length}/2)</h2>
              <div className="grid gap-3">
                {userDocs.map((doc, index) => (
                  <div key={index} className="flex items-center p-4 bg-white/5 border border-white/20 rounded-xl">
                    <div className="text-2xl mr-3">📄</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{doc.name.slice(0, 20)}...</p>
                      <p className="text-xs text-gray-400">ID: {doc.id}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteClick(doc)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Delete document"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Loading State for Documents */}
          {isLoadingDocs && (
            <div className="mb-8 p-4 bg-white/5 border border-white/20 rounded-xl">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                <span className="ml-2 text-gray-300">Loading your documents...</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="file-input" className="block text-sm font-medium text-gray-200 mb-2">
                Select PDF or Text File:
              </label>
              <input
                id="file-input"
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                disabled={userDocs.length >= 2}
                className={`w-full p-4 border-2 border-dashed text-gray-300 rounded-xl transition-all duration-300 ${
                  userDocs.length >= 2
                    ? 'border-gray-600 bg-white/5 cursor-not-allowed'
                    : 'border-white/30 bg-white/5 hover:border-purple-500 focus:outline-none focus:border-purple-500'
                }`}
              />
            </div>
            
            {file && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <p className="text-sm text-green-300">
                  Selected: {file.name}
                </p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={!file || isLoading || userDocs.length >= 2}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 transform ${
                file && !isLoading && userDocs.length < 2
                  ? 'bg-gradient-to-r from-[#8F72D0] to-[#347FB0] hover:from-[#7A5FBA] hover:to-[#2D6BA0] text-white cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Uploading...' : userDocs.length >= 2 ? 'Document Limit Reached' : 'Upload File'}
            </button>
          </form>
          
          {message && (
            <div className={`mt-6 p-4 rounded-xl text-sm ${
              message.includes('successfully')
                ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="text-red-400 mr-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Delete Document</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete <strong className="text-white">"{docToDelete?.name}"</strong>? 
              This action cannot be undone and will remove the document from your account permanently.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 border border-white/30 text-gray-300 rounded-xl hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 