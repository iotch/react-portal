# react-portal
React component that renders its contents outside of the main react app

## Example usage

```typescript
import * as React from 'react';
import { render } from 'react-dom';
import Portal from '@iotch/react-portal';

class ExampleComponent extends React.Component<any, any> {

    public render() {
        return <div>
            <div>app</div>
            <Portal to={document.body}>
                <div>portal (outside of the app, appended to body)</div>
            </Portal>
        </div>;
    }
}

render(<ExampleComponent />, document.getElementById('app'));
```