const Joi = require('joi');
//capital becuase it is a class
const express = require('express');
const { valid } = require('joi');
const app = express();

app.use(express.json());
//^added piece of middleware
//when we call this method, it return middleware, then app.use uses that middleware


const courses = [
    {id: 1, name: 'course1' },
    {id: 2, name: 'course3' },
    {id: 3, name: 'course4' },
]

//under. the callback function contains a request and 
//response if the endpoint is reached
//the callback function is called the route handler
app.get('/', (req, res) => {
    res.send('Hello World!!!'); 
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});
 
//name: req.body.name is reading the body fro the body opf the request
//we are assuming that it has a name property
//we need to enable parsing of JSON objects in the body of the request 
//that's why we added ^ app.use(express.json()); at the top
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req, body, schema);
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const course = {
        id: courses.lenth + 1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})
//we added parameter 'id' 
//res.send() sends to the client
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course){
        res.status(404).send('The course with the given id was not found')
    }
    else{
        res.send(course)
    }
});

app.put('api/courses/:id', (req, res) => {
    //look up course
    //if not existing, return 404
    const course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course){
        res.status(404).send('The course with the given id was not found')
    }

    const result = validateCourse(req.body);
    //otherwise, validate course
    //if invalid, return 400
    
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    } 
    //if valid, update course  
    course.name = req.body.name;
    //return updated course to client
    res.send(course)

}); 
        
    function validateCourse(course) {
        const schema = {
            name: Joi.string().min(3).required()
        };
    
        return Joi.validate(course, schema);
    }
//listen on a given port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

//I can use nodemon index.js in the terminal so that I dont
//have to constantly refresh the terminal

