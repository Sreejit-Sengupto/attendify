import { useState } from 'react';
import { Fingerprint, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { account } from '../../appwrite/config';
import { toast } from 'react-toastify';

const NewPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [queryParams, setQueryParams] = useSearchParams();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      const userId = queryParams.get('userId');
      const secret = queryParams.get('secret');

      const token = await account.updateRecovery(userId, secret, password);
      if (!token) {
        toast.error('Failed to reset password', {
          style: {
            backgroundColor: '#121215',
            border: '1px solid #2D2C31',
            borderRadius: '12px',
            color: 'white',
          },
        });
        return;
      }
      toast.success('Password updated', {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
      setError('');
      navigate('/login');
    } catch (error) {
      setError(error.message);
      toast.error(error.message, {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#18181C] text-[#E5E5E7]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#121215]">
        <Link className="flex items-center justify-center" href="/">
          <Fingerprint className="h-6 w-6 text-[#FC356C]" />
          <span className="ml-2 text-2xl font-bold text-[#E5E5E7]">
            Attendify
          </span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#121215] border border-border py-10 px-5 rounded-lg">
          <div>
            <p className="text-2xl text-center text-[#E5E5E7] font-semibold">
              Set New Password
            </p>
            <p className="text-center text-[#A9A9AB] text-sm my-2">
              Enter your new password below
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="new-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#E5E5E7]"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#1C1D20] border-[#2D2C31] text-[#E5E5E7] placeholder-[#A9A9AB] p-3 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#A9A9AB] hover:text-[#FC356C]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#E5E5E7]"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-[#1C1D20] border-[#2D2C31] text-[#E5E5E7] placeholder-[#A9A9AB] p-3 rounded-lg"
                />
              </div>
              {error && <p className="text-[#FC356C] text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#FC356C] text-[#E5E5E7] hover:bg-[#FC356C]/90 disabled:bg-accent/80 p-3 rounded-lg flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Set New Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <footer className="py-6 w-full shrink-0 px-4 md:px-6 border-t border-[#2D2C31] bg-[#121215]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-0">
          <p className="text-xs text-[#A9A9AB]">
            © 2024 Attendify. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-xs text-[#A9A9AB] hover:text-[#FC356C] transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs text-[#A9A9AB] hover:text-[#FC356C] transition-colors"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default NewPasswordPage;
