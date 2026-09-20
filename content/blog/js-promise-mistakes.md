---
title: "5 mistakes developers make with JavaScript Promises"
description: "Missing awaits, redundant constructors, swallowed errors, and async executors: why each one bites, and the fix."
date: "2025-08-12"
updated: "2026-09-19"
tags: ["programming", "javascript"]
---

Promises look simple until one fails silently. Here are five mistakes I've made, or seen in code review, along with why each one happens and how to fix it.

All the examples use this helper, which fulfills or rejects at random after one second:

```js [helpers.js]
function getPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.5 ? resolve("Ok") : reject(new Error("Failed"));
    }, 1000);
  });
}
```

## 1. Forgetting to `await` or `return` a Promise

```js
async function foo() {
  getPromise(); // not awaited, not returned
}

foo()
  .then(() => console.log("fulfilled"))
  .catch(() => console.log("rejected"));
```

This always logs `fulfilled`, even when `getPromise()` rejects.

`foo` starts the Promise and moves on. Nothing ties that Promise to `foo`'s result, so `foo` fulfills immediately with `undefined`. The rejection, when it comes, is unhandled.

There are two fixes. **Return the Promise**, and `foo` settles the same way `getPromise()` does, with the same value:

```js
async function foo() {
  return getPromise();
}
```

Or **await it**. A rejection is thrown inside `foo` and rejects `foo`'s Promise:

```js
async function foo() {
  await getPromise();
}
```

With `await`, `foo` still fulfills with `undefined` on success, because nothing is returned. Use `return await getPromise()` if you need the value.

A related trap is catching the error and returning something:

```js
async function foo() {
  try {
    return await getPromise();
  } catch (error) {
    return "Error caught in foo"; // foo now fulfills, even on failure
  }
}
```

Returning from `catch` turns the failure into a success. Rethrow the error if the caller needs to know. And if all your `catch` does is rethrow, remove the `try...catch` and let the rejection propagate on its own.

## 2. Wrapping a Promise in `new Promise`

```js
function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
}
```

This works, but `fetch` already returns a Promise. The wrapper adds nothing, and it adds risk. Forget the `.catch(reject)` and errors vanish, while the outer Promise stays pending forever.

Return the chain directly:

```js
function fetchData(url) {
  return fetch(url).then((res) => res.json());
}
```

Only use the `Promise` constructor to wrap APIs that don't return Promises, like callback-based functions or `setTimeout`.

## 3. Neither handling nor returning the error

Every Promise needs an owner. Either **handle the error where it happens**, or **return the Promise** so the caller can. Breaking this rule looks like this:

```js
function fetchData(url) {
  fetch(url).then((res) => res.json()); // no return
}

fetchData("https://jsonplaceholder.typicode.com/todos/1").then((data) => console.log(data));
// TypeError: Cannot read properties of undefined (reading 'then')
```

`fetchData` returns `undefined`, so the caller can't chain on it. Any network error is also unhandled.

Fix it by returning the Promise, so the caller owns both the data and the errors:

```js
function fetchData(url) {
  return fetch(url).then((res) => res.json());
}

fetchData("https://jsonplaceholder.typicode.com/todos/1")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

Or handle everything inside, and don't expect a result back:

```js
function logTodo(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}
```

## 4. Turning a rejection into a fulfillment by accident

`then` and `catch` each return a _new_ Promise. That new Promise fulfills with whatever the callback returns, unless the callback throws.

```js
function rejectPromise() {
  return Promise.reject(new Error("Failed")).catch(() => {
    console.log("caught inside rejectPromise");
  });
}

rejectPromise()
  .then(() => console.log("then"))
  .catch(() => console.log("catch"));
```

Output:

```text
caught inside rejectPromise
then
```

Step by step:

1. `Promise.reject` creates a rejected Promise.
2. The inner `catch` callback runs and logs its message.
3. That callback returns `undefined`, so the Promise from `catch` **fulfills** with `undefined`.
4. The caller receives a fulfilled Promise, so its `then` runs, not its `catch`.

::note
Recovering from an error on purpose is fine. That's what `catch` is for. The bug is doing it by accident and hiding a failure the caller needed to see.
::

If the caller should handle the error, don't catch it here:

```js
function rejectPromise() {
  return Promise.reject(new Error("Failed"));
}
```

## 5. Using an `async` executor

The function you pass to `new Promise` is the _executor_. It should never be `async`:

```js
const p = new Promise(async (resolve, reject) => {
  throw new Error("Failed");
});

p.catch((e) => console.log(e.message)); // never runs
```

In a normal executor, a thrown error rejects `p`. In an `async` executor, the error rejects the Promise the `async` function returns instead, and the constructor ignores that Promise. `p` stays pending forever, and you get an unhandled rejection.

Remove `async` and the same code logs `Failed`. If you need `await` inside, you usually don't need the constructor at all. Write an `async` function instead.

## Takeaways

- Return or await every Promise whose outcome matters.
- Don't wrap an existing Promise in `new Promise`.
- Give every Promise an owner: handle its error, or return it.
- Remember that `catch` returns a fulfilled Promise unless it throws.
- Keep executors synchronous.
