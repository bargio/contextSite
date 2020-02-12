import AuthenticationManager from "../auth/AuthenticationManager";

class Profile {
    
    constructor(username,email,group,error){
        this.username = username;
        this.email = email;
        this.group = group;
        this.error = error;
    }
    isValid(){
        return this.username!=undefined && this.email!=undefined && this.group!=undefined   
    }
    getError(){
        return this.error
    }
}
const ProfileUser = {
    profile : new Profile(),
    saveProfile: function saveProfile(username,email,group){
        this.profile = new Profile(username,email,group)
    },

    getProfile: function getProfile(callBackFunctionFromComponent) {
        console.log("ProfileUser - getUserProfile")
        if(this.profile.isValid()){
            console.log("ProfileUser - valid profile - " ,this.profile)
            return callBackFunctionFromComponent(this.profile)
        }
        console.log("ProfileUser - invalid profile - check cookies")
        AuthenticationManager.isLoggedIn(this.checkProfile, this,callBackFunctionFromComponent)
        return null
    },
    checkProfile: function checkProfile(result,context,callBackFunctionFromComponent){
        console.log("ProfileUser - checkProfile - result: ",result)
        console.log("ProfileUser - context: ",context)
        var username;
        var email;
        var group;
        try {
            //for cognito
            if (result && result != "Error" && result.username) {
                username = result.username;
                email = result.attributes.email;
                group = result.signInUserSession.getIdToken().payload['cognito:groups']
                //for google or facebook
            } else if (result && result != "Error" && result.name) {
                username = result.name;
                email = result.email;

            } else if (result == "Error") {
                context.profile.error = "Error"
            }
        } catch (error) {
            console.log("Error")
            console.log(error)
            context.profile.error = "Error"
        }
        
        if(context.profile==undefined){
            context.profile =  new Profile();
        }
        context.profile.username = username;
        context.profile.email=email;
        context.profile.group=group;
        callBackFunctionFromComponent(context.profile)
    }
}

export default ProfileUser;