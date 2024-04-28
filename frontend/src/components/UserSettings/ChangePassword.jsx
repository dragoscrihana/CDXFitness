import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'oldpass') {
            setOldPassword(value);
        } else if (name === 'newpass') {
            setNewPassword(value);
        } else if (name === 'confirmpass') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmPassword) {
            notify_error('Please fill in all fields!');
            return;
        }
        if (newPassword !== confirmPassword) {
            notify_error('New password and confirm password must match!');
            return;
        }
        try {
            const authToken = localStorage.getItem('auth-token');
            const response = await fetch('http://localhost:4000/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ authToken, oldPassword, newPassword }),
            });
            const data = await response.json();
            if (data.success) {
                notify("Password changed successfully!");
            } else {
                notify_error('Failed to change password');
            }
        } catch (error) {
            notify_error('Failed to change password');
        }
    };

    return (
        <div className='accountsettings'>
            <h1 className='mainhead1'>Change Password</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='oldpass'>Old Password <span>*</span></label>
                    <input
                        type='password'
                        name='oldpass'
                        id='oldpass'
                        value={oldPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='newpass'>New Password <span>*</span></label>
                    <input
                        type='password'
                        name='newpass'
                        id='newpass'
                        value={newPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='confirmpass'>Confirm Password <span>*</span></label>
                    <input
                        type='password'
                        name='confirmpass'
                        id='confirmpass'
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <button className='mainbutton1' onClick={handleSubmit}>Save Changes</button>
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
};

export default ChangePassword;
