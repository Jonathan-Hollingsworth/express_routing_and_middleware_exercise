# express_routing_and_middleware_exercise

To initialize the application you'll want to enter `node server.js` into your terminal (assuming you have node)

## /items
- GET: Recieves all items in the (fake) database
- POST: Creates a new item using the request body (`{name: name, price: price}`)
- > This will throw an error if you try to use a name that's already taken

## `/items/:name`
- GET: Recieve the specified item. (if it exists)
- PATCH: Updates a specific item using the request body. (`{name: name, price: price}`)
- DELETE: Deletes a specified item. (if it exists)
