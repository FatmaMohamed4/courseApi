const express = require('express');
const app = express();
dotenv= require ('dotenv');
app.use (express.json());
// const dotenv = require('dotenv');
// dotenv.config();


app.listen (8010, ()=>{
    console.log ("app run correctly ");
})

let courses =[
    {  
       id : 1 ,
       name : "nodejs course ",
       price : 1000},
    {
        id : 2 ,
       name : "React js course ",
       price : 1500
    },
    {
        id : 3 ,
        name : "java  course ",
        price : 2000
    }
]


//CURD operationS 
// 1- Read all courses 
app.get (('/api/courses'), (req,res) => {
   res.json (courses);
   console.log (courses);
})

//Search about one course by id 
app.get (('/api/courses/:course_id'),(req,res) =>{
    const course_id = +req.params.course_id ;
    const course = courses.find((course)=> course.id ===course_id)
    if(!course){
        return res.status(404).json({msg :"Course not found "})
    }
    res.json(course);
})

//2- create new course 
app.post ('/api/courses', (req, res) => { 

    console.log(req.body);  
    
    if(!req.body.name){
        return res.status(400).json({
            error :'Name is not found' 
        });
    }
    if(!req.body.price){
        return res.status(400).json({
            error :'price is not found'
        });
    }
    courses.push ({id: courses.length+ 1 , ...req.body}); 
      
    res.status(201).json(courses)

})

//3- Update a course 
app.patch ('/api/courses/:course_id', (req,res)=> {
    const course_id = +req.params.course_id;
    let course = courses.find((course)=> course.id ===course_id);
    if(!course){
        return res.status(404).json({msg :"Course not found "})
    }
    course = {...course, ...req.body};
    res.status(200).json(course)
})


//4- Delete courses 
app.delete('/api/courses/:course_id/', (req, res) => {
    const course_id = +req.params.course_id;
    courses = courses.filter((course) => course.id !== course_id);
    res.status(200).json({ success: true })
    res.json(courses)
    console.log(courses);
})