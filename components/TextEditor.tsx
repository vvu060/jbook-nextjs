import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // element clicked on is inside editor
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      // element clicked is not inside editor
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)}>
      {/* <MDEditor.Markdown source={'# Header'} /> */}
      <MDEditor />
    </div>
  );
};

export default TextEditor;
