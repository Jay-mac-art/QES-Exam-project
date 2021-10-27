require('../src/db/mongoose')
const Question = require('../src/models/question')
let num = 0
function mcq() {
Question.find({is_deleted : false},(err,qus)=>{
    let qes = []
       qus.forEach((Qust) => {
       qes[num] = [
        {
        numb: num,
        question: Qust.question,
        answer: Qust.answer,
        options: [
          Qust.option_1,
          Qust.option_2,
          Qust.option_3,
          Qust.option_4
        
        ]

      }
      
      ];
      
      num++
    })
  
      if(err){
          console.log(err)
      }
      //console.log()
      module.exports = {qes}
    })
}
    
    

mcq()
    
 
 
 