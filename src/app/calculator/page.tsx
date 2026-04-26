"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingDown, Info } from "lucide-react";
import Link from "next/link";

// M = P * [r(1+r)^n] / [(1+r)^n - 1]
function calcMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Back-calculate max loan from max monthly payment
function calcMaxLoan(monthlyPayment: number, annualRate: number, years: number): number {
  if (monthlyPayment <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyPayment * n;
  return (monthlyPayment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
}

function fmt(n: number) {
  return "R " + Math.round(n).toLocaleString("en-ZA");
}

const inputCls =
  "w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900";

function Slider({
  label, value, min, max, step, unit, onChange, format,
}: {
  label: string; value: number; min: number; max: number; step: number;
  unit?: string; onChange: (v: number) => void; format?: (v: number) => string;
}) {
  const display = format ? format(value) : `${value}${unit ?? ""}`;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-sm font-bold text-amber-600">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-amber-500 cursor-pointer"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{format ? format(min) : `${min}${unit ?? ""}`}</span>
        <span>{format ? format(max) : `${max}${unit ?? ""}`}</span>
      </div>
    </div>
  );
}

function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-3 border-b border-slate-100 last:border-0 ${highlight ? "font-semibold" : ""}`}>
      <span className={highlight ? "text-slate-900" : "text-slate-500 text-sm"}>{label}</span>
      <span className={highlight ? "text-xl text-amber-600" : "text-slate-800 text-sm"}>{value}</span>
    </div>
  );
}

function BondCalculator() {
  const [price, setPrice] = useState(1500000);
  const [deposit, setDeposit] = useState(150000);
  const [rate, setRate] = useState(11.25);
  const [years, setYears] = useState(20);

  const principal = Math.max(0, price - deposit);
  const monthly = useMemo(() => calcMonthlyPayment(principal, rate, years), [principal, rate, years]);
  const totalRepaid = monthly * years * 12;
  const totalInterest = totalRepaid - principal;
  const depositPct = price > 0 ? ((deposit / price) * 100).toFixed(1) : "0";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-slate-100 p-7 space-y-7">
        <Slider label="Property Price" value={price} min={200000} max={10000000} step={50000}
          onChange={setPrice} format={fmt} />
        <Slider label={`Deposit (${depositPct}%)`} value={deposit} min={0} max={price} step={10000}
          onChange={(v) => setDeposit(Math.min(v, price))} format={fmt} />
        <Slider label="Interest Rate" value={rate} min={7} max={18} step={0.25}
          onChange={setRate} unit="%" />
        <Slider label="Loan Term" value={years} min={5} max={30} step={1}
          onChange={setYears} unit=" years" />

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            SA prime lending rate is currently <strong>11.25%</strong>. Most home loans are granted at
            prime minus 0.5% to prime plus 2% depending on your credit profile.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-5">
        <div className="bg-slate-900 rounded-2xl p-7 text-white">
          <p className="text-slate-400 text-sm mb-1">Monthly Repayment</p>
          <p className="text-4xl font-bold text-amber-400">{fmt(monthly)}</p>
          <p className="text-slate-400 text-xs mt-2">per month for {years} years</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-7">
          <h3 className="font-semibold text-slate-900 mb-1">Breakdown</h3>
          <ResultRow label="Property Price" value={fmt(price)} />
          <ResultRow label="Deposit" value={`${fmt(deposit)} (${depositPct}%)`} />
          <ResultRow label="Loan Amount" value={fmt(principal)} />
          <ResultRow label="Interest Rate" value={`${rate}% per year`} />
          <ResultRow label="Total Interest Paid" value={fmt(totalInterest)} />
          <ResultRow label="Total Amount Repaid" value={fmt(totalRepaid)} />
          <ResultRow label="Monthly Repayment" value={fmt(monthly)} highlight />
        </div>

        <Link
          href="/properties?type=sale"
          className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm"
        >
          Browse Properties For Sale
        </Link>
      </div>
    </div>
  );
}

function AffordabilityCalculator() {
  const [grossIncome, setGrossIncome] = useState(35000);
  const [expenses, setExpenses] = useState(8000);
  const [deposit, setDeposit] = useState(100000);
  const [rate, setRate] = useState(11.25);
  const [years, setYears] = useState(20);

  // SA banks typically allow up to 30% of gross income for bond repayment
  const maxMonthly = useMemo(() => {
    const disposable = grossIncome - expenses;
    return Math.min(grossIncome * 0.3, disposable * 0.5);
  }, [grossIncome, expenses]);

  const maxLoan = useMemo(() => calcMaxLoan(maxMonthly, rate, years), [maxMonthly, rate, years]);
  const maxProperty = maxLoan + deposit;
  const affordabilityScore = grossIncome > 0 ? Math.min(100, Math.round((maxMonthly / grossIncome) * 100 * (10 / 3))) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-slate-100 p-7 space-y-7">
        <Slider label="Gross Monthly Income" value={grossIncome} min={5000} max={200000} step={1000}
          onChange={setGrossIncome} format={fmt} />
        <Slider label="Monthly Expenses" value={expenses} min={0} max={grossIncome} step={500}
          onChange={(v) => setExpenses(Math.min(v, grossIncome))} format={fmt} />
        <Slider label="Available Deposit" value={deposit} min={0} max={2000000} step={10000}
          onChange={setDeposit} format={fmt} />
        <Slider label="Interest Rate" value={rate} min={7} max={18} step={0.25}
          onChange={setRate} unit="%" />
        <Slider label="Loan Term" value={years} min={5} max={30} step={1}
          onChange={setYears} unit=" years" />

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            SA banks generally approve bonds where repayments don&apos;t exceed <strong>30% of gross income</strong>.
            This is an estimate — final approval depends on your full credit profile.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-5">
        <div className="bg-slate-900 rounded-2xl p-7 text-white">
          <p className="text-slate-400 text-sm mb-1">Maximum Property Price</p>
          <p className="text-4xl font-bold text-amber-400">{fmt(maxProperty)}</p>
          <p className="text-slate-400 text-xs mt-2">including your {fmt(deposit)} deposit</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-7">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-900">Affordability Score</h3>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              affordabilityScore >= 70 ? "bg-emerald-100 text-emerald-700"
              : affordabilityScore >= 40 ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
            }`}>
              {affordabilityScore >= 70 ? "Strong" : affordabilityScore >= 40 ? "Moderate" : "Limited"}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full mb-5">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                affordabilityScore >= 70 ? "bg-emerald-500"
                : affordabilityScore >= 40 ? "bg-amber-500"
                : "bg-red-500"
              }`}
              style={{ width: `${affordabilityScore}%` }}
            />
          </div>
          <ResultRow label="Max Monthly Bond" value={fmt(maxMonthly)} />
          <ResultRow label="Max Loan Amount" value={fmt(maxLoan)} />
          <ResultRow label="Deposit" value={fmt(deposit)} />
          <ResultRow label="Max Property Price" value={fmt(maxProperty)} highlight />
        </div>

        <Link
          href="/properties?type=sale"
          className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm"
        >
          Browse Properties in Your Range
        </Link>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const [tab, setTab] = useState<"bond" | "affordability">("bond");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/20 rounded-full px-4 py-1.5 mb-5">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-xs font-semibold tracking-wide">FREE PROPERTY CALCULATORS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Bond &amp; Affordability Calculator</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Work out your monthly repayments or find out how much property you can afford.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit mx-auto mb-10 shadow-sm">
          {([
            { id: "bond", label: "Bond Calculator", icon: Calculator },
            { id: "affordability", label: "Affordability Calculator", icon: TrendingDown },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === id ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === "bond" ? <BondCalculator /> : <AffordabilityCalculator />}
      </div>
    </div>
  );
}
