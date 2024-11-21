import { startRegistration } from '@simplewebauthn/browser';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import EmailForm from './EmailForm';
import GoogleButton from './GoogleButton';
import BiometricButton from './BiometricButton';

export default function AuthForm() {
  const handleBiometricRegistration = async () => {
    try {
      if (!window.PublicKeyCredential) {
        toast.error('Your device does not support biometric authentication');
        return;
      }

      const resp = await axios.post('http://localhost:5000/generate-registration-options');
      const attResp = await startRegistration(resp.data);
      await axios.post('http://localhost:5000/verify-registration', attResp);
      toast.success('Biometric registration successful!');
    } catch (error) {
      toast.error('Biometric registration failed');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>

        <EmailForm />

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <GoogleButton />
            <BiometricButton />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
          <div className="text-sm">
            <button
              onClick={handleBiometricRegistration}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register Biometric
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}