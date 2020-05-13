const mongoose= require('mongoose');
const config=require('config');
const db=config.get('mongoURI');
const connectDB= async ()=>{
    try{
        await mongoose.connect(db,
            {
                useUnifiedTopology:true,
                useNewUrlParser:true,
                useCreateIndex:true,
                useFindAndModify:false
            }
            );
        console.log('Mnongodb connected........');

    }catch(err){
console.error(err.message);
//exit process with failure 
process.exit(1);
    }
}
module.exports=connectDB;


{/* process.exit(1 to 128)
ode normally exits with a 0 status code when no more async operations are pending. There are other exit codes which are described below:

1 - Uncaught Fatal Exception: There was an uncaught exception, and it was not handled by a domain or an uncaughtException event handler.

2 - Unused: Reserved by Bash for built in misuse.

3 - Internal JavaScript Parse Error: The JavaScript source code internal in Node's bootstrapping process caused a parse error. This is extremely rare, and generally can only happen during the development of Node itself.

4 - Internal JavaScript Evaluation Failure: The JavaScript source code internal in Node's bootstrapping process failed to return a function value when evaluated. This is extremely rare, and generally can only happen during the development of Node itself.

5 - Fatal Error: There was a fatal unrecoverable error in V8. Typically, a message will be printed to stderr with the prefix FATAL ERROR.

6 - Non-function Internal Exception Handler: There was an uncaught exception, but the internal fatal exception handler function was somehow set to a non-function, and could not be called.

7 - Internal Exception Handler Run-Time Failure: There was an uncaught exception, and the internal fatal exception handler function itself threw an error while attempting to handle it.

8 - Unused

9 - Invalid Argument: Either an unknown option was specified, or an option requiring a value was provided without a value.

10 - Internal JavaScript Run-Time Failure: The JavaScript source code internal in Node's bootstrapping process threw an error when the bootstrapping function was called. This is extremely rare, and generally can only happen during the development of Node itself.

11 - Invalid Debug Argument: The --debug and/or --debug-brk options were set, but an invalid port number was chosen

>128 - Signal Exits: If Node receives a fatal signal such as SIGKILL or SIGHUP, then its exit code will be 128 plus the value of the signal code. This is a standard Unix practice, since exit codes are defined to be 7-bit integers, and signal exits set the high-order bit, and then contain the value of the signal code. 

*/}