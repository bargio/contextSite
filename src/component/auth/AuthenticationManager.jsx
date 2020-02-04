import { Auth } from "aws-amplify";

const AuthenticationManager = {
    signIn: async function SignIn(username, password) {
        try {
            const user = await Auth.signIn(username, password);
            console.log(user)
            return "ok"
        } catch (err) {
            if (err.code === 'UserNotConfirmedException') {
                console.log('UserNotConfirmedException')
                return "Utente non confermato. Controlla la tua mail per confermare l'utente";
            } else if (err.code === 'PasswordResetRequiredException') {
                console.log('PasswordResetRequiredException')
                return "Effettuare reset della password";
            } else if (err.code === 'NotAuthorizedException') {
                console.log('NotAuthorizedException')
                return "Password Errata";
            } else if (err.code === 'UserNotFoundException') {
                console.log('UserNotFoundException')
                return "Utente non presente";
            } else {
                console.log(err);
                return err.message;
            }
        }
    },

    signUp: async function signUp(username, password, email) {
        const c = await Auth.signUp({
            username,
            password,
            attributes: {
                email
            },
            validationData: []  //optional
        })
            .then(data => { return data })
            .catch(err => { return err });
        console.log(c)

        if (c.code != undefined) {
            switch (c.code) {
                case "UsernameExistsException":
                    return "Nome utente già esistente";
                case "InvalidParameterException":
                    if (c.message.includes("email")) {
                        return "Formato email non valido"
                    }
                    return "Password non valida.";
                case "InvalidPasswordException":
                    return "Password non conforme alle policy. La lunghezza minima accetta è di 6 caratteri"
                default:
                    return "Errore generico"
            }
        }
        return "ok"
    },
    confirmSignUp: async function confirmSignUp(username, code) {
        const auth = await Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        }).then(data => { return data })
            .catch(err => { return err });
        if (auth.code != undefined) {
            switch (auth.code) {
                case "CodeMismatchException":
                    return "Codice non valido";
                case "NotAuthorizedException":
                    return "Utente già confermato"
            }
        }
        return "ok"
    },
    resendCodeSignUp: async function resendCodeSignUp(username) {
        Auth.resendSignUp(username).then(() => {
            console.log('code resent successfully');
        }).catch(e => {
            console.log(e);
        });
    },

    isLoggedIn: function isLoggedIn(callBackFunction) {
        Auth.currentAuthenticatedUser().then(user => {
        console.log(user)
        callBackFunction(user)
        }).catch(e => {
            console.log(e);
            callBackFunction("Error")
        });
    }
}
export default AuthenticationManager;