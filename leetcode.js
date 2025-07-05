const log = console.log;

// *************** 27th June
// Three some
{
  const n1 = [-1, 0, 1, 2, -1, -4];
  const n2 = [2, -3, 0, -2, -5, -5, -4, 1, 2, -2, 2, 0, 2, -4, 5, 5, -10];

  function threeSome(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) {
        continue;
      }
      let j = i + 1,
        k = nums.length - 1;
      while (j < k) {
        const sum = nums[i] + nums[j] + nums[k];
        if (sum === 0) {
          result.push([nums[i], nums[j], nums[k]]);

          while (j < k && nums[j] === nums[j + 1]) {
            j += 1;
          }

          while (j < k && nums[k] === nums[k - 1]) {
            k -= 1;
          }

          j += 1;
          k -= 1;
        } else if (sum < 0) {
          j += 1;
        } else {
          k -= 1;
        }
      }
    }

    return result;
  }

  //   threeSome(n1);
  //   threeSome(n2);
}

// Three Some closest
{
  function threeSomeClosest(nums, target) {
    const n = nums.length;

    nums.sort((a, b) => a - b);

    let min_diff = Infinity;
    let closest_sum = 0;

    for (let i = 0; i < n; i++) {
      let j = i + 1,
        k = n - 1;
      while (j < k) {
        const current_sum = nums[i] + nums[j] + nums[k];
        if (current_sum === target) {
          return current_sum;
        } else if (current_sum < target) {
          j += 1;
        } else {
          k -= 1;
        }

        let current_diff = Math.abs(target - current_sum);
        if (current_diff < min_diff) {
          min_diff = current_diff;
          closest_sum = current_sum;
        }
      }
    }

    return closest_sum;
  }

  //   log(threeSomeClosest([-1, 2, 1, -4], 1));
  //   log(threeSomeClosest([10, 20, 30, 40, 50, 60, 70, 80, 90], 1));
}

// Find Next Permutation
{
  // Understand, Donot start finding all the permutations because it will be very expensive
  // Use this algorithm:
  // Find Pivot index : right most element smaller than its next right most
  // If not found then simply reverse the list and return
  // else, find nearest greater element to pivot
  // if found then swap
  // reverse the list from index : pibotIndex + 1

  function nextPermutation(nums) {
    let pivot = -1;
    const n = nums.length;

    for (let i = n - 2; i >= 0; i--) {
      if (nums[i] < nums[i + 1]) {
        pivot = i;
        break;
      }
    }

    if (pivot === -1) {
      reverseList(nums, 0, n - 1);
      return nums;
    }

    for (let i = n - 1; i > pivot; i--) {
      if (nums[i] > nums[pivot]) {
        [nums[i], nums[pivot]] = [nums[pivot], nums[i]];
        break;
      }
    }

    reverseList(nums, pivot + 1, n - 1);

    return nums;
  }

  function reverseList(nums, startIndex, endIndex) {
    while (startIndex < endIndex) {
      [nums[startIndex], nums[endIndex]] = [nums[endIndex], nums[startIndex]];
      startIndex += 1;
      endIndex -= 1;
    }
  }

  // log(nextPermutation([1, 2, 3]));
  // log(nextPermutation([3, 2, 1]));
  // log(nextPermutation([1, 1, 5]));
}

// *************** 28th June

// Combination Sum
{
  // Its a recursive problem
  // Revide again

  function combinationSum(candidates, target) {
    let result = [];

    function findCandidates(remaining, start, path) {
      if (remaining === 0) {
        result.push([...path]);
        return;
      }

      for (let i = start; i < candidates.length; i++) {
        if (candidates[i] <= remaining) {
          path.push(candidates[i]);
          findCandidates(remaining - candidates[i], i, path);
          path.pop(); // backtrack
        }
      }
    }

    findCandidates(target, 0, []);

    return result;
  }

  // log(combinationSum([2, 3, 6, 7], 7));
  // log(combinationSum([2, 3, 5], 8));
  // log(combinationSum([2], 1));
}

// Combination Sum 2
{
  // Here we need unique combinations

  function combinationSum2(candidates, target) {
    let result = [];
    candidates.sort((a, b) => a - b);

    function findCandidates(remaining, start, path) {
      if (remaining === 0) {
        result.push([...path]);
        return;
      }

      for (let i = start; i < candidates.length; i++) {
        if (i > start && candidates[i] === candidates[i - 1]) {
          continue;
        }
        if (candidates[i] <= remaining) {
          path.push(candidates[i]);
          findCandidates(remaining - candidates[i], i + 1, path);
          path.pop(); // backtrack
        }
      }
    }

    findCandidates(target, 0, []);

    return result;
  }

  // log(combinationSum2([2, 3, 6, 7], 7));
  // log(combinationSum2([2, 3, 5], 8));
  // log(combinationSum2([2], 1));
  // log(combinationSum2([10,1,2,7,6,1,5], 8))
}

// myAtoi
{
  // Check if string is Digit
  function isDigit(str) {
    return Number.isInteger(Number(str));
  }

  // This function converts a string into 32 bit signed integer
  function myAtoi(s) {
    const n = s.length;

    if (!n) {
      return 0;
    }

    const MAX_INT_SIZE = 2 ** 31 - 1;
    const MIN_INT_SIZE = -1 * 2 ** 31;

    s = s.trim();

    let sign = 1,
      i = 0,
      result = 0;

    if (s[i] === "-") {
      sign *= -1;
      i += 1;
    } else if (s[i] === "+") {
      sign *= 1;
      i += 1;
    }

    while (i < n && s[i] !== " " && isDigit(s[i])) {
      let digit = parseInt(s[i]);
      result = result * 10 + digit;

      if (sign * result > MAX_INT_SIZE) {
        return MAX_INT_SIZE;
      }

      if (sign * result < MIN_INT_SIZE) {
        return MIN_INT_SIZE;
      }

      i += 1;
    }

    return sign * result;
  }

  // log(myAtoi("0-1"));
  // log(myAtoi("1337c0d3"));
  // log(myAtoi("42"));
  // log(myAtoi(" -042"));
  // log(myAtoi("4193 with words"));
}

// Permutations : All possible Permutations
{
  // Implement Backtrack algorithm

  function permutations(nums) {
    const result = [];
    const isSeen = Array.from({ length: nums.length }, () => false);

    function backTrack(path = []) {
      if (path.length === nums.length) {
        result.push([...path]);
        return;
      }

      for (let i = 0; i < nums.length; i++) {
        if (isSeen[i]) {
          continue;
        }

        isSeen[i] = true;
        path.push(nums[i]);
        backTrack(path);
        isSeen[i] = false;
        path.pop();
      }
    }

    backTrack();

    return result;
  }

  // log(permutations([1, 2, 3]));
}

// Permutations 2 : All possible unique permutations
{
  function permutations2(nums) {
    const result = [];
    const isSeen = Array.from({ length: nums.length }, () => false);
    nums.sort((a, b) => a - b);

    function backTrack(path = []) {
      if (path.length === nums.length) {
        result.push([...path]);
        return;
      }

      for (let i = 0; i < nums.length; i++) {
        if (isSeen[i] || (i > 0 && nums[i] === nums[i - 1] && !isSeen[i - 1])) {
          continue;
        }

        isSeen[i] = true;
        path.push(nums[i]);
        backTrack(path);
        isSeen[i] = false;
        path.pop();
      }
    }

    backTrack();

    return result;
  }

  // log("unique permutations ::", permutations2([1, 1, 2]));
}

// *************** 1st July

// 121. Best Time to Buy and Sell Stock
{
  function maxProfit(prices) {
    let maxProfit = 0;
    let minPrice = prices[0];
    let thatDayProfit = 0;

    for (let i = 1; i < prices.length; i++) {
      minPrice = Math.min(prices[i], minPrice);
      thatDayProfit = prices[i] - minPrice;
      maxProfit = Math.max(maxProfit, thatDayProfit);
    }

    return maxProfit;
  }

  // log(maxProfit([7, 1, 5, 3, 6, 4]));
}

// 122. Best Time to Buy and Sell Stock II

{
  function maxProfit(prices) {
    let maxBenefit = 0;
    let currentBenefit = 0;

    for (let i = 1; i < prices.length; i++) {
      currentBenefit += Math.max(0, prices[i] - prices[i - 1]);
      maxBenefit = Math.max(maxBenefit, currentBenefit);
    }

    return maxBenefit;
  }

  // log(maxProfit([7,1,5,3,6,4]))
}

// Remove Duplicate 1
{
  function removeDuplicate1(nums) {
    let j = 1;

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] !== nums[i - 1]) {
        nums[j] = nums[i];
        j++;
      }
    }

    return j;
  }

  // log(removeDuplicate1([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
}

// Remove Duplicate 2
{
  function removeDuplicate(nums, frequency = 2) {
    let k = 1;
    if (nums.length <= 1) {
      return k;
    }

    let counter = 1;

    for (let i = 1; i < nums.length; i++) {
      if (nums[i - 1] === nums[i]) {
        counter += 1;
      } else {
        counter = 1;
      }

      if (counter <= frequency) {
        nums[k] = nums[i];
        k += 1;
      }
    }

    return k;
  }

  // removeDuplicate([0, 0, 1, 1, 1, 1, 2, 3, 3]);
  // removeDuplicate([1, 1, 1, 2, 2, 3]);
}

// 55. Jump Game, Recursive solution with memoization
{
  // To make it work fast. Memoize the function
  function canJump(nums) {
    const memo = {};
    let currentIndex = 0;

    function dfs(currentIndex) {
      if (currentIndex in memo) {
        return memo[currentIndex];
      }

      if (currentIndex === nums.length - 1) {
        return true;
      }

      if (nums[currentIndex] === 0) {
        memo[currentIndex] = false;
        return false;
      }

      for (let i = 1; i <= nums[currentIndex]; i++) {
        const jumpIndex = i + currentIndex;
        if (jumpIndex < nums.length) {
          const result = dfs(jumpIndex);
          if (result) {
            memo[currentIndex] = result;
            return true;
          }
        }
      }

      memo[currentIndex] = false;
      return false;
    }

    return dfs(currentIndex);
  }

  // log(canJump([2, 1, 0, 0, 4]));
  // log(canJump([1]));
  // log(canJump([1, 0, 1, 0]));
}

// 55. Jump Game, More optimised solution in linear time
{
  var canJump = function (nums) {
    let farthest = 0;

    for (let i = 0; i <= farthest; i++) {
      farthest = Math.max(farthest, i + nums[i]);
      if (farthest >= nums.length - 1) {
        return true;
      }
    }

    return false;
  };

  // log(canJump([2, 1, 0, 0, 4]));
  // log(canJump([1]));
  // log(canJump([1, 0, 1, 0]));

  /**
   * Excellent observation — and this is **exactly the kind of reasoning** that helps sharpen your greedy intuition.

Let’s walk through it carefully and see **why greedy *still* works**, even though it doesn’t always follow the *shortest* path.

---

## ✅ Problem Recap:

Input: `[2, 3, 1, 1, 4]`

Each element represents the max jump length from that index.
We want to know: **Can we reach the last index?**

---

## ❓ What “greedy” means here

Greedy doesn’t mean “take the biggest jump immediately.”

It means:
**At every step, try to extend the farthest reachable position.**
You don’t commit to the jump immediately — you just keep track of the best option.

---

## ✅ Greedy Implementation (Correct)

```js
function canJump(nums) {
  let farthest = 0;

  for (let i = 0; i <= farthest; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true;
  }

  return false;
}
```

---

## 🧠 Walkthrough: `[2, 3, 1, 1, 4]`

### Step by step:

* `i = 0`: max reach = `0 + 2 = 2` → `farthest = 2`
* `i = 1`: max reach = `1 + 3 = 4` → `farthest = 4`
* `farthest (4) >= last index (4)` → ✅ can reach the end

---

## 🔍 Clarification:

> “I’ll end up at index 2 if I jump 2 from index 0.”

Yes — **but the greedy algorithm doesn’t commit to jumping immediately**.
It just checks: **from all positions within reach, what’s the farthest I *could* reach next?**

* From index 0, you can reach up to index 2.
* At index 1 (which is within reach), you can reach up to index 4.
* So you “choose” to continue from index 1.

You never have to follow the *shortest path*, you just have to know whether **the end is reachable**.

---

## ✅ Conclusion:

* Greedy **does work** here because:

  * You're always choosing the furthest-reaching option available at each step.
  * You don’t have to follow the shortest path; you just care about *possibility* of reaching the goal.

   */
}

// 45. Jump Game II
{
  function jump(nums) {
    let currentIndex = 0;
    const minJumArray = Array.from({ length: nums.length }, () => Infinity);
    minJumArray[nums.length - 1] = 0;

    function dfs(currentIndex) {
      if (currentIndex === nums.length - 1) {
        return 0;
      }

      if (nums[currentIndex] === 0) {
        return Infinity;
      }

      if (minJumArray[currentIndex] !== Infinity) {
        return minJumArray[currentIndex];
      }

      for (let i = 1; i <= nums[currentIndex]; i++) {
        const jumpIndex = i + currentIndex;
        if (jumpIndex < nums.length) {
          const result = dfs(jumpIndex);
          if (result !== Infinity) {
            minJumArray[currentIndex] = Math.min(
              minJumArray[currentIndex],
              result + 1
            );
          }
        }
      }

      return minJumArray[currentIndex];
    }

    dfs(currentIndex);

    return minJumArray[currentIndex];
  }

  // log(jump([2, 3, 1, 1, 4]));
  // log(jump([2, 3, 0, 1, 4]));
  // log(jump([0]));
}

// *************** 2nd July

// 33. Search in Rotated Sorted Array
// Pattern : Binary Search on linear array
{
  function search(nums, target) {
    const n = nums.length;
    let start = 0;
    let end = n - 1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);

      if (nums[mid] === target) {
        return mid;
      }

      if (nums[start] <= nums[mid]) {
        if (nums[start] <= target && target < nums[mid]) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      } else {
        if (nums[mid] < target && target <= nums[end]) {
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }
    }

    return -1;
  }

  // log(search([4, 5, 6, 7, 0, 1, 2], 0));
}

// 81. Search in Rotated Sorted Array II
// Pattern : Binary Search on linear array
{
  function search(nums, target) {
    const n = nums.length;
    let start = 0;
    let end = n - 1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);

      if (nums[mid] === target) {
        return true;
      }

      if (nums[start] === nums[mid]) {
        start += 1;
        continue;
      }

      if (nums[start] < nums[mid]) {
        if (nums[start] <= target && target < nums[mid]) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      } else {
        if (nums[mid] < target && target <= nums[end]) {
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }
    }

    return false;
  }

  // log(search([2, 5, 6, 0, 0, 1, 2], 0));
  // log(search([2, 5, 6, 0, 0, 1, 2], 3));
}

// *************** 4th July

// 209. Minimum Size Subarray Sum
// pattern : Sliding Window using 2 pointers
{
  function minSubArrayLen(target, nums) {
    let left = 0,
      right = 0;
    let currentSum = 0;
    let minLength = Infinity;

    while (right < nums.length) {
      currentSum += nums[right];

      while (currentSum >= target) {
        // tracking the min length in the shrinking loop
        minLength = Math.min(minLength, right - left + 1);
        currentSum -= nums[left];
        left += 1;
      }

      right += 1;
    }

    return minLength === Infinity ? 0 : minLength;
  }

  // log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]));
  // log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
}

// 238. Product of Array Except Self
/**
 * Algorithm
 *
 * create prefix -> curr el * product of prev El
 * create Suffix -> rever the operation (start from end of the array)
 * then calculate the result like this:
 * result[i] = prefix[i - 1] * suffix[i + 1]
 * return result
 */
{
  function productExceptSelf(nums) {
    const n = nums.length;
    const result = Array.from({ length: n }, () => 0);

    // creating prefix array
    result[0] = 1;
    for (let i = 1; i < n; i++) {
      result[i] = nums[i - 1] * result[i - 1];
    }

    // creating postfix and also populating result
    let postfix = 1;
    for (let i = n - 1; i >= 0; i--) {
      result[i] = result[i] * postfix;
      postfix = postfix * nums[i];
    }
    return result;
  }

  // log(productExceptSelf([1, 2, 3, 4]));
}

// 134. Gas Station

{
  //  gas = [1,2,3,4,5], cost = [3,4,5,1,2]
  // brute force
  // intuitive approach
  function canCompleteCircuit(gas, cost) {
    const n = gas.length;
    for (let i = 0; i < n; i++) {
      let totalFuel = 0;
      let canComplete = true;

      for (let j = 0; j < n; j++) {
        let currentStation = (i + j) % n;
        totalFuel += gas[currentStation] - cost[currentStation];

        if (totalFuel < 0) {
          canComplete = false;
          break;
        }
      }

      if (canComplete) {
        return i;
      }
    }

    return -1;
  }

  // log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
}

// Gas station -> Greedy approach
{
  function canCompleteCircuit(gas, cost) {
    let totalFuel = 0;
    let currentFuel = 0;
    let startPosition = 0; // I am starting from 0

    for (let i = 0; i < gas.length; i++) {
      totalFuel += gas[i] - cost[i]; // to check overall Feasibility
      currentFuel += gas[i] - cost[i]; // is current path even feasible or not

      if (currentFuel < 0) {
        currentFuel = 0;
        startPosition = i + 1;
      }
    }

    return totalFuel >= 0 ? startPosition : -1;
  }

  // log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
}

// 3. Longest Substring Without Repeating Characters

{
  function lengthOfLongestSubstring(s) {
    const n = s.length;
    const uniqueStrSet = new Set();
    let left = 0,
      right = 0;
    let maxLen = 0;

    while (right < n) {
      while (uniqueStrSet.has(s[right])) {
        uniqueStrSet.delete(s[left]);
        left += 1;
      }

      uniqueStrSet.add(s[right]);
      maxLen = Math.max(maxLen, right - left + 1);
      right += 1;
    }

    return maxLen;
  }

  // log(lengthOfLongestSubstring("abcabcbb"));
}

// 36. Valid Sudoku

{
  /**
   *  First tip, do not over complicate this problem
   * We just have to validate the board based on the given rules
   * 
   * Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
   * 
Now, create a hash map set for every row
same for every column
and for 3 * 3 square boxes -> r // 3, c // 3
   */
  function validSuduko(board) {
    const rowsHashMap = new Map();
    const colHashMap = new Map();
    const squareBoardHashMap = new Map();

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const currentValue = board[i][j];

        if (currentValue === ".") {
          continue;
        }

        // filling rows set
        if (rowsHashMap.has(i)) {
          const rowSet = rowsHashMap.get(i);

          if (!rowSet?.has(currentValue)) {
            rowSet.add(currentValue);
          } else {
            return false;
          }
        } else {
          rowsHashMap.set(i, new Set(currentValue));
        }

        // filling columns set
        if (colHashMap.has(j)) {
          const colsSet = colHashMap.get(j);
          // if (!colsSet?.has(currentValue)) {
          //   colsSet.add(currentValue);
          // }
          if (!colsSet.has(currentValue)) {
            colsSet.add(currentValue);
          } else {
            return false;
          }
        } else {
          colHashMap.set(j, new Set(currentValue));
        }

        // filling hashMap for square boxes
        const newI = Math.floor(i / 3);
        const newJ = Math.floor(j / 3);
        // we can't represnt an index 2 dimendionally, hence created a linear ds (string) to represent key
        const squareKey = `${newI}-${newJ}`;
        if (squareBoardHashMap.has(squareKey)) {
          const hashSet = squareBoardHashMap.get(squareKey);
          if (!hashSet.has(currentValue)) {
            hashSet.add(currentValue);
          } else {
            return false;
          }
        } else {
          squareBoardHashMap.set(squareKey, new Set(currentValue));
        }
      }
    }

    return true;
  }

  const board1 = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];

  const board2 = [
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];

  // log(validSuduko(board1));
  // log(validSuduko(board2));
}

// 54. Spiral Matrix

{
  /**
  * My first try
  * 
  *  function spiralMatrix(matrix) {
    const result = [matrix[0][0]];
    const rowL = matrix.length;
    const colL = matrix[0].length;
    let key = "0-0";
    const seen = new Set(key);

    let goingRight = true;
    let goingBottom = false;
    let goingLeft = false;
    let goingUp = false;

    let i = 0,
      j = 0;

    let count = 9;

    while (count > 0) {
      count -= 1;
      key = `${i}-${j}`;

      if (goingRight) {
        if (j < colL - 1 && !seen.has(key)) {
          j += 1;
        } else {
          goingRight = false;
          goingLeft = false;
          goingBottom = true;
          goingUp = false;
        }
      }

      if (goingBottom) {
        if (i < rowL - 1 && !seen.has(key)) {
          i += 1;
        } else {
          goingLeft = true;
          goingRight = false;
          goingBottom = false;
          goingUp = false;
        }
      }

      if (goingLeft) {
        if (i > 0 && !seen.has(key)) {
          i -= 1;
        } else {
          goingLeft = false;
          goingUp = true;
          goingRight = false;
          goingBottom = false;
        }
      }

      if (goingUp) {
        if (i > 0 && !seen.has(key)) {
          i -= 1;
        } else {
          goingUp = false;
          goingRight = true;
          goingLeft = false;
          goingBottom = false;
        }
      }

      result.push(matrix[i][j]);
      seen.add(key);
    }

    console.log(result);
    return result;
  }
  */

  /**
   *
   * @param {[][]number} matrix
   * @returns Array<number>
   *
   * What's the Algorithm behind this.
   *
   * Treat the matrix as a 2d wall.
   * Use pointers (top, left, right, bottom) to define the bondary walls
   * Once you traverse full a side, then reduce the boundary parameter to that side.
   * Keep doing this, until, top <= bottom && left <= right;
   * once top === bottom && left === right; exit the loop
   *
   */

  function spiralMatrix(matrix) {
    const rowL = matrix.length;
    const colL = matrix[0].length;
    const result = [];

    // defining boundaries
    let top = 0,
      left = 0,
      right = colL - 1,
      bottom = rowL - 1;

    while (top <= bottom && left <= right) {
      // going right;
      for (let i = left; i <= right; i++) {
        result.push(matrix[top][i]);
      }
      top += 1;

      // going bottom
      for (let i = top; i <= bottom; i++) {
        result.push(matrix[i][right]);
      }
      right -= 1;

      // going left;
      if (top <= bottom) {
        for (let i = right; i >= left; i--) {
          result.push(matrix[bottom][i]);
        }
        bottom -= 1;
      }

      // going up
      if (left <= right) {
        for (let i = bottom; i >= top; i--) {
          result.push(matrix[i][left]);
        }
        left += 1;
      }
    }

    return result;
  }
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const matrix2 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ];

  // log(spiralMatrix(matrix));
  // log(spiralMatrix(matrix2));
  // output -> [1,2,3,6,9,8,7,4,5]
}

// *************** 5th July

// 48. Rotate Image
{
  function rotateImage(matrix) {
    // since it's a square matrix so row length and column length would be the same
    const n = matrix.length;
    let left = 0,
      right = n - 1;

    while (left < right) {
      for (let i = 0; i < right - left; i++) {
        // since its a square matrix, we can have same boundary values for top and left
        let top = left,
          bottom = right;

        // we save the value of top left in a variable
        let topLeftValue = matrix[top][left + i];

        // now going anticlockwise, we fill the values
        // filling the bottom left
        // i is being used to increment the index of current rows or column
        matrix[top][left + i] = matrix[bottom - i][left];
        // filling the bottom right
        matrix[bottom - i][left] = matrix[bottom][right - i];
        // filling the top right
        matrix[bottom][right - i] = matrix[top + i][right];
        // filling the top left
        matrix[top + i][right] = topLeftValue;
      }

      // reudcing the boundaries
      left += 1;
      right -= 1;
    }

    return matrix;
  }

  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const matrix2 = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ];

  // log(rotateImage(matrix2));
  // log(rotateImage(matrix));
}

// 167. Two Sum II - Input Array Is Sorted
{
  function twoSum2(numbers, target) {
    let left = 0,
      right = numbers.length - 1;

    while (left < right) {
      const sum = numbers[left] + numbers[right];
      log(sum, left, right);

      if (sum === target) {
        return [left + 1, right + 1];
      }

      if (sum < target) {
        left += 1;
      } else {
        right -= 1;
      }
    }

    return [-1, -1];
  }

  // log(twoSum2([2, 7, 11, 15], 9));
  // log(twoSum2([2, 3, 4], 6));
}

// 125. Valid Palindrome
{
  function isPalindrome(s) {
    const validCharactersSet = new Set();
    for (let i = 97; i <= 122; i++) {
      validCharactersSet.add(i);
    }

    for (let i = 48; i <= 57; i++) {
      validCharactersSet.add(i);
    }

    let sanitizedString = "";

    for (let char of s) {
      char = char.toLowerCase();
      if (validCharactersSet.has(char.charCodeAt())) {
        sanitizedString += char;
      }
    }

    let start = 0,
      end = sanitizedString.length - 1;

    while (start <= end) {
      if (sanitizedString[start] !== sanitizedString[end]) {
        return false;
      }
      start += 1;
      end -= 1;
    }

    return true;
  }

  // log(isPalindrome("A man, a plan, a canal: Panama"));
  // log(isPalindrome("race a car"));
  //  log(isPalindrome("01"));
}

// 392. Is Subsequence
{
  function isSubsequence(s, t) {
    const n = s.length;
    const m = t.length;
    if (n > m) {
      return false;
    }

    let j = 0;

    for (let i = 0; i < m; i++) {
      if (s[j] === t[i]) {
        j++;
      }
    }

    return j === n ? true : false;
  }

  // log(isSubsequence("abc", "ahbgdc"));
  // log(isSubsequence("axc", "ahbgdc"));
}

// 73. Set Matrix Zeroes
//  https://leetcode.com/problems/set-matrix-zeroes/description/?envType=study-plan-v2&envId=top-interview-150
{
}

// 289. Game of Life
// https://leetcode.com/problems/game-of-life/description/?envType=study-plan-v2&envId=top-interview-150
{
}
