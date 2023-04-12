import React, { useState } from 'react';

function Gugudan() {
  const [num, setNum] = useState(2); // 초기값은 2

  const handleChange = (e) => {
    const inputNum = e.target.value;
    if (inputNum >= 2 && inputNum <= 9) { // 2부터 9까지만 입력 가능
      setNum(inputNum);
    }
  }

  
  const renderTable = () => {
    const result = [];
    for (let i = 1; i <= 9; i++) {
      result.push(
        <div key={i}>
          {num} x {i} = {num * i}
        </div>
      );
    }
    return result;
  }

  return (
    <div>
      <input type="number" value={num} onChange={handleChange} />
      {renderTable()}
    </div>
  );
}

export default Gugudan;