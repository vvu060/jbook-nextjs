import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

const MarkDownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>();
  const [editing, setEditing] = useState(false);

  const { updateCell } = useActions();

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
        <MarkDownEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v)}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MarkdownPreview source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
