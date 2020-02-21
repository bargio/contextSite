import { Snackbar } from "@material-ui/core";
import { Alert } from "react-bootstrap";
import { CreatorForm } from "../quiz/creator/CreatorForm";
import { QuizResources } from "../resource/Api";
import ProfileUser from "../user/ProfileUser";
import StorageResource from "../resource/Storage";

const UtilsResource = {
    progressBarUpdate : function progressBarUpdate(value) {
       window.progressbar.updateProgress(value);
    },

    showMessage : function showMessge(message,typeAlert,action) {
        window.errorcomponent.showMessage(message, typeAlert, action)
    },

    showSnackbar:  function showSnackbar(){
        /*return (<Snackbar open={true} autoHideDuration={6000} >
        <Alert severity="success">
          This is a success message!
        </Alert>
      </Snackbar>)*/
    },
    

    getQuizUncompleted: async function getQuizUncompleted(){
      return QuizResources.getUserQuizUncompleted(ProfileUser.profile.id)
    },

}
export async function saveQuizUncompleted(quiz,callBackFunction){
  var savedStateQuestion = []
  var savedStateQuiz=quiz.state
  var tmpQuestions = []
  Object.assign(tmpQuestions,quiz.state.questions)
  //Object.assign(savedStateQuiz,quiz.state)
  UtilsResource.progressBarUpdate(10)
  tmpQuestions.map((q,index)=>{
    console.log(q)
    if(q.current.state.isImageQuestion){
      var imageName = ProfileUser.profile.id+index+new Date().valueOf();
      StorageResource.putImage(q.current.state.imageType1.file,imageName)
      q.current.state.imageType1 = imageName+".png" 
      
    }
    savedStateQuestion.push(q.current.state)
  })

  savedStateQuiz.questions = []
  if(savedStateQuiz.image!=null){
    console.log("savedStateQuiz")
    
    var imageName = ProfileUser.profile.id+new Date().valueOf();
    StorageResource.putImage(savedStateQuiz.image.file,imageName)
    savedStateQuiz.image = imageName+".png" 
    
  }
  console.log(savedStateQuiz)

  UtilsResource.progressBarUpdate(50)
  console.log(savedStateQuestion)
  console.log(savedStateQuiz)

  QuizResources.insertQuizUncompleted(ProfileUser.profile.id,savedStateQuiz,savedStateQuestion).then(result=>{
    
    UtilsResource.progressBarUpdate(100)
    callBackFunction()
  })
}

export default UtilsResource;