'use strict';

function handle404Error (req,res){

    const errorHandlerObj={
        status: 404,
        message: 'Sorry, we could not find this page 😕'
      }
      res.status(404).send(errorHandlerObj) //Sends a 404/Not-Found message as the response
    }

    module.exports= handle404Error // export handle error fun