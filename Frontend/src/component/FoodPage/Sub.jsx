import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Sub.css';

const FoodSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { name, price, currency } = location.state || { name: "Meal", price: 0, currency: "$" };
  const [mealTime, setMealTime] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [mealFrequency, setMealFrequency] = useState(null);
  const [mealQuantity, setMealQuantity] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loadingSubscriptionCheck, setLoadingSubscriptionCheck] = useState(true);
  const [summary, setSummary] = useState({ basePrice: 0, totalPrice: 0, discount: 0, finalPrice: 0, deliveryDays: 0, itemsCount: 0 });
  const [processStep, setProcessStep] = useState('initial');

  useEffect(() => {
    const checkActiveSubscriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return setLoadingSubscriptionCheck(false);

        const userProfileResponse = await axios.get('http://localhost:4000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (userProfileResponse.data?.data?.subcribed === true) {
          setHasActiveSubscription(true);
          return;
        }

        const userId = userProfileResponse.data.data._id;
        const subsResponse = await axios.get(`http://localhost:4000/api/subscribe/user/${userId}/active`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const activeSubscriptions = subsResponse.data.data || [];
        setHasActiveSubscription(activeSubscriptions.length > 0);
      } catch (error) {
        console.error("Subscription check failed:", error);
      } finally {
        setLoadingSubscriptionCheck(false);
      }
    };

    checkActiveSubscriptions();
  }, []);

  useEffect(() => {
    if (mealTime && mealPlan && mealFrequency && mealQuantity) {
      let basePrice = price * mealQuantity;
      let days = mealFrequency === 'mon-fri' ? 20 : 24;
      let discount = mealPlan === '1month' ? 0.1 : 0;
      const totalPrice = basePrice * days;
      const discountAmount = totalPrice * discount;
      const finalPrice = totalPrice - discountAmount;
      setSummary({ basePrice, totalPrice, discount: discountAmount, finalPrice, deliveryDays: days, itemsCount: days * mealQuantity });
    }
  }, [price, mealPlan, mealFrequency, mealQuantity, mealTime]);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubscribe = () => {
    if (hasActiveSubscription) {
      alert("You already have an active subscription.");
      return;
    }
    if (!startDate || !mealTime || !mealPlan || !mealFrequency || !mealQuantity) {
      alert("Please complete all required selections.");
      return;
    }
    setProcessStep('enterDetails');
  };

  const OptionButton = ({ selected, onClick, children }) => (
    <button 
      onClick={onClick} 
      className={`option-button ${selected ? 'selected' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <div className="food-subscription-container">
      <h1 className="food-subscription-title">🍽 Subscribe to {name}</h1>

      {hasActiveSubscription && !loadingSubscriptionCheck && (
        <div className="subscription-warning">
          ⚠ You already have an active subscription. Manage it before creating a new one.
        </div>
      )}

      <div className="subscription-sections">
        <div className="option-section">
          <div className="option-card">
            <div className="option-card-header">
              <div className="option-icon">⏰</div>
              <h2 className="option-title">Meal Time</h2>
            </div>
            <div className="option-buttons">
              <OptionButton selected={mealTime === 'lunch'} onClick={() => setMealTime('lunch')}>☀ Lunch</OptionButton>
              <OptionButton selected={mealTime === 'dinner'} onClick={() => setMealTime('dinner')}>🌙 Dinner</OptionButton>
            </div>
          </div>

        
          <div className="option-card">
            <div className="option-card-header">
              <div className="option-icon">🚚</div>
              <h2 className="option-title">Frequency</h2>
            </div>
            <div className="option-buttons">
              <OptionButton selected={mealFrequency === 'mon-fri'} onClick={() => setMealFrequency('mon-fri')}>📆 Mon–Fri</OptionButton>
              <OptionButton selected={mealFrequency === 'mon-sat'} onClick={() => setMealFrequency('mon-sat')}>📆 Mon–Sat</OptionButton>
            </div>
          </div>

          <div className="option-card">
            <div className="option-card-header">
              <div className="option-icon">📦</div>
              <h2 className="option-title">Quantity</h2>
            </div>
            <div className="option-buttons">
              <OptionButton selected={mealQuantity === 1} onClick={() => setMealQuantity(1)}>👤 1</OptionButton>
              <OptionButton selected={mealQuantity === 2} onClick={() => setMealQuantity(2)}>👥 2</OptionButton>
              <OptionButton selected={mealQuantity === 3} onClick={() => setMealQuantity(3)}>👥 3</OptionButton>
            </div>
          </div>

          <div className="option-card">
            <div className="option-card-header">
              <div className="option-icon">📅</div>
              <h2 className="option-title">Start Date</h2>
            </div>
            <input
              type="date"
              min={getTomorrowDate()}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={hasActiveSubscription || loadingSubscriptionCheck}
              className="date-input"
            />
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-box">
            <h2 className="summary-section-title">✅ Subscription Summary</h2>
            <div className="summary-item-group">
              <div className="summary-row">
                <span>Meal Plan:</span>
                <span className="summary-value">{mealPlan ? '1 Month' : '-'}</span>
              </div>
              <div className="summary-row">
                <span>Frequency:</span>
                <span className="summary-value">{mealFrequency === 'mon-fri' ? 'Mon–Fri' : mealFrequency === 'mon-sat' ? 'Mon–Sat' : '-'}</span>
              </div>
              <div className="summary-row">
                <span>Quantity:</span>
                <span className="summary-value">{mealQuantity || '-'}</span>
              </div>
              <div className="summary-row">
                <span>Start Date:</span>
                <span className="summary-value">{startDate || '-'}</span>
              </div>
              <div className="summary-row">
                <span>Total Days:</span>
                <span className="summary-value">{summary.deliveryDays}</span>
              </div>
              <div className="summary-row">
                <span>Total Items:</span>
                <span className="summary-value">{summary.itemsCount}</span>
              </div>
            </div>
            <div className="summary-item-group">
              <div className="summary-row">
                <span>Price per meal:</span>
                <span className="summary-value">{currency}{price.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span className="summary-value">{currency}{summary.totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Discount:</span>
                <span className="summary-value">-{currency}{summary.discount.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span>{currency}{summary.finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleSubscribe} 
              className={`subscribe-button ${loadingSubscriptionCheck ? 'disabled' : ''} ${hasActiveSubscription ? 'manage' : ''}`}
              disabled={loadingSubscriptionCheck}
            >
              {hasActiveSubscription ? 'Manage Subscription' : 'Subscribe Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSubscription;
