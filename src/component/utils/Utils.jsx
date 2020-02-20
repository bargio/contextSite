import { Snackbar } from "@material-ui/core";
import { Alert } from "react-bootstrap";
import { CreatorForm } from "../quiz/creator/CreatorForm";

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
    savedStateQuiz:Object,
    savedStateQuestion:[],
    saveQuiz: function saveQuiz(quiz){
      this.savedStateQuiz = quiz.state
      this.savedStateQuestion = []
      quiz.state.questions.map(q=>{
        this.savedStateQuestion.push(q.current.state)
      })
    },

    getQuiz: function getQuiz(){
      console.log(this.savedStateQuiz)
      return this.savedStateQuiz
    },
    getQuestion: function getQuestion(){
      console.log(this.savedStateQuestion)
      return this.savedStateQuestion
    }
}
export default UtilsResource;