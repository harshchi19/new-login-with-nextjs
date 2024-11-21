import { Google } from 'lucide-react';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function GoogleButton() {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Signed in with Google successfully!');
    } catch (error) {
      toast.error('Failed to sign in with Google');
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full inline-flex justify-center py-3 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Google className="h-5 w-5 text-gray-400" />
      <span className="ml-2">Google</span>
    </button>
  );
}