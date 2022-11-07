const { addMessage, getAllMessages } = require('../Controllers/messagesController');

const router=require('express').Router();

router.post('/addmsg',addMessage);
router.post('/getallmsg',getAllMessages);
module.exports = router;