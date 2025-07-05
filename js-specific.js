const log = console.log;

// List format
// https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/list-format

{
  /**
   * Given a list of strings, implement a function listFormat that returns the items concatenated into a single string. A common use case would be in summarizing the reactions for social media posts.

The function should support a few options as the second parameter:

sorted: Sorts the items by alphabetical order.
length: Show only the first length items, using "and X other(s)" for the remaining. Ignore invalid values (negative, 0, etc).
unique: Remove duplicate items.
   */

  // options -> { sorted : boolean, length : number, unique : true}
  // ['Bob', 'Ben', 'Tim', 'Jane', 'John'], length : 5, i : 0 to 4

  function listFormat(items, options) {
    // Remove empty string from the list
    items = items.filter((item) => item.length);

    const isSorted = options?.sorted || false;
    const isUnique = options?.unique || false;

    if (isSorted) {
      items.sort((a, b) => a.localeCompare(b));
    }

    if (isUnique) {
      items = Array.from(new Set(items));
    }

    const currentItemLength = items.length;

    const maxLength =
      options?.length &&
      options.length > 0 &&
      currentItemLength - options.length > 0
        ? options.length
        : currentItemLength;

    const remainingItems = items.slice(maxLength);

    let result = "";

    for (let i = 0; i < maxLength; i++) {
      if (i === maxLength - 1 && remainingItems.length) {
        result += `${result.length ? ", " : ""}${items[i]} and ${
          remainingItems.length
        } other${remainingItems.length > 1 ? "s" : ""}`;
      } else if (
        result.length &&
        i === maxLength - 1 &&
        !remainingItems.length
      ) {
        result += ` and ${items[i]}`;
      } else {
        if (result.length) {
          result += `, ${items[i]}`;
        } else {
          result += `${items[i]}`;
        }
      }
    }

    return result;
  }

  // log(listFormat(["Abhishek Raj"], { length: 2 }));
  // log(listFormat(["Abhishek Raj", "Arushi"], { length: 1 }));
  // log(listFormat(["Bob", "Ben", "Tim", "Jane", "John"], { length: 3 }));
  // log(
  //   listFormat(["Bob", "Ben", "Tim", "Jane", "John", "Bob"], {
  //     length: 3,
  //     unique: true,
  //   })
  // );

  // log(
  //   listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
  //     length: 3,
  //     sorted: true,
  //   })
  // );

  // log(listFormat(["Bob", "Ben", "", "", "John"]));
}

// List Format refactored version
{
  // Refactored version of the above:
  function listFormat(items, options = {}) {
    // Remove empty strings and ensure options has defaults
    items = items.filter(Boolean);

    const {
      sorted = false,
      unique = false,
      length: maxDisplayLength,
    } = options;

    if (unique) {
      items = [...new Set(items)];
    }

    if (sorted) {
      items.sort((a, b) => a.localeCompare(b));
    }

    const totalItems = items.length;
    const maxLength =
      maxDisplayLength > 0 && maxDisplayLength < totalItems
        ? maxDisplayLength
        : totalItems;

    const visibleItems = items.slice(0, maxLength);
    const hiddenItems = totalItems - maxLength;

    if (visibleItems.length === 0) return "";

    if (visibleItems.length === 1) {
      return `${visibleItems[0]}${
        hiddenItems > 0
          ? ` and ${hiddenItems} other${hiddenItems > 1 ? "s" : ""}`
          : ""
      }`;
    }

    const lastItem = visibleItems.pop();
    const base = visibleItems.join(", ");
    const andClause = hiddenItems
      ? ` and ${lastItem} and ${hiddenItems} other${hiddenItems > 1 ? "s" : ""}`
      : ` and ${lastItem}`;

    return `${base}${andClause}`;
  }

  // log(listFormat(["Abhishek Raj"], { length: 2 }));
  // log(listFormat(["Abhishek Raj", "Arushi"], { length: 1 }));
  // log(listFormat(["Bob", "Ben", "Tim", "Jane", "John"], { length: 3 }));
  // log(
  //   listFormat(["Bob", "Ben", "Tim", "Jane", "John", "Bob"], {
  //     length: 3,
  //     unique: true,
  //   })
  // );

  // log(
  //   listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
  //     length: 3,
  //     sorted: true,
  //   })
  // );

  // log(listFormat(["Bob", "Ben", "", "", "John"]));
}

// Throttle functions
{
  // What does throttle mean ?
  // Throttle basically refers to limiting how often a function is called in a given time period.

  // let's build one then
  let count = 1;
  function increment(i) {
    console.log(`called ${i} times`);
    count += 1;
    console.log(`final count ${count}`);
  }

  function throttle(func, delay) {
    let isInvoked = true;
    return function (...args) {
      if (isInvoked) {
        func.call(this, ...args);
        isInvoked = false;
        setTimeout(() => {
          isInvoked = true;
        }, delay);
      }
    };
  }

  const ti = throttle(increment, 100);

  async function delay(time = 100) {
    return new Promise((r) => setTimeout(r, time));
  }

  async function test() {
    for (let i = 0; i < 10; i++) {
      await delay(0);
      ti(i);
    }
  }

  // test();

  function scheduleTask(delay = 0) {
    setTimeout(() => {
      ti(delay);
    }, delay);
  }

  scheduleTask();
  scheduleTask(100);
  scheduleTask(200);
  scheduleTask(300);
}

// Debounce
{
  // what is debounce
  // In JS, debounce is a technique through which we dealy a function call until a certain time has elapsed.

  function debounce(func, wait) {
    let timer = null;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func.call(this, ...args);
      }, wait);
    };
  }
}
