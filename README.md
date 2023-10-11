# Robust server structure: URL shortener service

## Instructions
Your task is to build a URL shortener service API using Node.js and Express. It should allow users to submit a URL and receive a "shortened" code, or ID, that can be used to retrieve the original URL later. It should also keep track of how often each shortened URL is retrieved so that you can calculate the most popular URLs.

## What is a URL shortener?
The ecommerce company that you work for sells many different products under different categories. Here's an example: www.shoppingsite.com/category/shoe/product/nike132032.

If a customer wants to share a link to the product on Twitter, they may run into restrictions on the text length.

A URL shortener service overcomes this issue by shortening www.shoppingsite.com/category/shoe/product/nike/132032 to www.shoppingsite.com/8d13lk2k.

## Existing files
You will only need to edit the src folder and follow code organization principles you learned in this module.

Use the existing data files located in src/data for the responses. Feel free to add or remove data from the files as necessary, but keep the same shape of the data.

## Tasks

### Create routes and handlers to create, read, update, delete, and list short URLs
You will need to create the following API endpoints for the urls resources:

| HTTP verb |	Path                     |	Description                                             |
| --------- | -------------------------- | -------------------------------------------------------- |
| POST      |	/urls                    |	Create a new short URL                                  |
| GET       |	/urls/:urlId             |	Retrieve a short URL by ID                              |
| PUT       |	/urls/:urlId             |	Update a short URL by ID                                |
| GET       |	/urls                    |	Retrieve a list of all short URLs                       |
| GET       |	/urls/:urlId/uses        |	Retrieve a list of use metrics for a given short URL ID |
| GET       |	/urls/:urlId/uses/:useId |	Retrieve a use metric by ID for a given short URL ID    |

Short URLs cannot be deleted once created, because this would break existing links.

**Create**
The following Postman screenshot shows the data posted to /urls and the response from the server.

Create a Short URL in postman

POST { data: {"href":"www.some-url.com"} } to /urls should assign an id to the object, save it, and return the saved object as a response to the client.

**Read**
The following Postman screenshot shows a GET request to /urls/:urlId and the response from the server.

Additionally, use records are created as a side effect of a GET request to /urls/:urlId. Each use record contains an id, a urlId which corresponds to ID of the URL being tracked by the use metric, and a time property (set to Date.now()) indicating when the use metric was recorded.

Read a Short URL in postman

**Update**
The following Postman screenshot shows a PUT request to /urls/:urlId and the response from the server.

Update a Short URL in postman

**List**
The following Postman screenshot shows a GET request to /urls and the response from the server.

Update a Short URL in postman

**Delete**
The following Postman screenshot shows a DELETE request to /urls/:urlId and the response from the server.

Delete a Short URL in postman

**List short URL uses**
The following Postman screenshot shows a GET request to /urls/:urlId/uses and the response from the server.

List Short URL uses's in postman

**Read short URL use**
The following Postman screenshot shows a GET request to /urls/:urlId/uses/:useId and the response from the server.

List Short URL uses in postman

The service should return a 404 error if the :urlId and :useId are mismatched. For example, if you send a GET request to /42/uses/79, and useId 79 isn't associated with urlId 42, the server should respond with 404.

### Create routes and handlers to create, read, update, delete, and list use metrics related to short URLs
You will need to create the following API endpoints for the uses resources:

| HTTP verb |	Path         |	Description                        |
| --------- | -------------- | ----------------------------------- |
| GET       |	/uses/:useId |	Retrieve a use metric by ID        |
| DELETE    |	/uses/:useId |	Delete a use metric by ID          |
| GET       |	/uses        |	Retrieve a list of all use metrics |

The uses resources have a path of /uses and are a record of every GET request for a specific short URL.

**Create**
Creating use records through the API is not allowed. Use records are created as a side effect of a GET request to /urls/:urlId.

The following Postman screenshot shows the data posted to /urls/:urlId and the response from the server.

Create a use in postman

**Read**
The following Postman screenshot shows a GET request to /uses/:useId and the response from the server.

Read a use in postman

**Update**
The following Postman screenshot shows a PUT request to /uses/:useId and the response from the server.

Update a use in postman

**Delete**
The following Postman screenshot shows a DELETE request to /uses/:useId and the 204 response from the server.

Delete a use in postman

**List**
The following Postman screenshot shows a GET request to /uses and the response from the server.

List uses in postman

### Handle errors properly
- Return a 404 error for any nonexistent path or resource.
- Methods that are not allowed should return 405 (e.g., a DELETE request sent to /urls/:urlId)/

### Saving data
There is no database in use for this project. All changes are stored in-memory.

The short URL data is exported from /src/data/urls-data.js.

The use data is exported from /src/data/uses-data.js.

There is some existing data in each file to give you a starting place.

Add and remove data from the arrays using push() and splice(), respectively.

When you restart your server, any changes made to these arrays will be lost.

### Assigning IDs
IDs are often assigned by the database. Since your API is not connected to a database, you can use array.length + 1 to assign IDs, as follows:

const newUrlId = urls.length + 1;
const newUseId = uses.length + 1;

However, note that this method of assigning IDs to your database records is not recommended in practice and is only used in this assessment for simplicity so that you can focus on building the API. Later on, in the backend module, you will learn about industry-standard databases and better ways to assign IDs to database records.

### Assigning time property
Use Date.now() to assign the time property of uses.