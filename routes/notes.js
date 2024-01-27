const express=require('express');
const router=express.Router();
const noteController=require('../controllers/noteController');
const {check}=require('express-validator');
const authMiddleware=require('../middleware/authMiddleware');

console.log('notesRoutes loaded');

router.use(authMiddleware);

router.get('/notes',noteController.fetchNotes);

router.post('/notes',[
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
],noteController.CreateNotes);


router.put('/notes/:id',[
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
],noteController.UpdateNotes);


router.delete('/notes/:id',noteController.DeleteNotes);


module.exports=router;