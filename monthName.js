console.log(displayMonthNameBasedOnNumber());

function getMonthName(monthNumber) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                  'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (months[monthNumber-1]) {
      return months[monthNumber-1];
    } else {
      throw "Invalid number passed"
    }
  }
function displayMonthNameBasedOnNumber(){
  try { 
    var monthName = getMonthName(12);
    console.log(monthName);
  }
  catch (e) {
    monthName = 'unknown';
    console.log(monthName);
    console.log("The number you passed is invalid please try again");
  }
  finally{
      console.log("I am going to eat my granola bar");
  }