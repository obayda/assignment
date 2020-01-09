import React, { Component } from 'react';

class Sockets extends Component {
    state = {
       data: []
    }

    ws = new WebSocket('wss://ws.bitstamp.net/')

    componentDidMount() {
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
            let bids, asks;
            let message = JSON.parse(msg.data)
            if (Object.keys(message.data).length != 0) {
                let length = message.data.bids.length
                bids = message.data.bids[length-1][0]
                asks = message.data.asks[length-1][0]
            }
            if(this.state.data.length < 10){
            if(bids && asks){
                let arr = this.state.data.concat((Math.round(((+bids + +asks)/2) * 100) / 100).toFixed(2))
            this.setState({
                data: arr
            })
        }
    }
        }
        this.ws.onclose = () => {
            console.log('disconnected')
        }
    }

    onBtnClick = () => {
        this.ws.close()
    }

    render() {
        const { data } = this.state;
        if(!data){
            return <div>Loading...</div>
        }
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ marginTop: 80, height: 50, width: '96%', border: 'solid' }}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            {data.map((e, i)=>{
                                    if (i==0) return <p key={i}>{e}</p>
                                    return <p key={i} style={{marginRight: 10, marginLeft: 10, color: (data[i-1] > e) ? 'red' : 'green'}}>{e}</p>
                            })}
                        </div>
                    </div>
                    <div onClick={() => this.onBtnClick()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 80, width: 120, height: 40, border: 'solid' }}>Stop</div>
                </div>
            </div>
        );
    }
}

export default Sockets;