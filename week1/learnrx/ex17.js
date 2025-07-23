// Exercise 17: Retrieve the largest rating.

function largestRating() {
	var ratings = [2,3,1,4,5];

	// You should return an array 
  // containing only the largest rating. 
  // Remember that reduce always
	// returns an array with one item.
  return ratings.
    reduce(function (acc, curr) {
      if (acc > curr) {
        return acc;
      }
      return curr;
    });
}