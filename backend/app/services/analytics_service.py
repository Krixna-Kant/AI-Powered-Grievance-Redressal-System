import joblib
import pandas as pd
from datetime import timedelta
from app.services.gemini_service import generate_solution   # reuse Gemini for summaries

#Load Prophet models at startup 
try:
    models = joblib.load("app/models/forecast/up_forecast.pkl")
    print("Forecast models loaded successfully.")
except Exception as e:
    print("Could not load forecast models:", e)
    models = {}

def generate_forecast(category: str, days: int = 30):
    """Generate forecast data and AI summary for the given category."""
    if category not in models:
        return {
            "error": f"No forecast model found for category '{category}'.",
            "summary": "Forecast unavailable for this category yet."
        }

    model = models[category]
    future = model.make_future_dataframe(periods=days)
    forecast = model.predict(future).tail(days)

    #Extract relevant columns
    forecast_data = forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]]
    forecast_data.rename(columns={
        "ds": "date",
        "yhat": "predicted_count",
        "yhat_lower": "lower_bound",
        "yhat_upper": "upper_bound"
    }, inplace=True)

    #Compute average trend and direction
    avg_pred = round(forecast_data["predicted_count"].mean(), 2)
    diff = forecast_data["predicted_count"].iloc[-1] - forecast_data["predicted_count"].iloc[0]
    trend = "increase" if diff > 0 else "decrease" if diff < 0 else "stable"

    #Handles “not enough data” scenario
    if len(forecast_data) < 5:
        summary = "Not enough data yet to produce a reliable forecast for this category."
    else:
        prompt = (
            f"Generate a concise forecast insight for grievance category '{category}' in Uttar Pradesh. "
            f"The average predicted grievance count is {avg_pred} and trend shows a {trend}. "
            f"Provide a short 2-line summary suitable for a dashboard."
        )
        summary = generate_solution(prompt)

    return {
        "category": category,
        "average_predicted": avg_pred,
        "trend": trend,
        "forecast": forecast_data.to_dict(orient="records"),
        "summary": summary
    }
