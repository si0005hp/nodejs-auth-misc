import React from 'react';
import api from './api';

const Main = () => {
  const onClickApi = async () => {
    const res = await api.get('/api/test');
    console.log(res.data);
  };

  const onClickSecureApi = async () => {
    const res = await api.get('/api/secured-test');
    console.log(res.data);
  };

  return (
    <div id="Main">
      <h1>Main</h1>
      <button onClick={onClickApi}>API</button>
      <button onClick={onClickSecureApi}>SECURE API</button>
    </div>
  );
};

export default Main;
