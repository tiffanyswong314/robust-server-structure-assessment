// urls required to access the data files
const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

// create()
function create(req, res) {
    const { data: { href } = {} } = req.body
    // creates object for new url info 
    const newUrl = {
        href,
        id: urls.length + 1
    }
    // adds it to existing urls data
    urls.push(newUrl)
    // sends a 201 status + the url's data
    res
    .status(201)
    .json({ data: newUrl })
}

// middleware function for checking if url has 
// an href value before moving to create()
function hasHref(req, res, next) {
    const { data: { href } = {} } = req.body
  
    if (href) {
      return next()
    }

    next({
         status: 400, 
          message: "An 'href' property is required." 
        })
  }

  
  // middleware for checking if url already exists 
  // before moving on to read() and/or update()
  function urlExists(req, res, next) {
    const urlId = Number(req.params.urlId)
    const foundUrl = urls.find((url) => 
        url.id === urlId)
    
    if (foundUrl) {
      res.locals.url = foundUrl
      return next()
    }

    next({
      status: 404,
      message: `Url id not found: ${req.params.urlId}`
    })
  }


// update()
function update(req, res, next) {
    const foundUrl = res.locals.url
    const { data: { href } = {} } = req.body
    foundUrl.href = href

    res
    .json({
        data: foundUrl
    })
}


// read()
function read(req, res, next) {
    res.json({ 
        data: res.locals.url 
    })
    next()
}


// addUse()
function addUse(req, res) {
    const newUse = {
        id: uses.length + 1,
        urlId: Number(req.params.urlId),
        time: Date.now()
    }

    uses
    .push(newUse)
    
    res
    .status(201)
    .json({ data: newUse })
}


// list()
 function list(req, res) {
     res.json({
         data: urls
     })
 }


module.exports = {
    create: [hasHref, create],
    list,
    read: [urlExists, read, addUse],
    update: [urlExists, update],
    urlExists,
  }