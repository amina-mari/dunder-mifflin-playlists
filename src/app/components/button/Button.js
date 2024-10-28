"use client"
import {useState} from 'react';

export default function Button ({children, type}) {
    const [loading, setLoading] = useState(false);

    function handleClick () {
        setLoading(true);
    }
    
    return (
        <button  
            type={type === "submit" ? "submit" : "button"}
            disabled={loading ? true : false}
            onClick={handleClick}>{
                !loading ? children : "Loading..."
                
            }</button>
    )
}