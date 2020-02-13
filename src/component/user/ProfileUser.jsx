import AuthenticationManager from "../auth/AuthenticationManager";
import { UserResources } from "../resource/Api";

class Profile {

    constructor(username, email, group, error, id) {
        this.username = username;
        this.email = email;
        this.group = group;
        this.error = error;
        this.id = id;
    }
    isValid() {
        return this.username != undefined && this.email != undefined && this.id != undefined
    }
    getError() {
        return this.error
    }
}
const ProfileUser = {
    profile: new Profile(),
    canStartFlow: true,
    saveProfile: async function saveProfile(username, email, group) {
        this.profile = new Profile(username, email, group)
    },

    getProfile: async function getProfile(callBackFunctionFromComponent) {
        console.log("ProfileUser - getUserProfile")
        if (this.profile.isValid()) {
            console.log("ProfileUser - valid profile - ", this.profile)
            return callBackFunctionFromComponent(this.profile)
        }
        if (this.canStartFlow) {
            this.canStartFlow = false
            console.log("ProfileUser - invalid profile - check cookies")
            AuthenticationManager.isLoggedIn(this.checkProfile, this, callBackFunctionFromComponent)
        }else{
            const sleep = m => new Promise(r => setTimeout(r, m))
            await sleep(1000)
            this.getProfile(callBackFunctionFromComponent)
        }
    },
    checkProfile: async function checkProfile(result, context, callBackFunctionFromComponent) {
        console.log("ProfileUser - checkProfile - result: ", result)
        console.log("ProfileUser - context: ", context)
        var username;
        var email;
        var group = [];
        try {
            //for cognito
            if (result && result != "Error" && result.username) {
                username = result.username;
                email = result.attributes.email;
                group = result.signInUserSession.getIdToken().payload['cognito:groups']
                if(group==undefined){
                    group=[]
                }
                //for google or facebook
            } else if (result && result != "Error" && result.name) {
                username = result.name;
                email = result.email;
                group = []
            } else if (result == "Error") {
                context.profile.error = "Error"
                callBackFunctionFromComponent(context.profile)
                context.canStartFlow = true
                return
            }
        } catch (error) {
            console.log("Error")
            console.log(error)
            context.profile.error = "Error"
            callBackFunctionFromComponent(context.profile)
            context.canStartFlow = true
            return 
        }

        if (context.profile == undefined) {
            context.profile = new Profile();
        }
        var user = await UserResources.getUserId(email)
        if (user.data.getUserByEmail.items[0] == null) {
            console.log("No User on DB ", user)
            group.push(username)
            user = await UserResources.insertUser(email, group)
            if (user != null) {
                context.profile.id = user.data.createUsers.id    
            }
        } else {
            console.log("User found on Db, ", user)
            context.profile.id = user.data.getUserByEmail.items[0].id
            group = user.data.getUserByEmail.items[0].userGroup
        }
        context.profile.username = username;
        context.profile.email = email;
        context.profile.group = group;
        callBackFunctionFromComponent(context.profile)
        context.canStartFlow = true
    }
}
export default ProfileUser;