export function getUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
    response.json(),
  )
}

// implement a getTodos function
export function getTodos() {
  return fetch(
    'http://jsonplaceholder.typicode.com/todos',
  ).then((response) => response.json())
}
