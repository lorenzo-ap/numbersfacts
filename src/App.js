import React, { useState } from 'react';

const App = () => {
  const API_URL = 'http://numbersapi.com';
  const [text, setText] = useState('');
  const [value, setValue] = useState();
  const [type, setType] = useState('trivia');

  const fetchData = async (value, type) => {
    try {
      const resp = await fetch(`${API_URL}/${value}/${type}`);
      const data = await resp.text();
      setText(data);
    } catch (error) {
      console.log('API error!', error);
      setText('Sorry, the API has an error!');
    }
  };

  const changeInput = (event) => {
    const numVal = Number(event.target.value);

    if (!Number.isNaN(numVal) && event.target.value !== '') {
      setValue(numVal);
      fetchData(numVal, type);
    } else {
      setValue();
      setText('');
    }
  };

  const changeType = (event) => {
    setType(event.target.value);
    if (typeof value === 'number') {
      fetchData(value, event.target.value);
    }
  };

  return (
    <div className='flex flex-column pt6 items-center h-100'>
      <h1 className='white-90 f1 mb4' style={{ 'text-shadow': '0 0 15px rgba(0, 0, 0, .25)' }}>Numbers facts 🔢</h1>
      <div className='flex'>
        <input
          className='f3 db center pa3 ba b--green bg-lightest-blue outline-0 br2 br-0 br--left'
          onChange={changeInput}
          type='text'
          placeholder='type a number'
        />
        <select className='f3 db center pa3 ba b--green bg-lightest-blue outline-0 br2 br--right pointer' onChange={changeType}>
          <option value='trivia' defaultValue>Trivia</option>
          <option value='math'>Math</option>
          <option value='date'>Date</option>
          <option value='year'>Year</option>
        </select>
      </div>
      <p className='black-80 pa3 bg-white br4 f2 mw8 tc'>{text.length > 0 ? text : 'Waiting for a number...'}</p>
    </div>
  );
};

export default App;
