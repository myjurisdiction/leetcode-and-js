const log = console.log;

const resourceUrl = "https://www.greatfrontend.com/interviews/gfe75";

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

  // scheduleTask();
  // scheduleTask(100);
  // scheduleTask(200);
  // scheduleTask(300);
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

// Problem link : https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/array-reduce
// Pollyfill for reduce

{
  Array.prototype.myReduce = function (callbackFn, initialValue) {
    const arr = this;
    let accumulator;
    let startIndex = 0;

    if (arguments.length > 1) {
      accumulator = initialValue;
    } else {
      if (!arr.length) {
        throw new Error("No initial value given");
      }

      accumulator = arr[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < arr.length; i++) {
      // handle the sparse array case, ex : [1,2,,,3]
      if (arr[i] == null) {
        continue;
      }
      accumulator = callbackFn.call(this, accumulator, arr[i], i, arr);
    }

    return accumulator;
  };

  const result = [1, 2, , 3].myReduce((acc, curr) => {
    acc += curr;
    return acc;
  });

  // log(`my result lord ${result}`);
}

// Flatten the array
// https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/flatten
{
  function flatten(value) {
    const result = [];

    function dfs(value) {
      for (let item of value) {
        if (Array.isArray(item)) {
          dfs(item);
        } else {
          result.push(item);
        }
      }
    }

    dfs(value);
    return result;
  }
  // Single-level arrays are unaffected.
  // log(flatten([1, 2, 3])); // [1, 2, 3]

  // // // Inner arrays are flattened into a single level.
  // log(flatten([1, [2, 3]])); // [1, 2, 3]
  // log(
  //   flatten([
  //     [1, 2],
  //     [3, 4],
  //   ])
  // ); // [1, 2, 3, 4]

  // // // Flattens recursively.
  // log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]
}

// https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/function-call

{
  Function.prototype.myCall = function (thisArg, ...argArray) {
    if (typeof this !== "function") {
      throw new Error("Call can only be called on function");
    }
    thisArg = thisArg || globalThis;
    // This is done so that we do not by mistake collide with any other existing property
    let sym = Symbol("fn");
    thisArg[sym] = this;
    let result = thisArg[sym](...argArray);
    delete thisArg[sym];
    return result;
  };

  // test conditions
  function multiplyAge(multiplier = 1) {
    return this.age * multiplier;
  }

  const mary = {
    age: 21,
  };

  const john = {
    age: 42,
  };

  // log(multiplyAge.myCall(mary)); // 21
  // log(multiplyAge.myCall(john, 2)); // 84
}

// https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/map-async-limit
// Cooperative concurrency model via microtask queue
// must to revise again
{
  function fetchUpperCase(term) {
    return new Promise((resolve) => {
      console.log(`Start ${term}`);
      setTimeout(() => {
        console.log(`End ${term}`);
        resolve(term.toUpperCase());
      }, 1000);
    });
  }

  const asyncDouble = (x) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(x * 2);
      }, 10);
    });

  const strTokens = ["foo", "baar", "loop", "arushi", "abhishek", "qux", "quz"];

  async function mapAsyncLimit(iterable, callbackFn, size) {
    size = size || iterable.length;
    let currentIdx = 0;
    const results = [...iterable];

    async function worker() {
      while (currentIdx < iterable.length) {
        const i = currentIdx++;
        results[i] = await callbackFn(iterable[i]);
      }
    }

    const workers = Array.from(
      {
        length: size,
      },
      worker
    );
    await Promise.all(workers);

    return results;
  }

  // (async () => {
  //   const results = await mapAsyncLimit([2], asyncDouble, 3);
  //   console.log("my results", results);
  // })();

  /**
   *   test('single item', async () => {
    expect.assertions(1);
    const res = await mapAsyncLimit([3], asyncDouble);
    expect(res).toEqual([6]);
  });
   */
}

// Promise all
/**
 * Promise.all() is a method that takes an iterable of elements (usually Promises) as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.
 */
// Needed revison
{
  async function promiseAll(iterable) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(iterable)) {
        throw new Error("iterable has to be of type array !!");
      }

      if (iterable.length === 0) {
        resolve([]);
        return;
      }

      let resolveCount = 0;
      const result = [];

      iterable.forEach((item, i) => {
        Promise.resolve(typeof item === "function" ? item() : item)
          .then((ans) => {
            result[i] = ans;
            resolveCount += 1;

            if (resolveCount === iterable.length) {
              resolve(result);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    });
  }

  // Resolved example.
  // (async () => {
  //   const p0 = Promise.resolve(3);
  //   const p1 = 42;
  //   const p2 = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve("foo");
  //     }, 100);
  //   });

  //   const p3 = () => {
  //     return new Promise((resolve) => {
  //       resolve("I am awesome");
  //     });
  //   };

  //   const r = await promiseAll([p0, p1, p2, p3]); // [3, 42, 'foo']
  //   log("final results", r);
  // })();
}

// Throttle Promises
{
  /**
 * Say you need to fetch some data through 100 APIs, and as soon as possible.

If you use Promise.all(), 100 requests go to your server at the same time, which is a burden to low spec servers.

Can you throttle your API calls so that always maximum 5 API calls at the same time?

You are asked to create a general throttlePromises() which takes an array of functions returning promises, and a number indicating the maximum concurrent pending promises.
 */

  // Cuncurrency limiter
  function throttlePromises(promises, limit) {
    function executor(resolve, reject) {
      let currentIndex = 0; // keeps track of current item being processesd
      let running = 0; // keeps track of running promises
      let result = [];
      limit = limit || promises.length;

      function runNext() {
        while (running < limit && currentIndex < promises.length) {
          const taskIndex = currentIndex++;
          const task = promises[taskIndex];

          running += 1;

          task()
            .then((r) => {
              result[taskIndex] = r;
            })
            .catch((e) => {
              reject(e);
            })
            .finally(() => {
              running -= 1;

              if (currentIndex === promises.length && running === 0) {
                resolve(result);
              } else {
                runNext();
              }
            });
        }
      }

      runNext();
    }

    return new Promise(executor);
  }

  // Simulated API call function
  function mockApiCall(id) {
    return new Promise((resolve) => {
      console.log(`Starting API call ${id}`);
      setTimeout(() => {
        console.log(`Completed API call ${id}`);
        resolve(`Result of API call ${id}`);
      }, 5000); // Simulate varying response times
    });
  }

  // Create an array of 100 mock API calls
  // const apiCalls = Array.from(
  //   { length: 10 },
  //   (_, i) => () => mockApiCall(i + 1)
  // );

  // const failedP = new Promise((res, rej) => {
  //   setTimeout(() => {
  //     rej("Sorry I failed");
  //   }, 5000);
  // });

  // apiCalls.push(failedP);

  // Call the concurrency limiter with a limit of 5
  // throttlePromises(apiCalls, 2).then((results) => {
  //   console.log("All API calls completed");
  //   console.group(results);
  // });
}

// More on Promises
// Sequentially executing promises
{
  async function test() {
    log("Gracias Every one");

    console.time("p1 time");
    const p1 = new Promise((res, _) => {
      log("p1's time kicked in");
      setTimeout(() => {
        res("So nice !! ");
      }, 5000);
    });
    const r1 = await p1;
    console.timeEnd("p1 time");
    log(r1);
    log("Initiating second promise... \n");

    console.time("p2 time");
    const p2 = new Promise((res, _) => {
      log("p2's time kicked in");
      setTimeout(() => {
        res("to meet you :)");
      }, 10000);
    });
    const r2 = await p2;
    console.timeEnd("p2 time");
    log(r2);
    log("End of promise execution");
  }

  // test();
}

// Class names

{
  function classNames(...rest) {
    let result = "";
    function recursiveFunc(payload) {
      if (typeof payload !== "object" && payload) {
        result += ` ${payload}`;
        return;
      }

      if (Array.isArray(payload)) {
        payload.forEach((item) => {
          recursiveFunc(item);
        });
      } else if (typeof payload === "object" && payload != null) {
        Object.keys(payload).forEach((key) => {
          if (payload[key]) {
            recursiveFunc(key);
          }
        });
      }
    }

    rest.forEach((payload) => recursiveFunc(payload));
    log(result);
    return result.trim();
  }

  // classNames("foo", "bar"); // 'foo bar'
  // classNames("foo", { bar: true }); // 'foo bar'
  // classNames({ "foo-bar": true }); // 'foo-bar'
  // classNames({ "foo-bar": false }); // ''
  // classNames({ foo: true }, { bar: true }); // 'foo bar'
  // classNames({ foo: true, bar: true }); // 'foo bar'
  // classNames({ foo: true, bar: false, qux: true }); // 'foo qux'
  // classNames("a", ["b", { c: true, d: false }]); // 'a b c'
  // classNames(
  //   "foo",
  //   {
  //     bar: true,
  //     duck: false,
  //   },
  //   "baz",
  //   { quux: true }
  // ); // 'foo bar baz quux'

  // classNames(null, false, "bar", undefined, { baz: null }, ""); // 'bar'
  // classNames(
  //   "btn",
  //   ["btn-primary", null, ["rounded", ["shadow"]]],
  //   { "is-active": true, "is-disabled": false },
  //   null,
  //   undefined,
  //   false,
  //   0,
  //   "mt-4"
  // ); // btn btn-primary rounded shadow is-active mt-4
  // classNames([[[[{ deeply: true }]]]]);
}

//  Data merging
// https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/data-merging
{
  function mergeData(sessions) {
    const sessionsMap = new Map();

    for (let session of sessions) {
      let currentSession = { ...session}
      if (sessionsMap.has(currentSession.user)) {
        const existingSession = sessionsMap.get(currentSession.user);
        if (existingSession) {
          existingSession.duration += currentSession.duration;
          const equipmentSet = new Set(existingSession.equipment);
          currentSession.equipment.forEach((item) => {
            equipmentSet.add(item);
          });
          existingSession.equipment = [...equipmentSet].sort((a, b) =>
            a.localeCompare(b)
          );
        }
      } else {
        sessionsMap.set(currentSession.user, currentSession);
      }
    }

    return Array.from(sessionsMap.values());
  }

  const sessions = [
    { user: 8, duration: 50, equipment: ["bench"] },
    { user: 7, duration: 150, equipment: ["dumbbell"] },
    { user: 1, duration: 10, equipment: ["barbell"] },
    { user: 7, duration: 100, equipment: ["bike", "kettlebell"] },
    { user: 7, duration: 200, equipment: ["bike"] },
    { user: 2, duration: 200, equipment: ["treadmill"] },
    { user: 2, duration: 200, equipment: ["bike"] },
  ];

  log(mergeData(sessions));
  log(
    mergeData([
      { user: 8, duration: 50, equipment: ["bench"] },
      { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
      { user: 8, duration: 50, equipment: ["bench"] },
      { user: 7, duration: 150, equipment: ["bench", "kettlebell"] },
    ])
  );
}
