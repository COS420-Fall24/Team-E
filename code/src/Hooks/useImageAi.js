import React from 'react';
import { usePollinationsImage, usePollinationsText } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';

const AIGeneratedContent = () => {
  const imageUrl = usePollinationsImage("Beautiful landscape of Paris with Eiffel Tower", { width: 800, height: 600, seed: 42 });
  const markdown = usePollinationsText("Write a brief travel guide for Paris, including top attractions and local cuisine in markdown", { seed: 42 });

  return (
    <div>
      <h2>AI-Generated Travel Guide</h2>
      <img src={imageUrl} alt="AI Generated" />
      {markdown ? (
        <ReactMarkdown>{markdown}</ReactMarkdown>
      ) : (
        <p>Loading markdown content...</p>
      )}
    </div>
  );
};

export default AIGeneratedContent;