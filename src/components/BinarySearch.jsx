import React, { useState } from 'react';

function BinarySearchComponent() {
  // Generate an array of 100 random numbers
  const [numbers, setNumbers] = useState([...Array(100)].map((_, i) => i));
  const [searchValue, setSearchValue] = useState('');
  const [resultIndex, setResultIndex] = useState(-1);

  // Binary search algorithm
  function binarySearch(arr, value) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (arr[mid] === value) {
        return mid;
      } else if (arr[mid] < value) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

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
        <p>Found at index {resultIndex}</p>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
}

export default BinarySearchComponent;
