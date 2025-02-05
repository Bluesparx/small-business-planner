import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import Web3 from "web3";
import image from '../assets/image.png'

const plans = [
  {
    id: "free",
    title: "Free Plan",
    description: "Basic features for individual users",
    features: ["Access to basic features", "Community support", "Limited usage"],
    buttonText: "Select Free Plan",
    buttonVariant: "outline",
  },
  {
    id: "pro",
    title: "Pro Plan",
    description: "Advanced features for professionals",
    features: [
      "Unlimited access to features",
      "Priority support",
      "Advanced analytics",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "outline",
  },
];

const PlanCard = ({
  title,
  description,
  features,
  buttonText,
  buttonVariant,
}) => {
  const navigate = useNavigate();  
  const handleUpgrade = () => {
    navigate("/subscription-details");  
  };
  

  return (
    <Card className="w-full bg-white/90 max-w-sm hover:shadow-lg border-none transition-shadow">
      <CardHeader className="text-gray-800">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2 text-gray-900">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="text-gray-600">
        <Button
          variant={buttonVariant}
          className="w-full"
          aria-label={`Select ${title}`}
          onClick={title === "Pro Plan" ? handleUpgrade : () => {}}
        >
          {title === "Pro Plan" ? "Upgrade to Pro" : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

const SubscriptionPage = () => {
  return (
    <div className="h-[92vh] flex flex-col items-center justify-center" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', opacity:'0.9'}}>
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Choose Your Plan</h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            title={plan.title}
            description={plan.description}
            features={plan.features}
            buttonText={plan.buttonText}
            buttonVariant={plan.buttonVariant}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
