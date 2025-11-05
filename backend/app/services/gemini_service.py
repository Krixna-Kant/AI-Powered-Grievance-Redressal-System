import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_solution(problem):
    prompt = f"""
    You are a government grievance resolution AI assistant.
    Suggest a structured step-by-step plan to resolve this issue.

    Problem: {problem}

    Format:
    - Issue Analysis:
    - Immediate Actions:
    - Responsible Authorities:
    - Long-Term Fix:
    """
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("Gemini API error:", e)
        return "No suggestion available."
