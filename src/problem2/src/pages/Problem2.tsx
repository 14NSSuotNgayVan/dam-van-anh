import { useState, useEffect, memo } from "react";
import axios from "axios";
import { TextField, Autocomplete, Button, Box } from "@mui/material";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

interface Currency {
    currency: string,
    price: number,
    date: string
}

const CurrencySelector = memo(({ label, currencies, value, onChange }: {
    label?: string;
    currencies: Currency[];
    value: Currency | null;
    onChange: (event: React.SyntheticEvent, newValue: Currency | null) => void;
}) => (
    <Autocomplete
        className="w-80"
        options={currencies}
        value={value}
        onChange={onChange}
        getOptionLabel={(option) => option.currency}
        renderOption={(props, option) => (
            <Box component="li" {...props}>
                <img className="mr-2" loading="lazy" width="20" src={`/${option.currency}.svg`} alt="" />
                {option.currency}
            </Box>
        )}
        renderInput={(params) => {
            const selectedCurrency = currencies.find(
                (c) => c.currency === params.inputProps.value
            );

            return (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: selectedCurrency ? (
                            <Box
                                component="span"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    ml: 1,
                                }}
                            >
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`/${selectedCurrency.currency}.svg`}
                                    alt=""
                                />
                            </Box>
                        ) : null,
                    }}
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            );
        }}
    />
));

const Problem2 = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
    const [toCurrency, setToCurrency] = useState<Currency | null>(null);
    const [convertedAmount, setConvertedAmount] = useState<number>(0);
    const [exchangeRate, setExchangeRate] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("https://interview.switcheo.com/prices.json") as { data: Currency[] };
                setCurrencies(data.filter((d) => !!d.price));
            } catch (error) {
                console.error("Error fetching currencies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrencies();
    }, []);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            const fromPrice = fromCurrency.price;
            const toPrice = toCurrency.price;
            setConvertedAmount((amount * fromPrice) / toPrice)
            setExchangeRate((fromPrice / toPrice));
        }
    }, [amount, fromCurrency, toCurrency]);

    return <>
        {loading && <Loading />}
        <h1 className="font-bold">Swap currency app</h1>
        <div className="bg-white rounded-lg p-8 shadow-md max-w-screen-xl mx-auto mb-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
                <TextField
                    className="col-span-3 md:col-span-1"
                    label="Amount to send"
                    inputProps={{ min: 0 }}
                    type="number"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    error={amount < 0}
                    helperText={amount < 0 ? "Amount must be greater than or equal to 0" : undefined}
                />
                <div className="col-span-3 md:col-span-2 flex gap-2">
                    <CurrencySelector
                        label="From currency"
                        currencies={currencies}
                        value={fromCurrency}
                        onChange={(_, newValue) => setFromCurrency(newValue)}
                    />
                    <Button aria-label="Swap currencies" onClick={swapCurrencies}><img src={"/arrow-right-arrow-left.svg"} className="p-4" alt="arrow-right" /></Button>
                    <CurrencySelector
                        label="To currency"
                        currencies={currencies}
                        value={toCurrency}
                        onChange={(_, newValue) => setToCurrency(newValue)}
                    />
                </div>
            </div>
            <div>
                {
                    fromCurrency && toCurrency && exchangeRate &&
                    <div className="p-2 border rounded bg-gray-100">
                        <b>{amount} {fromCurrency.currency} = {convertedAmount.toFixed(6)} {toCurrency.currency}</b>
                        <p>1 {fromCurrency.currency} = {exchangeRate.toFixed(6)} {toCurrency.currency}</p>
                        <p>1 {toCurrency.currency} = {(1 / exchangeRate).toFixed(6)} {fromCurrency.currency}</p>
                    </div>
                }
            </div>
        </div>
        <Link to={"/"} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
            Back
        </Link>
    </>;
};
export default Problem2;