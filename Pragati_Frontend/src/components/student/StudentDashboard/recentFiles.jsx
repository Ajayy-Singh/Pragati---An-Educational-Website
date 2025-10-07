import React, { useEffect, useState } from 'react';

function RecentFiles({ currentUser }) {
  const [recentFiles, setRecentFiles] = useState([]);

  // Fetch recent files on mount
  useEffect(() => {
    async function fetchRecentFiles() {
      const res = await fetch(`/api/recent-files/${currentUser.id}`);
      const data = await res.json();
      setRecentFiles(data);
    }
    fetchRecentFiles();
  }, [currentUser.id]);

  // Call this when user opens a file
  const handleOpenFile = async (file) => {
    window.open(file.fileUrl, '_blank'); // Open Google Drive file

    await fetch('/api/recent-files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUser.id,
        fileId: file.fileId,
        fileName: file.fileName,
        fileUrl: file.fileUrl
      })
    });

    // Update the local recent list instantly
    setRecentFiles(prev => {
      const filtered = prev.filter(f => f.fileId !== file.fileId);
      return [{ ...file, openedAt: new Date() }, ...filtered].slice(0, 5);
    });
  };

  return (
    <div style={{ width: '250px', border: '1px solid #ddd', padding: '10px' }}>
      <h3>Recently Opened</h3>
      {recentFiles.length === 0 && <p>No recent files</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {recentFiles.map(file => (
          <li key={file.fileId} style={{ marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => handleOpenFile(file)}>
            <strong>{file.fileName}</strong><br/>
            <small>{new Date(file.openedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentFiles;
