
const UtilsResource = {
    progressBarUpdate : function progressBarUpdate(value) {
       window.progressbar.updateProgress(value);
    },

    showMessage : function showMessge(message,typeAlert,action) {
        window.errorcomponent.showMessage(message, typeAlert, action)
    }
}
export default UtilsResource;