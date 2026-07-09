import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';

const MortgageCalculator = ({ defaultPrice = 5000000 }) => {
  const [propertyPrice, setPropertyPrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(defaultPrice * 0.2);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  const calculateMortgage = () => {
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;

    if (loanAmount <= 0) {
      setMonthlyPayment(0);
      setPrincipalPaid(0);
      setTotalInterest(0);
      return;
    }

    if (monthlyRate === 0) {
      const emi = loanAmount / numberOfPayments;
      setMonthlyPayment(emi);
      setPrincipalPaid(loanAmount);
      setTotalInterest(0);
      return;
    }

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPaid = emi * numberOfPayments;
    const interest = totalPaid - loanAmount;

    setMonthlyPayment(emi);
    setPrincipalPaid(loanAmount);
    setTotalInterest(interest);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const principalPercent = ((propertyPrice - downPayment) / propertyPrice) * 100;
  const downPaymentPercent = (downPayment / propertyPrice) * 100;

  return (
    <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 p-6 sm:p-8 rounded-sm shadow-md">
      <h3 className="font-serif text-xl font-bold text-primary dark:text-white mb-6 border-b border-slate-100 dark:border-dark-border/20 pb-4">
        Mortgage & EMI Calculator
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Sliders Input */}
        <div className="space-y-6">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-white uppercase tracking-wider">
                Property Price
              </label>
              <span className="text-sm font-bold text-accent">{formatCurrency(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={defaultPrice * 0.5}
              max={defaultPrice * 2.5}
              step={10000}
              value={propertyPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPropertyPrice(val);
                setDownPayment(val * 0.2); // Maintain 20% downpayment ratio dynamically
              }}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-white uppercase tracking-wider">
                Down Payment ({downPaymentPercent.toFixed(0)}%)
              </label>
              <span className="text-sm font-bold text-accent">{formatCurrency(downPayment)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={propertyPrice * 0.9}
              step={5000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-white uppercase tracking-wider">
                Interest Rate
              </label>
              <span className="text-sm font-bold text-accent">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Loan Term */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-white uppercase tracking-wider">
                Loan Term
              </label>
              <span className="text-sm font-bold text-accent">{loanTerm} Years</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>
        </div>

        {/* Output Results */}
        <div className="flex flex-col justify-between bg-slate-50 dark:bg-secondary/20 p-6 rounded-sm border border-slate-100 dark:border-dark-border/10">
          <div className="text-center py-4">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-dark-text-muted uppercase tracking-wider mb-2">
              Estimated Monthly Payment
            </h4>
            <div className="text-4xl font-extrabold text-primary dark:text-white font-serif">
              {formatCurrency(monthlyPayment)}
              <span className="text-xs font-normal text-slate-500 dark:text-dark-text-muted ml-1">/mo</span>
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="space-y-4 my-6">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center text-slate-500 dark:text-dark-text-muted">
                <span className="w-2.5 h-2.5 rounded-full bg-accent mr-2"></span>
                Principal Loan Amount
              </span>
              <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(propertyPrice - downPayment)}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center text-slate-500 dark:text-dark-text-muted">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-600 mr-2"></span>
                Down Payment
              </span>
              <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(downPayment)}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center text-slate-500 dark:text-dark-text-muted">
                <span className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-white mr-2"></span>
                Total Interest Payable
              </span>
              <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(totalInterest)}</span>
            </div>
          </div>

          {/* Visual Bar Breakdown */}
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
            <div className="h-full bg-accent" style={{ width: `${downPaymentPercent}%` }} title="Downpayment"></div>
            <div className="h-full bg-primary dark:bg-white" style={{ width: `${principalPercent}%` }} title="Principal"></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-2">
            <span>Down Payment: {downPaymentPercent.toFixed(0)}%</span>
            <span>Principal: {principalPercent.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
