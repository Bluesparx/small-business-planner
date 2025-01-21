from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dropout, Dense

app = Flask(__name__)
CORS(app)

def create_sequences(data, sequence_length):
    X, y = [], []
    for i in range(len(data) - sequence_length):
        X.append(data[i:i+sequence_length])
        y.append(data[i+sequence_length])
    return np.array(X), np.array(y)

def preprocess_historical_data(data, sequence_length=10):
    try:
        # Convert and sort dates
        data['Date'] = pd.to_datetime(data['Date'])
        data.sort_values(by='Date', inplace=True)
        
        # convert price
        data['Close/Last'] = data['Close/Last'].replace('[\\$,]', '', regex=True).astype(float)

        # Scale 
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_prices = scaler.fit_transform(data[['Close/Last']])
        
        X, y = create_sequences(scaled_prices, sequence_length)
        X = X.reshape(X.shape[0], X.shape[1], 1)  # [samples, time_steps, features]
        
        return X, y, scaler, scaled_prices

    except Exception as e:
        raise ValueError(f"Error in preprocessing historical data: {e}")
def train_lstm_model(X_train, y_train):
    try:
        # Build model - LSTM with 50 neurons and 4 hidden layers
        model = Sequential()

        # First LSTM layer + Dropout
        model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], 1), activation='tanh'))
        model.add(Dropout(0.2)) 

        # Second 
        model.add(LSTM(units=50, return_sequences=True, activation='tanh'))
        model.add(Dropout(0.2))

        # Third 
        model.add(LSTM(units=50, return_sequences=True, activation='tanh'))
        model.add(Dropout(0.2))

        # Fourth 
        model.add(LSTM(units=50, activation='tanh'))
        model.add(Dropout(0.2))

        model.add(Dense(units=1))

        #  mse for loss
        model.compile(optimizer='adam', loss='mean_squared_error')

        model.fit(X_train, y_train, epochs=75, batch_size=64)

        return model

    except Exception as e:
        raise ValueError(f"Error in building and training the model: {e}")


def generate_predictions(model, scaled_prices, scaler, forecast_days=90, sequence_length=10):
    try:
        last_sequence = scaled_prices[-sequence_length:].reshape(-1, 1)
        
        if last_sequence.shape[0] != sequence_length:
            raise ValueError(f"Input sequence length {last_sequence.shape[0]} does not match required length {sequence_length}")
        
        predictions = []
        current_sequence = last_sequence.copy()
        
        for _ in range(forecast_days):
            # (samples, time steps, features)
            X = current_sequence.reshape((1, sequence_length, 1))
            
            next_pred = model.predict(X, verbose=0)
            predictions.append(next_pred[0][0])
            
            current_sequence = np.vstack((current_sequence[1:], next_pred))
        
        predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
        return predictions.flatten()

    except Exception as e:
        raise ValueError(f"Error in generating predictions: {e}")

# Route: get predictions for 90 days
@app.route('/analyze_historical', methods=['POST'])
def analyze_historical():
    try:
        if 'historical_data' not in request.files:
            return jsonify({"error": "Please provide a historical data file."}), 400
        
        file = request.files['historical_data']
        data = pd.read_csv(file)

        X_train, y_train, scaler, scaled_prices = preprocess_historical_data(data)

        model = train_lstm_model(X_train, y_train)

         # generate forecast for next 90 days 
        predictions = generate_predictions(model, scaled_prices, scaler, forecast_days=90)

        predicted_dates = pd.date_range(start=pd.to_datetime('today').normalize(), periods=90).tolist()
        predictions_with_dates = [{"Date": str(date), "Predicted Close": float(pred)} for date, pred in zip(predicted_dates, predictions)]

        return jsonify({
            "historical_analysis": predictions_with_dates
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# BALANCE and income stateent analysis 

def analyze_financial_data(BS, IS):
    BS_analysis = pd.DataFrame(BS['date'])

    # Working Capital
    current_assets = BS['totalCurrentAssets']
    current_liabilities = BS['totalCurrentLiabilities']
    working_capital = current_assets - current_liabilities
    BS_analysis['workingCapital'] = working_capital

    # Working Capital per Dollar sale
    total_sales = IS['revenue']
    working_capital_per_dollar_of_sales = working_capital / total_sales
    BS_analysis['workingCapitalperDollarSale'] = working_capital_per_dollar_of_sales

    # Current Ratio - for liquidity
    current_ratio = current_assets / current_liabilities
    BS_analysis['currentRatio'] = current_ratio

    # Quick Current Ratio
    inventory = BS['inventory']
    quick_current_ratio = (current_assets - inventory) / current_liabilities
    BS_analysis['quickCurrentRatio'] = quick_current_ratio

    # Debt to Equity Ratio
    total_liabilities = BS['totalLiabilities']
    shareholders_equity = BS['totalStockholdersEquity']
    debt2equity_ratio = total_liabilities / shareholders_equity
    BS_analysis['debtToEquityRatio'] = debt2equity_ratio

    # Receivable Turnover and Average Age of Receivables
    net_credit_sales = IS['netIncome']
    average_net_receivables_for_the_period = BS['netReceivables']
    receivable_turnover = net_credit_sales / average_net_receivables_for_the_period
    BS_analysis['receivableTurnover'] = receivable_turnover

    number_of_days_in_period = 365
    average_age_of_receivables = number_of_days_in_period / receivable_turnover
    BS_analysis['averageAgeOfReceivables'] = average_age_of_receivables

    # Inventory Turnover and days for Inventory to Turn
    cost_of_goods_sold = IS['costOfRevenue']
    average_inventory_for_the_period = inventory
    inventory_turnover = cost_of_goods_sold / average_inventory_for_the_period
    BS_analysis['inventoryTurnover'] = inventory_turnover

    number_of_days_for_inventory_to_turn = number_of_days_in_period / inventory_turnover
    BS_analysis['numberOfDaysforInventoryTurn'] = number_of_days_for_inventory_to_turn

    IS_analysis = pd.DataFrame(IS['date'])

    # Gross Profit Margin
    revenue = IS['revenue']
    gross_profit_margin = (revenue - cost_of_goods_sold) / revenue
    IS_analysis['grossProfitMargin'] = gross_profit_margin * 100

    # Operating Profit Margin
    operating_income = IS['operatingIncome']
    operating_profit_margin = operating_income / revenue
    IS_analysis['OperatingProfitMargin'] = operating_profit_margin

    # Interest Coverage Ratio
    interest_expense = IS['interestExpense']
    earnings_before_interest_and_taxes = IS['incomeBeforeTax']
    interest_coverage_ratio = earnings_before_interest_and_taxes / interest_expense
    IS_analysis['InterestCoverageRatio'] = interest_coverage_ratio

    # Net Profit Margin
    net_income = IS['netIncome']
    net_profit_margin = net_income / revenue
    IS_analysis['NetProfitRatio'] = net_profit_margin

    # Asset Turnover
    average_assets_for_the_period = BS['totalAssets']
    assets_turnover = revenue / average_assets_for_the_period
    IS_analysis['AssetTurnover'] = assets_turnover

    # Return on Assets
    return_on_assets = net_income / BS['totalAssets']
    IS_analysis['ReturnOnAssets'] = return_on_assets

    # Growth Percentage for Income Statement
    growth_percentage_is = {}
    for column in IS_analysis.columns[1:]:
        first_value = IS_analysis[column].iloc[-1]
        last_value = IS_analysis[column].iloc[0]
        growth_percentage_is[column] = ((last_value - first_value) / first_value) * 100

    growth_is = pd.DataFrame(growth_percentage_is, index=["Growth"])
    growth_is = growth_is.T
    growth_is.reset_index(inplace=True)
    growth_is.columns = ['IncomeMetric', 'OverallGrowth']

    # Growth Percentage for Balance Sheet
    growth_percentage_bs = {}
    for column in BS_analysis.columns[1:]:
        first_value = BS_analysis[column].iloc[-1]
        last_value = BS_analysis[column].iloc[0]
        growth_percentage_bs[column] = ((last_value - first_value) / first_value) * 100

    growth_bs = pd.DataFrame(growth_percentage_bs, index=["Growth"])
    growth_bs = growth_bs.T
    growth_bs.reset_index(inplace=True)
    growth_bs.columns = ['BalanceSheetMetric', 'OverallGrowth']

    return BS_analysis.to_dict(orient='records'), IS_analysis.to_dict(orient='records'), growth_is.to_dict(orient='records'), growth_bs.to_dict(orient='records')

    
# Route: Analyze Financial Data
@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        if 'balance_sheet' not in request.files or 'income_statement' not in request.files:
            return jsonify({"error": "Please provide both balance sheet and income statement files."}), 400
        
        balance_sheet_file = request.files['balance_sheet']
        income_statement_file = request.files['income_statement']
        BS = pd.read_csv(balance_sheet_file)
        IS = pd.read_csv(income_statement_file)

        BS_analysis, IS_analysis, growth_is, growth_bs = analyze_financial_data(BS, IS)

        return jsonify({
            "growth_income_statement": growth_is,
            "growth_balance_sheet": growth_bs,
            "balance_sheet_analysis": BS_analysis,
            "income_statement_analysis": IS_analysis
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
