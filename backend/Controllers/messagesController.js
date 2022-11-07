const Message = require("../models/messageModel");
module.exports.addMessage = async (req, resp, next) => {
  try {
    const { message, from, to } = req.body;
    console.warn("add msg",from,to);
    const data = Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return resp.json({ msg: "message added successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports.getAllMessages = async (req, resp, next) => {
  try {
    const {from,to} = req.body;
    // console.log(req.body);
    let data = await Message.find({users:{$all:[from,to] }}).sort({updatedAt:1});
    console.warn(data);
    const messages=await data.map((msg)=>{
        return {
          fromSelf:msg.sender.toString()===from,
          message:msg.message.text,
        };
    });
    console.warn("getAllmessages",{messages});
    await resp.json({messages});
  } catch (err) {
    next(err);
  }
};
