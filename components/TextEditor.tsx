import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

const MarkDownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header');

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
      <div className="text-editor" ref={ref}>
        <MarkDownEditor value={value} onChange={(v) => setValue(v)} autoFocus />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MarkdownPreview source={value} />
      </div>
    </div>
  );
};

export default TextEditor;