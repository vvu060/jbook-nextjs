import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
<html>
  <head>
    <style>html {background-color:white;}</style>
  </head>
  <body>
    <div id="root">
      <script>
        const handleError = (err) => {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color:red;"><h4>Runtime Error:</h4>' + err + '</div>';
          console.error(err);
        };

        window.addEventListener('error',(event) => {
          event.preventDefault();
          handleError(event.error);
        });

        window.addEventListener('message', (e) => {
          try{
            eval(e.data);
          } catch(err){
            handleError(err);
          }
        }, false); 
      </script>
    </div> 
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        title="preview"
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
