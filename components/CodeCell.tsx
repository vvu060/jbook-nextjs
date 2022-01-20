import { useEffect } from 'react';

import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from 'hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom'
     var show = (value) => {
      const root = document.querySelector('#root');

       if(typeof value === 'object'){
        if(value.$$typeof && value.props){
            _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
       } else {
        root.innerHTML = value;
       };
     }
    `;

    const showFuncNoOp = 'var show = () => {}';
    const cumulativeCodeArr = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cell.id) {
          cumulativeCodeArr.push(showFunc);
        } else {
          cumulativeCodeArr.push(showFuncNoOp);
        }
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCodeArr;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode.join('\n'), cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
