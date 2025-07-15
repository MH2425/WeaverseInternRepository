// Simulated API function that returns a promise
function fetchData(id) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching data for id: ${id}...`);
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("ID must be positive"));
      } else {
        resolve({
          id: id,
          name: `Item ${id}`,
          description: `Description for item ${id}`
        });
      }
    }, 2000); // 2 second delay to simulate network request
  });
}

// Using async/await
async function getData(id) {
  try {
    console.log("Starting data fetch...");
    const data = await fetchData(id);
    console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the example
console.log("Program started");
getData(123)
  .then(result => {
    console.log("Final result:", result);
    
    // Show error handling example
    return getData(-5); // This will cause an error
  })
  .then(() => {
    console.log("Program completed");
  });
console.log("Program continues execution while async operations run");