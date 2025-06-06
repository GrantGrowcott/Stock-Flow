import { useQuery } from "@apollo/client";
import { GET_STOCK_INFORMATION, SymbolProps } from "@/constants";
import Image from "next/image";
import FavoriteStock from "./FavoriteStock";

const StockNamePrice = ({ symbol }: SymbolProps) => {
  const { data, error } = useQuery(GET_STOCK_INFORMATION, {
    variables: { symbol },
    skip: !symbol, 
    fetchPolicy: "cache-first", 
  });

  if (error) return <p>Error fetching data.</p>;

  if (!data || !data.getStockInformation) {
    return <p>No stock information available.</p>;
  }

  const stock = data.getStockInformation;

  return (
    <div className="mt-5 flex justify-between items-center ">
      <div>
        <div className="flex justify-center items-center gap-5 max-[1000px]:flex-col">
          <Image src={stock.image} width={50} height={50} alt="Company Logo" />
          <h1 className="text-3xl font-bold">
            {stock.companyName} ({stock.symbol})
          </h1>
          <span className=" bg-[var(--blue)] p-2 rounded-md">{stock.currency}</span>
        </div>
        <FavoriteStock symbol={symbol}/>
      </div>
      <div className="flex justify-center self-start mr-7 mt-2">
        <h2 className="text-3xl font-bold">${stock.price}</h2>
      </div>
    </div>
  );
};

export default StockNamePrice;
