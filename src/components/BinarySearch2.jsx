import React, { useState } from "react";
function BinarySearchComponent2() {
    const [numbers, setNumbers] = useState([...Array(100)].map((_, i) => i));
    const [searchValue, setSearchValue] = useState('');
    const [resultIndex, setResultIndex] = useState(-1);
    const [steps, setSteps] = useState(0);
    const [minIndex, setMinIndex] = useState(0); // new state variable
    const [maxIndex, setMaxIndex] = useState(numbers.length - 1); // new state variable

  // Binary search algorithm
  function binarySearch(arr, value) {
    let low = 0;
    let high = arr.length - 1;
    let count = 0;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        count++;
        
        // update minIndex and maxIndex based on the current range of indices being considered
        setMinIndex(low);
        setMaxIndex(high);
    
        if (arr[mid] === value) {
          setSteps(count);
          return mid;
        } else if (arr[mid] < value) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
    
      setSteps(count);
      return -1;
    }

  // Handle search input change
  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  // Handle search form submission
  function handleSearchSubmit(e) {
    e.preventDefault();
    const result = binarySearch(numbers, parseInt(searchValue));
    setResultIndex(result);
  }

  return (
    <div >
      <h1 className="">Binary Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search for:
          <input
            type="number"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>
        {numbers.map((num, index) => (
          <span
            key={index}
            className={`number ${
              index < minIndex || index > maxIndex ? "excluded" : ""
            }`}
          >
            {num}
          </span>
        ))}
      </div>
      {resultIndex >= 0 ? (
        <p>
          Found at index {resultIndex}, took {steps} steps
        </p>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
}

export default BinarySearchComponent2;
