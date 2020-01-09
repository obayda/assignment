import React,{Component} from 'react';
import './styles.css'
import axios from 'axios';

class RestApi extends Component {
    state = {  }

    async componentDidMount (){
        const res = await axios.get('https://jsonplaceholder.typicode.com/albums')
        this.setState({data: res.data})
    }

    render() { 
        const { data } = this.state;        
        if(!data){
            return <div>Loading</div>
        }
        return (
            <div style={{marginTop: 40, marginLeft: '20%', marginRight: '20%'}}>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>UserID</th>
                        <th>Title</th>
                    </tr>
                    {
                        data.slice(0,10).map((e, i)=>(
                            <tr key={Math.random()}>
                                <td>{e.id}</td>
                                <td>{e.userId}</td>
                                <td>{e.title}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        );
    }
}
 
export default RestApi;