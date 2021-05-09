import express from 'express';
import { Student } from '../models/student';

const jsonParser = express.json()
const userRouter = express.Router();

userRouter.route('/students')
    .get(async (req, res) => {
        const users = await Student.find({}, null, {sort: {_id: 1}});
        res.send(users);
    })
    .post(jsonParser, async (req, res) => {

        if (await Student.findOne({ email: req.body.email })) {
            res.status(500).json({
                errors: { 'email': 'Email is already taken' }
            });
            return;
        }

        const newUser = await new Student(req.body);

        try {
            newUser.save();
        } catch (e) {
            console.error(e);
        }

        res.json({newUser});
    })

userRouter.route('/students/:id')
    .all(async (req, res, next) => {
        try{
            await Student.findById(req.params.id);
        }catch{
            return res.status(404).send('Not Found');
        }
        next()
    })
    .get(async (req, res) => {
        res.json(await Student.findById(req.params.id))
    })
    .patch(jsonParser, async (req, res) => {
        const student = await Student.updateOne({_id: req.params.id}, req.body, null, (error, resp) => {
            if(error){
                res.status(500).json({
                    errors: { 'email': 'Email is already taken' }
                });
            }

            res.status(200).json({resp})
        });
       
        
    })
    .delete(async (req, res) => {
        res.json(await Student.deleteOne({_id: req.params.id}));
    });


export default userRouter;