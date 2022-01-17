import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root">
      <script>
        window.addEventListener('message', (e) => {
          try{
            eval(e.data);
          } catch(err){
            const root = document.getElementById('root');
            root.innerHTML = '<div style="color:red;"><h4>Runtime Error:</h4>' + err + '</div>';
            console.error(err);
          }
        }, false); 
      </script>
    </div> 
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <iframe
      className="bg-white"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
      title="preview"
    />
  );
};

export default Preview;
