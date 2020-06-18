import React from 'react';
import Amplify, {Auth} from 'aws-amplify';

export default ({}) => {

    Amplify.configure({
        Auth: {
            identitPoolId: 'ap-northeast-1:3893626b-152b-4393-a981-382ec18c274e',
            region: 'ap-northeast-1',
            userPoolId: 'ap-northeast-1_ZGtXRXYue',
            userPoolWebClientId: '1fo7ne7d7iji21fgqo9akf31vf',
        }
    })

    Auth.configure({
        // authenticationFlowType: 'CUSTOM_AUTH',
    })

    // React.useEffect(() => {
    //     fetch('https://tooap4mvb3.execute-api.ap-northeast-1.amazonaws.com/demo/', {
    //         method: 'POST',
    //         body: JSON.stringify({sessionId: '123'}),
    //         credentials: 'include',
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //         })
    // })
    
    const [username, setUsername] = React.useState('test@stransa.co.jp');
    const [password, setPassword] = React.useState('password');

    const handleSubmit = async (e) => {
        e.preventDefault();
        Auth.signIn(username, password)
            .then(user => {
                console.log(user);
                if(user.challengeName === 'CUSTOM_CHALLENGE') {
                    Auth.sendCustomChallengeAnswer(user, '123456')
                        .then(user => console.log(user))
                        .catch(err => console.log(err));
                } else {
                    console.log(user);
                }
            })        
    }

    return <>
        <form onSubmit={handleSubmit}>
            <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="username" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Go</button>
        </form>
    </>
}