'use client';
import { useState } from 'react';

export default function Home() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleTailor() {
    if (!resume || !jobDescription) {
      alert('Please fill in both text boxes!');
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription }),
      });

      const data = await res.json();
      if (data.tailoredResume) {
        setOutput(data.tailoredResume);
      } else {
        alert('Something went wrong generating the resume.');
      }
    } catch (err) {
      alert('Failed to connect to server.');
    }
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>AI Resume Fixer 🚀</h1>
      <p>Paste your old resume and the job you want. We will rewrite it perfectly!</p>

      <label><b>1. Your Old Resume:</b></label>
      <textarea 
        rows={6} 
        style={{ width: '100%', marginBottom: '15px' }} 
        value={resume}
        onChange={(e) => setResume(e.target.value)} 
      />

      <label><b>2. Target Job Description:</b></label>
      <textarea 
        rows={6} 
        style={{ width: '100%', marginBottom: '15px' }} 
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)} 
      />

      {/* STEP A: PAY FIRST */}
      <a 
        href="https://buy.stripe.com/test_dRmaEWdEt8Q50lXdg7cV200" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ display: 'block', padding: '12px', background: '#0070f3', color: 'white', textAlign: 'center', borderRadius: '5px', textDecoration: 'none', marginBottom: '10px', fontWeight: 'bold' }}
      >
        Pay $3 to Unlock
      </a>

      {/* STEP B: GET RESULT */}
      <button 
        onClick={handleTailor} 
        disabled={loading}
        style={{ width: '100%', padding: '12px', background: '#111', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {loading ? 'Magic Working...' : 'Generate New Resume'}
      </button>

      {output && (
        <div style={{ marginTop: '20px', background: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <h3>Your New Resume:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{output}</pre>
        </div>
      )}
    </main>
  );
}
