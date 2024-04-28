import React, { useState } from 'react';
import './Plans.css';
import { plansData } from '../../data/plansData';
import whiteTick from '../../assets/whiteTick.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Plans = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);

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

    const fetchSubscriptionStatus = async () => {
        try {
            const authToken = localStorage.getItem("auth-token");
            if (!authToken) {
                notify_error("You have to log in first!")
                return;
            }

            const response = await fetch('http://localhost:4000/checkSubscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ authToken }),
            });

            const data = await response.json();
            if (data.success) {
                setIsSubscribed(data.isSubscribed);
            } else {
            }
        } catch (error) {
            console.error('Error checking subscription:', error);
        }
    };

    const openPaymentWindow = (amount) => {
        const authToken = localStorage.getItem("auth-token");
        if (!authToken) {
            notify_error("You have to log in first!");
            return;
        }
        
        fetchSubscriptionStatus().then(() => {
            if (!isSubscribed) {
                window.open(`/payment?amount=${amount}`, '_blank', `height=700,width=480,resizable=no,scrollbars=no,location=no,status=no,menubar=no,fullscreen=no,channelmode=no,titlebar=no,alwaysRaised=yes,movable=no`);
            } else {
                notify_error("You are already subscribed!");
            }
        });
    };

    return (
        <div className="plans-container">
            <div className="blur plans-blur-1"></div>
            <div className="blur plans-blur-2"></div>
            <div className="programs-header" id='planuri'>
                <span className='stroke-text'>READY TO START</span>
                <span>YOUR JOURNEY</span>
                <span className='stroke-text'>NOW WITH US</span>
            </div>

            {/* plans card */}
            <div className="plans">
                {plansData.map((plan, i) => (
                    <div className="plan" key={i}>
                        {plan.icon}
                        <span>{plan.name}</span>
                        <span>$ {plan.price}</span>

                        <div className="features">
                            {plan.features.map((feature, i) => (
                                <div className="feature" key={i}>
                                    <img src={whiteTick} alt="" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className='btn' onClick={() => openPaymentWindow(plan.price)}>Join now</button>
                    </div>
                ))}
            </div>
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

export default Plans;
