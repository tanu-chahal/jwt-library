"use client";
import {encode_jwt} from 'jwt-library';
import React from 'react';

const Home = () =>{
    const secret = process.env.JWT_SECRET_KEY || "";
    const token = encode_jwt(secret, 'userId12345', {name: "Tanu Chahal", role: "admin"}, 300);

    const handleClick = async () =>{
      console.log("Testing JWT Token")
        const response = await fetch('/api/protected',{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });

        if(response.status === 401){
            alert('Unauthorized');
        }
        else{
            const data = await response.json();
            alert(data.message)
        }
    };

    return (
        <div className='app min-h-screen flex flex-col items-center justify-center'>
            <h1 className='heading'>JWT Demo</h1>
            <button className='btn bg-green-600 px-4 py-2 rounded-md text-white' onClick={handleClick}>Test JWT Authentication</button>
        </div>
    );
}

export default Home;