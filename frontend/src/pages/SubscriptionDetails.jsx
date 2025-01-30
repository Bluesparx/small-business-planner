import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Button } from "../Components/ui/button"; 
import SubscriptionServiceABI from "../abi/abi.json"; 
import { useNavigate } from "react-router-dom";

const SubscriptionDetailsPage = () => {
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    isActive: false,
    expiryTimestamp: 0,
    remainingTime: 0,
  });
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState(null);
  const [userAddress, setUserAddress] = useState(null); 
  const navigate = useNavigate();

  // subscription details 
  useEffect(() => {
    if (userAddress) {
      fetchSubscriptionDetails(userAddress);
    }
  }, [userAddress]);

  // Handle MetaMask connection
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const account = accounts[0];
        setUserAddress(account);
        alert("Connected MetaMask");
        console.log("Connected MetaMask Address:", account);
      } catch (error) {
        setError("MetaMask connection failed.");
        console.error(error);
      }
    } else {
      setError("Please install MetaMask to proceed.");
    }
  };

  // Fetch subscription details from the smart contract
  const fetchSubscriptionDetails = async (address) => {
    try {
      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x3a84c0e541dfb3fe788634f25809066eface42c1"; 
      const contract = new web3.eth.Contract(SubscriptionServiceABI, contractAddress);

      const details = await contract.methods.getSubscriptionDetails(address).call();
      setSubscriptionDetails({
        isActive: details.isActive,
        expiryTimestamp: Number(details.expiryTimestamp),
        remainingTime: Number(details.remainingTime),
      });
    } catch (error) {
      console.error("Error fetching subscription details:", error);
      setError("Failed to fetch subscription details.");
    }
  };

  // Handle subscription purchase
  const handleSubscribe = async () => {
    if (!userAddress) {
      setError("Please connect MetaMask first.");
      return;
    }

    setIsSubscribing(true);
    setError(null);

    try {
      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x3a84c0e541dfb3fe788634f25809066eface42c1";
      const contract = new web3.eth.Contract(SubscriptionServiceABI, contractAddress);

      const subscriptionFee = Web3.utils.toWei("1", "wei"); 
      await contract.methods
        .subscribe()
        .send({
          from: userAddress,
          value: subscriptionFee,
        });

      alert("Subscription Successful!");
      fetchSubscriptionDetails(userAddress); 
    } catch (error) {
      setError("Error while subscribing. Please try again.");
      console.error(error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleRenew = async () => {
    if (!userAddress) {
      setError("Please connect MetaMask first.");
      return;
    }

    setIsSubscribing(true);
    setError(null);

    try {
      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x3a84c0e541dfb3fe788634f25809066eface42c1"; 
      const contract = new web3.eth.Contract(SubscriptionServiceABI, contractAddress);

      const subscriptionFee = Web3.utils.toWei("1", "wei"); 
      await contract.methods
        .renewSubscription()
        .send({
          from: userAddress,
          value: subscriptionFee,
        });

      alert("Subscription Renewed!");
      fetchSubscriptionDetails(userAddress); 
    } catch (error) {
      setError("Error while renewing subscription. Please try again.");
      console.error(error);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Subscription cancellation
  const handleCancel = async () => {
    if (!userAddress) {
      setError("Please connect MetaMask first.");
      return;
    }

    setIsSubscribing(true);
    setError(null);

    try {
      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x3a84c0e541dfb3fe788634f25809066eface42c1"; 
      const contract = new web3.eth.Contract(SubscriptionServiceABI, contractAddress);

      await contract.methods.cancelSubscription().send({ from: userAddress });

      alert("Subscription Cancelled!");
      setSubscriptionDetails({
        isActive: false,
        expiryTimestamp: 0,
        remainingTime: 0,
      });
    } catch (error) {
      setError("Error while cancelling subscription. Please try again.");
      console.error(error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center m-12 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Subscription Details</h1>

      <div className="w-full max-w-lg p-6 border rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Subscription Information</h2>
        <p>Status: {subscriptionDetails.isActive ? "Active" : "Inactive"}</p>
        <p>Expiry Date: {new Date(subscriptionDetails.expiryTimestamp * 1000).toLocaleString()}</p>
        <p>Remaining Time: {subscriptionDetails.remainingTime > 0 ? `${Math.floor(subscriptionDetails.remainingTime / 60)} minutes` : "Expired"}</p>

        <div className="mt-4 space-x-4">
          {!subscriptionDetails.isActive && (
            <>
              <Button variant="outline" onClick={connectMetaMask}>
                Connect MetaMask
              </Button>
              <Button variant="outline" onClick={handleSubscribe} disabled={isSubscribing}>
                Buy Subscription
              </Button>
            </>
          )}
          {subscriptionDetails.isActive && (
            <>
              <Button variant="outline" onClick={handleRenew} disabled={isSubscribing}>
                Renew Subscription
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isSubscribing}>
                Cancel Subscription
              </Button>
            </>
          )}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default SubscriptionDetailsPage;

