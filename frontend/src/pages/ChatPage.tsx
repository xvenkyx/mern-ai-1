import React, { useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [context, setContext] = useState([]);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setAnswer('Loading...');

    try {
      const res = await axios.post('http://localhost:5000/api/query', { question });
      setAnswer(res.data.answer);
      setContext(res.data.context);
    } catch (err) {
      console.error(err);
      setAnswer('Error fetching answer');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Ask a Question About Your Document</h1>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question here..."
      ></textarea>
      <button
        onClick={handleAsk}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Ask
      </button>

      {answer && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Answer:</h2>
          <p className="bg-white border p-3 rounded shadow-sm text-gray-800">{answer}</p>
        </div>
      )}

      {context.length > 0 && (
        <div className="mt-6">
          <h2 className="text-md font-semibold mb-2">Context Used:</h2>
          <ul className="space-y-2">
            {context.map((chunk, i) => (
              <li key={i} className="bg-gray-100 p-2 rounded text-sm text-gray-700">
                {chunk}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatPage;