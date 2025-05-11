import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../config/firebase';
import { useEffect } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth(navigation) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '366168998435-fjgre61k3oce6cfnnngi5ggsl7hj889t.apps.googleusercontent.com366168998435-fjgre61k3oce6cfnnngi5ggsl7hj889t.apps.googleusercontent.com',
    iosClientId: '366168998435-fjgre61k3oce6cfnnngi5ggsl7hj889t.apps.googleusercontent.com366168998435-fjgre61k3oce6cfnnngi5ggsl7hj889t.apps.googleusercontent.com',
    androidClientId: '366168998435-fjgre61k3oce6cfnnngi5ggsl7hj889t.apps.googleusercontent.com366168998435-fjgre61k3oce6cfnnngi5ggsl7hj889t.apps.googleusercontent.com',
    webClientId: '366168998435-fjgre61k3oce6cfnnngi5ggsl7hj889t.apps.googleusercontent.com366168998435-fjgre61k3oce6cfnnngi5ggsl7hj889t.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => navigation.navigate('NewDream'))
        .catch((err) => alert(err.message));
    }
  }, [response]);

  return { promptAsync };
}
