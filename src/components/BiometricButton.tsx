import { useState } from 'react';
import { Fingerprint, Info } from 'lucide-react';
import { startAuthentication } from '@simplewebauthn/browser';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function BiometricButton() {
  const [showInfo, setShowInfo] = useState(false);

  const handleBiometricLogin = async () => {
    try {
      if (!window.PublicKeyCredential) {
        toast.error('Your device does not support biometric authentication');
        return;
      }

      const resp = await axios.post('http://localhost:5000/generate-authentication-options');
      const attResp = await startAuthentication(resp.data);
      await axios.post('http://localhost:5000/verify-authentication', attResp);
      toast.success('Biometric authentication successful!');
    } catch (error) {
      toast.error('Biometric authentication failed');
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleBiometricLogin}
        className="w-full inline-flex justify-center py-3 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <Fingerprint className="h-5 w-5 text-gray-400" />
        <span className="ml-2">Biometric</span>
      </button>
      {showInfo && (
        <div className="absolute bottom-full left-0 mb-2 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200 text-sm z-10">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Available methods:</p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Fingerprint (if available)</li>
                <li>Face ID/Windows Hello</li>
                <li>Device PIN/Password</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}