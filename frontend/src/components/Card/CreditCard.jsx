import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './CreditCard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreditCard = () => {
    const [cvc, setCvc] = useState('');
    const [expiry, setExpiry] = useState('');
    const [focus, setFocus] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('100');
    const [fieldsCompleted, setFieldsCompleted] = useState(false);

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

    const notify_error = () => {
        console.log("failure");
        toast.error('Please fill in all fields before proceeding.', {
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

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const amountParam = searchParams.get('amount');
        setAmount(amountParam || '100');
    }, []);

    useEffect(() => {
        if (cvc && expiry && name && number) {
            setFieldsCompleted(true);
        } else {
            setFieldsCompleted(false);
        }
    }, [cvc, expiry, name, number]);

    const handleInputFocus = (e) => {
        setFocus(e.target.name);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'cvc':
                setCvc(value);
                break;
            case 'expiry':
                setExpiry(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                break;
        }
    }

    const handlePay = async (e) => {
        e.preventDefault();
        if (!fieldsCompleted) {
            notify_error();
            return;
        }
        try {
            const authToken = localStorage.getItem("auth-token");

            if (!authToken) {
                console.error("No auth token found");
                return;
            }

            const response = await fetch('http://localhost:4000/updateSubscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ authToken, subscriptionStatus: true }),
            });

            const data = await response.json();

            if (data.success) {
                notify("Subscription updated successfully!");
            } else {
                notify_error("Failed to update subscription:", data.error);
            }
        } catch (error) {
            notify_error('Error updating subscription:', error);
        }
    };



    return (
        <div className="payment-form-container">
            <div className="credit-card">
                <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={name}
                    number={number}
                />
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="number" className="card-label">Card Number</label>
                    <input className='card-input'
                        type="tel"
                        id="number"
                        name="number"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        maxLength={16}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="card-label">Cardholder Name</label>
                    <input className='card-input'
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="expiry-cvv-container form-group">
                    <div>
                        <label htmlFor="expiry" className="card-label">Expiry Date</label>
                        <input className='card-input'
                            type="text"
                            id="expiry"
                            name="expiry"
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            maxLength={4}
                        />
                    </div>
                    <div>
                        <label htmlFor="cvc" className="card-label">CVV</label>
                        <input className='card-input'
                            type="tel"
                            id="cvc"
                            name="cvc"
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            maxLength={3}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="amount" className="card-label">Amount to Pay</label>
                    <input className='card-input'
                        type="text"
                        id="amount"
                        name="amount"
                        value={"$" + amount}
                        readOnly
                        tabIndex="-1"
                        disabled
                    />
                </div>
            </form>
            <button className="blue-button" onClick={(e) => { handlePay(e) }}>Pay</button>
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

export default CreditCard;
