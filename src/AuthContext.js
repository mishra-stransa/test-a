import React, {createContext, useState} from 'react';
import Amplify, {Auth} from 'aws-amplify';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);

    const logout = () => {
        window.location.href = `${process.env.REACT_APP_AUTHENTICATOR_URL}/logout/${encodeURIComponent('http://localhost:3001')}`
    }

    const handleCognitoLogin = async (sessionId, authKey, username) => {
        Amplify.configure({
            Auth: {
                identitPoolId: 'ap-northeast-1:3893626b-152b-4393-a981-382ec18c274e',
                region: 'ap-northeast-1',
                userPoolId: 'ap-northeast-1_ZGtXRXYue',
                userPoolWebClientId: '1fo7ne7d7iji21fgqo9akf31vf',
                authenticationFlowType: 'CUSTOM_AUTH', 
            }
        })
        try {
            const user = await Auth.signIn(username)            
            const customUser = await  Auth.sendCustomChallengeAnswer(user, authKey, {
                sessionId,
            })
            setToken(customUser.signInUserSession.accessToken.jwtToken)
            return false;
        } catch(err) {
            console.log(err);
            return 'Some error';
        }
    }

    const getCookie = (name) => {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin === -1) {
            begin = dc.indexOf(prefix);
            if (begin !== 0) return null;
        }
        else
        {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end === -1) {
                end = dc.length;
            }
        }
        return decodeURI(dc.substring(begin + prefix.length, end));
    } 

    React.useEffect(() => {
        // const authenticated = getCookie('sso-authenticated')
        // alert('' + authenticated);
        // if(authenticated) {
            fetch('https://tooap4mvb3.execute-api.ap-northeast-1.amazonaws.com/demo/', {
                method: 'POST',
                body: JSON.stringify({'sesson': ''}),
                credentials: 'include',
            })
                .then(res => res.json())
                .then(res => {
                    // alert(JSON.stringify(res));
                    const tokens = {...res.Item};
                    if(!tokens.sessionId) {
                        window.location.href = `${process.env.REACT_APP_AUTHENTICATOR_URL}/login/${encodeURIComponent('http://localhost:3001')}`
                    }
                    handleCognitoLogin(tokens.sessionId, tokens.authKey, tokens.username);
                })
                .catch(err => {
                    alert(JSON.stringify(err));
                    window.location.href = `${process.env.REACT_APP_AUTHENTICATOR_URL}/login/${encodeURIComponent('http://localhost:3001')}`
                })
        // } else {            
        // }
    }, [])

    return (
        <AuthContext.Provider value={{
            token,
            setToken,
            logout,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;