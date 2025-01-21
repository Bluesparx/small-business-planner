import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Components/ui/card';
import { Button } from '../Components/ui/button';

const plans = [
  {
    id: 'free',
    title: 'Free Plan',
    description: 'Basic features for individual users',
    features: ['Access to basic features', 'Community support', 'Limited usage'],
    buttonText: 'Select Free Plan',
    buttonVariant: 'outline',
  },
  {
    id: 'pro',
    title: 'Pro Plan',
    description: 'Advanced features for professionals',
    features: ['Unlimited access to features', 'Priority support', 'Advanced analytics'],
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'default',
  },
];

const PlanCard = ({ title, description, features, buttonText, buttonVariant }) => (
  <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button variant={buttonVariant} className="w-full" aria-label={`Select ${title}`}>
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

const SubscriptionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center m-12 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Plan</h1>

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
