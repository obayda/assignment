import React from 'react';

const Button = ({title, onClick, styles}) => {
    return (
        <div 
        onClick={onClick} 
        style={{...styles, display:'flex', justifyContent:'center', alignItems:'center', marginTop:20, width: '10%', height: 40, border: 'solid'}}
        >{title}</div>
    );
}
 
export default Button;


