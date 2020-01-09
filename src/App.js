import React,{Component} from 'react';
import './App.css';
import Buttton from './components/button'
import WebSocket from './containers/webscoket'
import RestApi from './containers/restapi'

class App extends Component {
  state = {
    selected: false
  }

  selected = () => {
    this.setState(prevState => ({
      selected: !prevState.selected
    }));
  }

  render() { 
    const { selected } = this.state;
    return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Buttton title="Web Socket" onClick={()=>this.selected()} styles={!selected && {backgroundColor: 'blue', color: 'white'}}/>
        <Buttton title="Rest Api" onClick={()=>this.selected()} styles={selected && {backgroundColor: 'blue', color: 'white' }}/>
      </div>
      <div>
      {
        !selected ? 
        <WebSocket name="hi"/> 
        : 
        <RestApi name="hello"/>
      }
      </div>
    </div>
    );
  }
}
 
export default App;