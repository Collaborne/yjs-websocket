import {
  Remirror,
  ThemeProvider,
  useRemirror,
} from '@remirror/react';
import { AnnotationExtension, YjsExtension } from 'remirror/extensions';
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

import 'remirror/styles/all.css';

const doc = new Y.Doc()
const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc)

wsProvider.on('status', (event: any) => {
  console.log(event.status) // logs "connected" or "disconnected"
});

const extensions = () => [
  new AnnotationExtension(),
  new YjsExtension({ getProvider: () => wsProvider }),
];

function App() {
  const { manager, state, onChange } = useRemirror({
    extensions: extensions,
  });

  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        autoFocus
        onChange={onChange}
        initialContent={state}
        autoRender='end'
      />
    </ThemeProvider>
  );
}

export default App;
