
import React, { useState, useEffect, useContext } from 'react';
import { User, ShieldCheck, Trash2, Edit3, Save, XCircle } from 'lucide-react';
// import AuthContext from '../Context/AuthContext'; // 👈 Import your AuthContext

const Profile = () => {
  // const { user, token } = useContext(AuthContext); // 👈 Get user from context in a real app

  // --- MOCK DATA (Replace with API call) ---
  const [userData, setUserData] = useState({
    username: 'CodeWizard',
    email: 'user@example.com',
    joinDate: '2025-08-21',
    totalLinks: 42,
  });
  // --- END MOCK DATA ---

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: userData.username });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [message, setMessage] = useState({ text: '', type: '' });

  // In a real app, you'd fetch user data like this:
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     // const data = await getUserProfile(token);
  //     // setUserData(data);
  //     // setFormData({ username: data.username });
  //   };
  //   fetchUserData();
  // }, [token]);

  const showTemporaryMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // --- API Call Simulation ---
    console.log('Updating profile with:', formData);
    setUserData(prev => ({ ...prev, username: formData.username }));
    setIsEditing(false);
    showTemporaryMessage('Profile updated successfully!', 'success');
    // In a real app:
    // try {
    //   await updateUser({ username: formData.username }, token);
    //   ...
    // } catch (error) { showTemporaryMessage('Update failed!', 'error'); }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      showTemporaryMessage('New passwords do not match.', 'error');
      return;
    }
    if (passwordData.new.length < 6) {
        showTemporaryMessage('Password must be at least 6 characters.', 'error');
        return;
    }
    // --- API Call Simulation ---
    console.log('Changing password...');
    showTemporaryMessage('Password changed successfully!', 'success');
    setPasswordData({ current: '', new: '', confirm: '' });
  };
  
  const TabButton = ({ tabName, icon, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tabName
          ? 'bg-indigo-600 text-white'
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-4">
        <TabButton tabName="profile" label="Profile" icon={<User size={16} />} />
        <TabButton tabName="security" label="Security" icon={<ShieldCheck size={16} />} />
        <TabButton tabName="danger" label="Danger Zone" icon={<Trash2 size={16} />} />
      </div>

      {/* Notification Message */}
      {message.text && (
        <div className={`p-4 mb-6 rounded-lg text-center ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {message.text}
        </div>
      )}

      {/* Tab Content */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 md:p-8 shadow-2xl">
        {activeTab === 'profile' && (
          <div>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    <p className="text-gray-400 mt-1">Update your account's profile information.</p>
                </div>
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                        <Edit3 size={16}/> Edit
                    </button>
                ) : null}
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <InfoRow label="Username" value={userData.username} />
                <InfoRow label="Email Address" value={userData.email} />
                <InfoRow label="Member Since" value={new Date(userData.joinDate).toLocaleDateString()} />
                <InfoRow label="Links Shortened" value={userData.totalLinks} />
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                  <input type="text" id="username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
                </div>
                <div className="flex items-center gap-4 pt-2">
                    <button type="submit" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition">
                        <Save size={16}/> Save Changes
                    </button>
                    <button type="button" onClick={() => { setIsEditing(false); setFormData({ username: userData.username }); }} className="flex items-center gap-2 text-gray-300 hover:text-white font-semibold py-2 px-4 rounded-lg transition">
                        <XCircle size={16}/> Cancel
                    </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold mb-1">Change Password</h2>
            <p className="text-gray-400 mb-6">Choose a strong, new password to keep your account secure.</p>
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <PasswordField id="current" label="Current Password" value={passwordData.current} onChange={e => setPasswordData({...passwordData, current: e.target.value})}/>
                <PasswordField id="new" label="New Password" value={passwordData.new} onChange={e => setPasswordData({...passwordData, new: e.target.value})}/>
                <PasswordField id="confirm" label="Confirm New Password" value={passwordData.confirm} onChange={e => setPasswordData({...passwordData, confirm: e.target.value})}/>
                <div className="pt-2">
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg transition">Update Password</button>
                </div>
            </form>
          </div>
        )}

        {activeTab === 'danger' && (
            <div>
                <h2 className="text-2xl font-bold text-red-400 mb-1">Danger Zone</h2>
                <p className="text-gray-400 mb-6">These actions are permanent and cannot be undone.</p>
                <div className="border border-red-500/30 bg-red-500/10 p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-white">Delete this Account</h3>
                        <p className="text-gray-400 text-sm mt-1">Once you delete your account, you will lose all of your data.</p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors whitespace-nowrap">
                        Delete Account
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

// Helper components to keep the main return clean
const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-sm font-semibold text-gray-400">{label}</p>
    <p className="text-lg mt-1">{value}</p>
  </div>
);

const PasswordField = ({ id, label, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input type="password" id={id} value={value} onChange={onChange} required className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
    </div>
);

export default Profile;