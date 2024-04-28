import React, { useState, useEffect } from 'react';
import './Users.css';
import cross_icon from '../../assets/cross_icon.png';
import plus_icon from '../../assets/plus_icon.png';
import minus_icon from '../../assets/minus-icon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
    const [allUsers, setAllUsers] = useState([]);

    const notify = () => {
        toast.success('User removed successfully!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    const updateAdminStatusToFalse = async (email) => {
        try {
            await fetch('http://localhost:4000/updateAdminStatusToFalse', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    fetchUserInfo();
                } else {
                }
            });
        } catch (error) {
            console.error('Error updating admin status to false:', error);
        }
    };
    

    const fetchUserInfo = () => {
        fetch('http://localhost:4000/allUsers')
            .then((res) => res.json())
            .then((data) => setAllUsers(data));
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);


    const removeUser = async (email) => {
        await fetch('http://localhost:4000/removeuser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    notify();
                    fetchUserInfo();
                }
            });
    }

    const updateUserAdminStatus = async (email) => {
        try {
            await fetch('http://localhost:4000/updateUserAdminStatus', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        fetchUserInfo();
                    } else {
                    }
                });
        } catch (error) {
            console.error('Error updating user admin status:', error);
        }
    };

    return (
        <div className="listuser">
            <h1>All Users List</h1>
            <div className="listuser-format-main">
                <p>Name</p>
                <p>Email</p>
                <p>Role</p>
                <p>Promote</p>
                <p>Remove</p>
            </div>
            <div className="listuser-allexercises">
                <hr />
                {allUsers.map((user) => (
                    <div key={user.userId}>
                        <div className="listuser-format-main listuser-format">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.admin ? "Admin" : "User"}</p>
                            {user.admin ? (
                                <img
                                    className="listuser-remove-icon"
                                    onClick={() => updateAdminStatusToFalse(user.email)}
                                    src={minus_icon}
                                    alt=""
                                />
                            ) : (
                                <img
                                    className="listuser-remove-icon"
                                    onClick={() => updateUserAdminStatus(user.email)}
                                    src={plus_icon}
                                    alt=""
                                />
                            )}
                            <img
                                className="listuser-remove-icon"
                                onClick={() => removeUser(user.email)}
                                src={cross_icon}
                                alt=""
                            />
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
                        <hr />
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Users;
