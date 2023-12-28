import { useRouter } from 'next/router';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Layout from '../../components/Layout.js';

export default function Page() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onClickLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const onDeleteAccount = async () => {
    // Display confirmation dialog
    setShowConfirmation(true);
  };

  const confirmDeleteAccount = async () => {
    // Call the server-side API endpoint to delete the user
    const response = await fetch('/api/deleteUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    if (response.ok) {
      // Sign the user out after account deletion
      await supabase.auth.signOut();
      router.push('/');
    } else {
      // Handle error, perhaps show an error message to the user
      const errorData = await response.json();
      console.error('Error deleting account:', errorData.error);
      alert('Error deleting account: ' + errorData.error);
    }
  };

  const onCancelDelete = () => {
    setShowConfirmation(false);
  };

  const viewContacts = () => {
    router.push('/admin/contacts'); // Adjust according to your route
  };

  return (
    <Layout title="Profile" description="User profile page">
      <h1 className='wt-title'>Profile</h1>
      <div className="mb-8">
        <button className="rounded px-3 py-2 text-white bg-slate-500 hover:bg-blue-500" onClick={onClickLogout}>
          Sign out
        </button>
        <button className="rounded px-3 py-2 text-white bg-green-500 hover:bg-green-600 ml-4" onClick={viewContacts}>
          Contacts posted
        </button>
        <button className="rounded px-3 py-2 text-white bg-red-500 hover:bg-red-600 ml-4" onClick={onDeleteAccount}>
          Delete account
        </button>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md">
            <h2>Are you sure you want to delete your account?</h2>
            <div className="mt-4 flex justify-around">
              <button className="rounded bg-red-500 text-white px-4 py-2 hover:bg-red-600" onClick={confirmDeleteAccount}>Yes, Delete</button>
              <button className="rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600" onClick={onCancelDelete}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}
      {user && <p>Email: {user.email}</p>}
    </Layout>
  );
}