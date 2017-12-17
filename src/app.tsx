import * as React from 'react';
import { MapComponent } from './mapComponent';

interface Props {

}

interface State {
    userName: string;
}

export class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { userName: 'defaultUserName' };
    }

    onUserNameUpdate = (newValue: string) => {
        this.setState({ userName: newValue });
    }

    public render() {
        return (
            <div>
                <MapComponent />
            </div>
        )
    }
}