import { useQuery } from "@apollo/client";
import { GET_STOCK_INFORMATION, GET_RATIOS, GET_INCOME_STATEMENT, GET_BALANCE_SHEET, GET_CASHFLOW } from "@/constants";
import { SymbolProps } from "@/constants";
import { formatNumbers } from "../../../helpers/helpers";
import FinancialStatements from "./FinancialStatements";

const KeyFinancialStats = ({ symbol }: SymbolProps) => {
  const {
    data: stockData,
    loading: stockLoading,
    error: stockError,
  } = useQuery(GET_STOCK_INFORMATION, {
    variables: { symbol },
  });

  const {
    data: ratiosData,
    loading: ratiosLoading,
    error: ratiosError,
  } = useQuery(GET_RATIOS, {
    variables: { symbol },
  });

  const {
    data: incomeData,
    loading: incomeLoading,
    error: incomeError,
  } = useQuery(GET_INCOME_STATEMENT, {
    variables: { symbol },
  });

  const {
    data: balanceData,
    loading: balanceLoading,
    error: balanceError,
  } = useQuery(GET_BALANCE_SHEET, {
    variables: { symbol },
  });

  const {
    data: cashflowData,
    loading: cashflowLoading,
    error: cashflowError,
  } = useQuery(GET_CASHFLOW, {
    variables: { symbol },
  });

  if (stockLoading || ratiosLoading || incomeLoading || balanceLoading || cashflowLoading) {
    return <p>Loading financial data...</p>;
  }
  if (stockError || ratiosError || incomeError || balanceError || cashflowError) {
    console.error("Stock Error:", JSON.stringify(stockError, null, 2));
    console.error("Ratios Error:", JSON.stringify(ratiosError, null, 2));
    console.error("Income Error:", JSON.stringify(incomeError, null, 2));
    console.error("Balance Error:", JSON.stringify(balanceError, null, 2));
    console.error("Cashflow Error:", JSON.stringify(cashflowError, null, 2));
    
    return <p>Error fetching data.</p>;
  }  
  if (
    !stockData?.getStockInformation ||
    !ratiosData?.getRatios ||
    !incomeData?.getIncomeStatement ||
    !balanceData?.getBalanceSheet ||
    !cashflowData?.getCashflow
  ) {
    console.warn("Missing data:", {
      stockData,
      ratiosData,
      incomeData,
      balanceData,
      cashflowData,
    });
    return <p>No financial data available.</p>;
  }
  

  const stock = stockData.getStockInformation;
  const ratios = ratiosData.getRatios;
  const income = incomeData.getIncomeStatement;
  const balance = balanceData.getBalanceSheet;
  const cashflow = cashflowData.getCashflow;
  return (
    <>
      <div className="mt-10">
        <h3 className="text-2xl text-center">Key Financial Data</h3>
        <div className="flex items-start justify-around gap-5 max-[1000px]:flex-col ">
          <ul className="flex items-start justify-center gap-4 max-[1000px]:self-center ">
            <div>
              <li className="font-semibold">Return on Equity:</li>
              <li className="font-semibold">Return on Capital:</li>
              <li className="font-semibold">Retained Earnings:</li>
              <li className="font-semibold">DCF Buy Price:</li>
              <li className="font-semibold">Price Range:</li>
              <li className="font-semibold">Market Cap:</li>
              <li className="font-semibold">Gross Margin:</li>
            </div>
            <div>
              <li>{(ratios[0].returnOnEquity * 100).toFixed(2)}%</li>
              <li>{((ratios[0].returnOnEquity / (1 + ratios[0].debtEquityRatio)) * 100).toFixed(2)}%</li>
              <li>{formatNumbers(balance[0].retainedEarnings)}</li>
              <li>${stock.dcf.toFixed(2)}</li>
              <li>${stock.range}</li>
              <li>{formatNumbers(stock.mktCap)} </li>
              <li>{(ratios[0].grossProfitMargin * 100).toFixed(2)}%</li>
            </div>
          </ul>
          <ul className="flex items-start justify-center gap-8 max-[1000px]:self-center">
            <div>
              <li className="font-semibold">Debt/Equity Ratio:</li>
              <li className="font-semibold">Interest Coverage Ratio:</li>
              <li className="font-semibold">Current Ratio:</li>
              <li className="font-semibold">Dividend Payout Ratio:</li>
              <li className="font-semibold">LTM Price/Book Ratio:</li>
              <li className="font-semibold">LTM Price/Earnings:</li>
              <li className="font-semibold">LTM Price/Free Cashflow:</li>
            </div>
            <div>
              <li>{ratios[0].debtEquityRatio.toFixed(2)}</li>
              <li>{ratios[0].interestCoverage.toFixed(2)}</li>
              <li>{ratios[0].currentRatio.toFixed(2)}</li>
              <li>{ratios[0].dividendPayoutRatio.toFixed(2)}</li>
              <li>{ratios[0].priceToBookRatio.toFixed(2)}</li>
              <li>{ratios[0].priceEarningsRatio.toFixed(2)}</li>
              <li>{ratios[0].priceToFreeCashFlowsRatio.toFixed(2)}</li>
            </div>
          </ul>
        </div>
      </div>
      <FinancialStatements ratios={ratios} income={income} balance={balance} cashflow={cashflow} />
    </>
  );
};

export default KeyFinancialStats;
