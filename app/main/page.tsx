'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MainPage = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user session data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/session'); // Make a GET request to the /api/session endpoint
        const data = await response.json();

        if (response.ok) {
          setUserData(data.user);
        } else {
          setError(data.message || 'Failed to fetch user data');
          router.push('/signin'); // Redirect to the signin page if no session is found
        }
      } catch (err) {
        setError('Error fetching session data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/signout', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (response.ok) {
        router.push('/signin'); // Redirect to signin after successful logout
      } else {
        setError(data.message || 'Failed to log out');
      }
    } catch (err) {
      setError('Error logging out');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {userData ? (
          <div>
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
              Welcome, {userData.name}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 font-medium">Email:</p>
                <p>{userData.email}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">User ID:</p>
                <p>{userData.id}</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>No user session found. Please log in.</p>
            <button
              onClick={() => router.push('/signin')}
              className="mt-4 px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
