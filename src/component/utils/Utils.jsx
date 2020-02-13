import { Snackbar } from "@material-ui/core";
import { Alert } from "react-bootstrap";

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
    }
}
export default UtilsResource;