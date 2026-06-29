import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { UserSession } from '../types';

interface LoginProps {
  onLogin: (user: UserSession) => void;
}

const DEFAULT_ADMIN_USERNAME = 'Admin';
const DEFAULT_ADMIN_PASSWORD = 'Admin@123';

function loadAccounts() {
  const stored = localStorage.getItem('sitespawn_accounts');
  const accounts = stored ? JSON.parse(stored) as Record<string, { username: string; password: string; role: 'admin' | 'user' }> : {};
  const normalizedAdmin = DEFAULT_ADMIN_USERNAME.toLowerCase();

  if (!accounts[normalizedAdmin]) {
    accounts[normalizedAdmin] = {
      username: DEFAULT_ADMIN_USERNAME,
      password: DEFAULT_ADMIN_PASSWORD,
      role: 'admin'
    };
  }

  return accounts;
}

function saveAccounts(accounts: Record<string, { username: string; password: string; role: 'admin' | 'user' }>) {
  localStorage.setItem('sitespawn_accounts', JSON.stringify(accounts));
}

export default function Login({ onLogin }: LoginProps) {
  const [view, setView] = useState<'signin' | 'signup'>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setStatus(null);
    if (!username.trim() || !password.trim()) {
      setStatus({ type: 'error', msg: 'Username and password are required.' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const accounts = loadAccounts();
      const account = accounts[username.trim().toLowerCase()];

      if (!account) {
        setStatus({ type: 'error', msg: 'Account not found. Please sign up first.' });
        setLoading(false);
        return;
      }

      if (account.password !== password) {
        setStatus({ type: 'error', msg: 'Incorrect password.' });
        setLoading(false);
        return;
      }

      const user: UserSession = {
        name: account.username,
        username: account.username,
        role: account.role,
      };
      localStorage.setItem('sitespawn_user', JSON.stringify(user));
      onLogin(user);
      window.location.hash = '';
    }, 700);
  };

  const handleSignUp = () => {
    setStatus(null);
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setStatus({ type: 'error', msg: 'All fields are required.' });
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: 'error', msg: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const accounts = loadAccounts();
      const normalized = username.trim().toLowerCase();
      if (accounts[normalized]) {
        setStatus({ type: 'error', msg: 'That username is already taken.' });
        setLoading(false);
        return;
      }

      const role = normalized === DEFAULT_ADMIN_USERNAME ? 'admin' : 'user';
      accounts[normalized] = { username: username.trim(), password, role };
      saveAccounts(accounts);

      const user: UserSession = {
        name: username.trim(),
        username: username.trim(),
        role,
      };
      localStorage.setItem('sitespawn_user', JSON.stringify(user));
      onLogin(user);
      window.location.hash = '';
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF5EC] p-6">
      <div className="w-full max-w-md bg-white border border-black/10 p-8 rounded-none shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-medium">{view === 'signin' ? 'Sign in to SiteSpawn' : 'Create your account'}</h2>
          <p className="text-xs text-neutral-500 mt-2">
            {view === 'signin'
              ? 'Sign in with your username and password.'
              : 'Create a new account with a username and password.'}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500 block mb-1">Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border p-3 text-xs"
              placeholder="username"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border p-3 text-xs"
              placeholder="password"
            />
          </div>

          {view === 'signup' && (
            <div>
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500 block mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full border p-3 text-xs"
                placeholder="confirm password"
              />
            </div>
          )}

          {status && (
            <p className={`text-xs ${status.type === 'error' ? 'text-rose-600' : 'text-emerald-700'}`}>{status.msg}</p>
          )}

          <button
            type="button"
            disabled={loading}
            onClick={view === 'signin' ? handleSignIn : handleSignUp}
            className="w-full bg-black text-white py-3 text-[10px] uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-2"
          >
            {loading ? (view === 'signin' ? 'Signing in...' : 'Signing up...') : (
              <>
                {view === 'signin' ? 'Sign in' : 'Create account'} <ArrowRight className="h-3 w-3" />
              </>
            )}
          </button>

          {view === 'signin' ? (
            <div className="text-center text-[10px] uppercase tracking-[0.15em] text-neutral-500">
              Don't have an account?{' '}
              <button type="button" onClick={() => { setView('signup'); setStatus(null); }} className="font-bold text-black underline-offset-2 hover:underline">
                Sign up
              </button>
            </div>
          ) : (
            <div className="text-center text-[10px] uppercase tracking-[0.15em] text-neutral-500">
              Already have an account?{' '}
              <button type="button" onClick={() => { setView('signin'); setStatus(null); }} className="font-bold text-black underline-offset-2 hover:underline">
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
