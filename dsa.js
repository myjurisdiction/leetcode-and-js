const log = console.log;

// max Binary Heap
{
  // Heap Data Structure
  // Insertion -> O(log n), n is the size of the array used to keep the elements of the heap
  // Deletion -> Same
  // Extract Max -> o(1)

  // Simulating Max heap design
  // Heap is a variant of complete binary tree. Meaning, left and right node must be equally distributed.
  const container = [];

  function insertIntoHeap(item) {
    container.push(item);
    bubbleUp();
  }

  // Bubble up : Since we are appending the item to the last of container, we need an algorithm to place the item to its correct position
  //  we see the last item, we compare it with its parent, if child is greater than its parent, we perform the swap, we update the currentIndex, REPEAT unless child is less than or equal to its parent
  function bubbleUp() {
    const n = container.length;
    let currentIndex = n - 1;
    let currentElement = container[currentIndex];

    while (currentIndex > 0) {
      let currentParentIndex = Math.floor((currentIndex - 1) / 2);
      let currentParent = container[currentParentIndex];

      if (currentElement <= currentParent) {
        break;
      }

      // Swap the parent with its child if child is greater than its parent
      [container[currentIndex], container[currentParentIndex]] = [
        container[currentParentIndex],
        container[currentIndex],
      ];

      // Since we performed a swap, currentIndex <- currentParentIndex
      currentIndex = currentParentIndex;
    }
  }

  function extractMax() {
    const maxItem = container[0];
    sinkDown();
    return maxItem;
  }

  // we pop the last item, we place it at the first position, then we compare the currentItem with its children, if children are greater then we swap, we update the currentItem index, we REPEAT unless the currentItem is smaller than its parent
  function sinkDown() {
    const lastItem = container.pop();
    container[0] = lastItem;
    // as our popped item is at the 0 index, let's call it currentIndex
    let currentIndex = 0;

    while (true) {
      let currentLeftIdx = 2 * currentIndex + 1;
      let currentRightIndex = 2 * currentIndex + 2;

      let swapIndex = null;
      let currLeftChild, currRightChild;

      if (currentLeftIdx < container.length) {
        currLeftChild = container[currentLeftIdx];
        if (currLeftChild > lastItem) {
          swapIndex = currentLeftIdx;
        }
      }

      if (currentRightIndex < container.length) {
        currRightChild = container[currentRightIndex];
        if (
          (swapIndex === null && currRightChild > lastItem) ||
          (swapIndex !== null && currRightChild > currLeftChild)
        ) {
          swapIndex = currentRightIndex;
        }
      }

      if (swapIndex === null) {
        break;
      }

      // swap the currentElement with one of its child whose idx is stored in swapIndex variable
      [container[currentIndex], container[swapIndex]] = [
        container[swapIndex],
        container[currentIndex],
      ];

      currentIndex = swapIndex;
    }
  }
  // insertIntoHeap(10);
  // insertIntoHeap(5);
  // insertIntoHeap(15);
  // insertIntoHeap(1);
  // insertIntoHeap(99);

  // extractMax();
  // extractMax();

  // insertIntoHeap(99);
  // extractMax();

  // log(container);
}

// Quick sort implementation
{
  function quickSort(usa) {
    if (usa.length <= 1) {
      return usa;
    }

    const pivotIndex = partition(usa);

    const leftPartition = quickSort(usa.slice(0, pivotIndex));
    const rightPartition = quickSort(usa.slice(pivotIndex + 1));

    return leftPartition.concat(usa[pivotIndex], rightPartition);
  }

  function swap(nums, idx1, idx2) {
    [nums[idx1], nums[idx2]] = [nums[idx2], nums[idx1]];
  }

  function partition(nums) {
    const currentPivot = nums[0];
    let pivotIndex = 0;
    let swapIndex = 0;

    for (let i = 0; i < nums.length; i++) {
      if (currentPivot > nums[i]) {
        swapIndex += 1;
        swap(nums, swapIndex, i);
      }
    }

    swap(nums, pivotIndex, swapIndex);
    return swapIndex;
  }

  // const usa = Array.from({ length: 15 }, () => Math.floor(Math.random() * 99));
  // const sa = quickSort(usa);

  // log(usa);
  // log(sa);
}
