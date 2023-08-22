
// Your function definition
function myFunction(arg) {
    console.log('Hello from myFunction!', arg);
  }
  
  // Process command-line arguments
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node cli.js <argument>');
  } else {
    const argument = args[0];
    myFunction(argument);
  }