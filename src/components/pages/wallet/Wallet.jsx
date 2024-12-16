import React, { useState, useEffect } from "react";
import vehicleRentalLogoIcon from "../../../assets/vehicle-rental-logo-icon.png";
import backArrowIcon from "../../../assets/back-arrow-icon.png";
import supportIcon from "../../../assets/support-icon.png";
import walletIcon from "../../../assets/wallet-icon.png";
import creditCardIcon from "../../../assets/credit-card-icon.png";
import addFundsIcon from "../../../assets/credit-card-icon.png";
import transactionIcon from "../../../assets/credit-card-icon.png";

import "./Wallet.css";

const Wallet = ({ currentUser }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // Mock fetch for wallet balance and transactions
    const fetchWalletData = async () => {
      try {
        // Replace with actual API calls
        setWalletBalance(currentUser?.wallet.balance ?? 0);
        setRecentTransactions(currentUser?.wallet.transactions ?? []);
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
      }
    };

    fetchWalletData();
  }, [currentUser]);

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <img src={backArrowIcon} alt="Back" className="back-arrow-icon" />
        <h1>Wallet</h1>
        <img src={supportIcon} alt="Support" className="wallet-support-icon" />
      </div>

      <img src={vehicleRentalLogoIcon} alt="Logo" className="wallet-logo" />

      <div className="wallet-balance">
        <div>
          <label>Availabel Balance</label>
          <button>Add Balance</button>
        </div>
        <div>
          <span>{walletBalance.toFixed(2)} EGP</span>
          <label>Wallet Balance</label>
        </div>
        {/* <img src={walletIcon} alt="Wallet Icon" className="wallet-icon" /> */}
      </div>

      <div className="wallet-balance">
        <img src={walletIcon} alt="Wallet Icon" className="wallet-icon" />
        <div>
          <label>Wallet Balance</label>
          <span>${walletBalance.toFixed(2)}</span>
        </div>
      </div>

      <div className="wallet-balance">
        <img src={walletIcon} alt="Wallet Icon" className="wallet-icon" />
        <div>
          <label>Wallet Balance</label>
          <span>${walletBalance.toFixed(2)}</span>
        </div>
      </div>

      
      <h2 className="wallet-transactions-title">Recent Transactions</h2>
      <div className="wallet-transactions">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction, index) => (
            <div key={index} className="transaction-container">
              <img
                src={transactionIcon}
                alt="Transaction"
                className="transaction-icon"
              />
              <div className="transaction-details">
                <label>{transaction.description}</label>
                <span
                  className={
                    transaction.amount < 0
                      ? "transaction-negative"
                      : "transaction-positive"
                  }
                >
                  ${transaction.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-transactions">No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default Wallet;
