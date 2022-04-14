const express = require('express');
const Course = require("../models/courses");

const router = express.Router();


router.post("/addCourse",async(req,res) => {
    try {
        if(req.isAuth){
            if(req.admin){
                const data = await Course.create({
                    name: req.body.name,
                    description: req.body.description,
                    timings: req.body.timings,
                    duration: req.body.duration,
                    fees: req.body.fees,
                    techStack: req.body.techStack,
                    tags: req.body.tags,
                })
            }
            else{
                res.send("Unauthorized Access")
                return;
            }
        }
        else{
            res.send("Please Login");
            return;
        }
    }
    catch(err) {
        res.send(err);
        return;
    }
})

router.post("/modifyCourses/:courseId", async(req,res) =>{
    try{
        if(req.isAuth){
            if(req.admin){
                const update = await Course.findByIdAndUpdate(req.params.courseId, {
                    name: req.body.name,
                    description: req.body.description,
                    timings: req.body.timings,
                    duration: req.body.duration,
                    fees: req.body.fees,
                    techStack: req.body.techStack,
                    tags: req.body.tags,

                })
               res.send(update)
                   

            }
            else{
                res.send("unauthorized access");
                return;
            }
        }
        else{
            res.send("please login");
        }
        
    }
    catch(err){
        res.send(err);
        return;
    }
})
 



module.exports = router;