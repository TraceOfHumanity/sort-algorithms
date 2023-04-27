import React, { useState } from "react";

function BinarySearchComponent() {
  // Generate an array of 100 random numbers
  const [numbers, setNumbers] = useState(
    [...Array(1000)].map((_, i) => (i = i + 1))
  );
  const [searchValue, setSearchValue] = useState("");
  const [resultIndex, setResultIndex] = useState(-1);
  const [steps, setSteps] = useState(0); // variable to track number of steps
  const [minIndex, setMinIndex] = useState(0); // new state variable
  const [maxIndex, setMaxIndex] = useState(numbers.length - 1); // new state variable
  const [center, setCenter] = useState((minIndex + maxIndex) / 2); // new state variable
  const [intervalTime, setIntervalTime] = useState(500); // new state variable
  const [selectedIntervalTime, setSelectedIntervalTime] = useState(500);

  // Binary search algorithm
  function binarySearch(arr, value) {
    let low = 0;
    let high = arr.length - 1;
    let count = 0;

    function searchInterval() {
      const mid = Math.floor((low + high) / 2);
      count++;
      setMinIndex(low);
      setMaxIndex(high);
      setCenter(mid);

      if (arr[mid] === value) {
        setSteps(count);
        setResultIndex(mid);
      } else if (low <= high) {
        if (arr[mid] < value) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
        setTimeout(searchInterval, selectedIntervalTime); // delay each iteration by 1 second
      } else {
        setSteps(count);
        setResultIndex(-1);
      }
    }

    setTimeout(searchInterval, selectedIntervalTime); // initial delay before starting the search
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

  function handleIntervalTimeChange(e) {
    setSelectedIntervalTime(parseInt(e.target.value));
  }

  return (
    <div>
      <h1 className="text-center font-bold">Binary Search</h1>
      <form className="flex" onSubmit={handleSearchSubmit}>
        <label>
          Search for:
          <input
            className="bg-transparent"
            type="number"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="enter a number to search for"
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {resultIndex >= 0 ? (
        <p>
          Found at index {resultIndex}, took {steps} steps
        </p>
      ) : (
        <p>Not found</p>
      )}
      <label>
        Interval time:
        <select
          value={selectedIntervalTime}
          onChange={handleIntervalTimeChange}
        >
          <option value="1000">1 second</option>
          <option value="750">750 milliseconds</option>
          <option value="500">500 milliseconds</option>
          <option value="250">250 milliseconds</option>
          <option value="100">100 milliseconds</option>
        </select>
      </label>
      <div className="flex flex-wrap justify-center">
        {numbers.map((num, index) => (
          <span
            key={index}
            className={`number  ${index === center ? "center" : ""} ${
              index < minIndex || index > maxIndex ? "excluded" : ""
            }`}
          >
            {num}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BinarySearchComponent;
