import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const authHelper = async () => {
	const provider = new GoogleAuthProvider();
	const auth = getAuth();

	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		// The signed-in user info.
		const user = result.user;

		return {
			isError: false,
			data: { user, token }
		};
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);
		// ...
		return {
			isError: true,
			data: { errorCode, errorMessage, email }
		};
	}
};

export { authHelper };
