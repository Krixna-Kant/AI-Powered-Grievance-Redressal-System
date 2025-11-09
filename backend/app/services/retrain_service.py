import joblib
from prophet import Prophet
from datetime import datetime
from app.utils.aggregate_data import fetch_aggregated_data
from app.db.connection import get_db
import os

def retrain_forecast_models():
    """Retrain Prophet models if enough real grievance data exists."""
    db = next(get_db())
    df = fetch_aggregated_data(db)

    if df is None or len(df["date"].unique()) < 60:
        print("Not enough real data for retraining. Using trained data model.")
        return False

    categories = df["category"].unique()
    models = {}

    for category in categories:
        df_cat = df[df["category"] == category].groupby("date")["count"].sum().reset_index()
        df_cat.rename(columns={"date": "ds", "count": "y"}, inplace=True)

        model = Prophet(yearly_seasonality=True, weekly_seasonality=True)
        model.fit(df_cat)
        models[category] = model

    # Save updated model
    os.makedirs("app/models/forecast", exist_ok=True)
    model_path = f"app/models/forecast/up_forecast.pkl"
    joblib.dump(models, model_path)

    print(f"Retrained Prophet models saved at {model_path}")
    return True
