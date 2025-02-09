### Here are my three different implementations of the function `sum_to_n(n)` in JavaScript:
#### Resolve time: `20 minutes`
### Method 1: Using the mathematical formula (O(1))

```javascript

// Formula: Sum of first n natural numbers => S = n * (n + 1) / 2

var  sum_to_n_b  =  function(n) {

return (n  * (n  +  1)) /  2;

};

```
#### Pros:

-  **Fastest solution (O(1))**: Uses a direct mathematical formula, so it executes in constant time.

-  **No loops or iterations**: This makes it much more efficient for very large numbers.

-  **Minimal memory usage**: No extra variables or loops required.

#### Cons:

-  **Less intuitive**: Requires knowledge of mathematical formulas.

### Method 2: Using a for loop (O(n))

```javascript

var  sum_to_n_a  =  function(n) {

let  sum  =  0;

for (let  i  =  1; i  <=  n; i++) {

sum  +=  i;

}

return  sum;

};

```

#### Pros:

-  **Easy to understand**: Uses a simple loop to iterate from `1` to `n` and sum the values.

-  **No additional memory usage**: Uses only a single variable (`sum`) to store the result.

#### Cons:

-  **Performance is O(n)**: Iterates over `n` elements, making it slower for very large `n`.

-  **Not the most efficient**: Compared to mathematical solutions, this approach takes more processing time.

### Method 3: Using Array and reduce method (O(n))

```javascript

var  sum_to_n_c  =  function(n) {

return  Array.from({ length:  n }, (_, i) =>  i  +  1).reduce((acc, val) =>  acc  +  val, 0);

};

```
#### Pros:

-  **More functional programming style**: Uses JavaScript array functions, making it concise and elegant.

-  **Useful for array-related operations**: If additional operations are needed on numbers before summing, this approach is more flexible.

#### Cons:

-  **Performance is O(n)**: Creating an array and then reducing it is still a linear time operation.

-  **Higher memory usage**: Since an array of size `n` is created, it uses more memory compared to the previous solutions.

-  **Slightly slower than the `for` loop**: Due to the overhead of array creation and the `.reduce()` function.

### Test cases

```javascript

console.log(sum_to_n_a(5)); // Output: 15

console.log(sum_to_n_b(5)); // Output: 15

console.log(sum_to_n_c(5)); // Output: 15

```

**Bonus**: I wouldn't use `recursion` for this problem because it's inefficient and unnecessary. Recursion introduces a **stack overflow risk** when `n` is large, as JavaScript has a limited call stack. Each recursive call adds a new frame, and deep recursion can easily exceed this limit.