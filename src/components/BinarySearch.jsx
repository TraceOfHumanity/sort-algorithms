import React, { useState } from 'react';

function BinarySearchComponent() {
  // Generate an array of 100 random numbers
  const [numbers, setNumbers] = useState([...Array(100)].map((_, i) => i));
  const [searchValue, setSearchValue] = useState('');
  const [resultIndex, setResultIndex] = useState(-1);
  const [steps, setSteps] = useState(0); // variable to track number of steps

  // Binary search algorithm
  function binarySearch(arr, value) {
    let low = 0;
    let high = arr.length - 1;
    let count = 0;
  
    function searchInterval() {
      const mid = Math.floor((low + high) / 2);
      count++;
  
      if (arr[mid] === value) {
        setSteps(count);
        setResultIndex(mid);
      } else if (low <= high) {
        if (arr[mid] < value) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
        setTimeout(searchInterval, 1000); // delay each iteration by 1 second
      } else {
        setSteps(count);
        setResultIndex(-1);
      }
    }
  
    setTimeout(searchInterval, 1000); // initial delay before starting the search
  
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
    <div>
      <h1>Binary Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search for:
          <input type="number" value={searchValue} onChange={handleSearchChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      <p>Array: {numbers.join(', ')}</p>
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

export default BinarySearchComponent;
