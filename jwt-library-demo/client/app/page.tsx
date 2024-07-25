"use client";
import { encode_jwt } from "@tanu-chahal/jwt-library";
import React, { useState } from "react";

const Home = () => {
  const [secret, setSecret] = useState("");
  const [id, setId] = useState("");
  const [payload, setPayload] = useState("");
  const [ttl, setTtl] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");
  const [decodeResult, setDecodeResult] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  const handleGenerateJWT = () => {
    try {
      const payloadObject = JSON.parse(payload); 
      const ttlNumber = ttl ? parseInt(ttl, 10) : undefined; 
      const token = encode_jwt(secret, id, payloadObject, ttlNumber);
      setGeneratedToken(token);
    } catch (error) {
      alert('Invalid payload format. Please ensure it is valid JSON.');
    }
  };


  const handleDecodeJWT = async () => {
    try {
      const response = await fetch('/api/decode-jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${generatedToken}`,
        },
        body: JSON.stringify({ secret }),
      });
      const data = await response.json();
      setDecodeResult(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleValidateJWT = async () => {
    try {
      const response = await fetch('/api/verify-jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${generatedToken}`,
        },
        body: JSON.stringify({ secret }),
      });
      const data = await response.json();
      setValidationResult(data);
    } catch (error) {
      console.log(error);
    }
  };

return (
    <div className='app min-h-screen flex flex-col items-center p-20 gap-20'>
      <h1 className='heading text-green-600 text-3xl'>@tanu-chahal/jwt-library Demo</h1>

<div className="demoContent w-full flex flex-col gap-20">
      <div className='w-full mb-4'>
        <h2 className='text-xl font-bold mb-2 text-green-600'>Generate JWT</h2>
        <div className="generateForm w-full flex gap-20 justify-center">

        <div className="left w-full flex flex-col">
        <input
          type='text'
          placeholder='Secret'
          className='input mb-2 p-2 border border-gray-400 outline-gray-400 rounded-sm'
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <input
          type='text'
          placeholder='ID'
          className='input mb-2 p-2 border border-gray-400 outline-gray-400 rounded-sm'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
         <button className='btn bg-green-600 px-4 py-2 rounded-md text-white' onClick={handleGenerateJWT}>
          Generate JWT
        </button>
        </div>

        <div className="right w-full flex flex-col">
        <textarea
          placeholder='Payload (JSON)'
          className='textarea mb-2 p-2 border border-gray-400 outline-gray-400 rounded-sm min-h-24'
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        />
        <input
          type='number'
          placeholder='TTL (seconds)'
          className='input mb-2 p-2 border border-gray-400 outline-gray-400 rounded-sm'
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />
        </div>

        </div>
      </div>

      {generatedToken && (
        <div className='w-full flex flex-col gap-5'>
          <h2 className='text-xl font-bold text-green-600'>Generated JWT</h2>
          <div className="verificationContent flex gap-20 w-full items-center">
          <textarea className='textarea mb-2 p-2 border border-gray-400 outline-gray-400 rounded-sm w-full h-full' readOnly value={generatedToken} />
          <div className="verificationBtns flex gap-5 ">
          <button className='btn bg-green-600 px-4 py-2 rounded-md text-white text-nowrap' onClick={handleDecodeJWT}>
            Decode JWT
          </button>
          <button className='btn bg-green-600 px-4 py-2 rounded-md text-white ml-2 text-nowrap' onClick={handleValidateJWT}>
            Validate JWT
          </button>
          </div>
          </div>
        </div>
      )}

<div className="results flex justify-between w-full">
      {decodeResult && (
        <div className='w-1/2 mb-4'>
          <h2 className='text-lg font-bold mb-2 text-green-600'>Decoded JWT</h2>
          <pre className='textarea mb-2'>{JSON.stringify(decodeResult, null, 2)}</pre>
        </div>
      )}

      {validationResult && (
        <div className='w-1/2 mb-4'>
          <h2 className='text-lg font-bold mb-2 text-green-600'>Validation Result</h2>
          <pre className='textarea mb-2'>{JSON.stringify(validationResult, null, 2)}</pre>
        </div>
      )}
      </div>

      <div className='decodeJwt w-1/2 mb-4'>
        <h2 className='text-xl font-bold mb-2 text-green-600'>Decode Token</h2>
        <input
          type='text'
          placeholder='JWT Token'
          className='input mb-2 p-2 border border-gray-400 outline-gray-400 rounded-sm'
          value={generatedToken}
          onChange={(e) => setGeneratedToken(e.target.value)}
        />
        <input
          type='text'
          placeholder='Secret for Verification'
          className='input mb-2 p-2 border border-gray-400 outline-gray-400 rounded-sm'
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <button className='btn bg-yellow-600 px-4 py-2 rounded-md text-white' onClick={handleDecodeJWT}>
          Decode and Verify
        </button>
      </div>

      </div>
    </div>
  );
};

export default Home;
