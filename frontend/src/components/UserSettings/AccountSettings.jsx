import React, { useState, useEffect } from 'react';
import './AccountSettings.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const notify_error = (message) => {
    console.log("failure");
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const fetchUserInfo = async () => {
    try {
      const authToken = localStorage.getItem("auth-token");
      if (!authToken) {
        return;
      }

      const response = await fetch('http://localhost:4000/getUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken }),
      });

      const data = await response.json();
      if (data.success) {
        setName(data.name);
        setEmail(data.email);
      } else {
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const authToken = localStorage.getItem("auth-token");
      if (!authToken) {
        return;
      }

      const response = await fetch('http://localhost:4000/updateUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken, name, email }),
      });

      const data = await response.json();
      if (data.success) {
        notify("User updated successfully!");
      } else {
        notify_error("Failed to update user!");
      }
    } catch (error) {
      notify_error("Failed to update user!");
    }
  };

  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'>Personal Information</h1>

      <div className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Your Name <span>*</span></label>
          <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email <span>*</span></label>
          <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <button className='mainbutton1' onClick={handleSaveChanges}>Save Changes</button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default AccountSettings;
