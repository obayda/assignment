import React, { Component } from 'react';

class Sockets extends Component {
    state = {}

    ws = new WebSocket('wss://ws.bitstamp.net/')

    async componentDidMount() {
        const params = {
            'event': 'bts:subscribe',
            'data': {
                'channel': 'order_book_btcusd'
            }
        }

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify(params))
            console.log('connected')
        }
        this.ws.onmessage = (msg) => {
            this.setState({
                data: JSON.parse(msg.data).data
            })
        }
        this.ws.onclose = () => {
            console.log('disconnected')
        }
    }

    onBtnClick = () => {
        this.ws.close()
    }

    handleData = (data) => {

    }

    render() {
        console.log('rerender');
        const { data } = this.state;
        if (data) {
            if (Object.keys(data).length != 0) {
                this.handleData((+data.bids[data.bids.length - 1][0] + +data.asks[data.asks.length - 1][0]) / 2);
            }
        } else {
            return <div>Lodaing...</div>
        }
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ marginTop: 80, height: 50, width: '96%', border: 'solid' }} />
                    <div onClick={() => this.onBtnClick()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 80, width: 120, height: 40, border: 'solid' }}>Stop</div>

                </div>
            </div>
        );
    }
}

export default Sockets;