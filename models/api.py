from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import json
from firebase_admin import credentials, db
import firebase_admin

cred = credentials.Certificate("sihp-2135d-firebase-adminsdk-p2uhe-2490ca71b7.json")  # Path to your Firebase service account JSON file
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://sihp-2135d-default-rtdb.firebaseio.com/'
})

# Firebase Admin SDK setup

diabetesfull = joblib.load('diabetesfull.pkl')
diabeteshalf = joblib.load('diabeteshalf.pkl')
hypertensionfull = joblib.load('hypertensionfull.pkl')
hypertensionhalf = joblib.load('hypertensionhalf.pkl')
hearthalf = joblib.load('hearthalf.pkl')
heartfull = joblib.load('heartfull.pkl')
# model.load_model('hearthalf.pkl')  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allows all headers
)

def hyperTension(df):
    data = {
        'male': df.get('gender'),
        'age': df.get('age'),
        'cigsPerDay': df.get('cigsPerDay'),
        'BMI': df.get('BMI'),
        'heartRate':df.get('heartRate')
    }
    data = pd.DataFrame([data])
    prediction = hypertensionhalf.predict_proba(data)
    # print(type(prediction))
    return float(prediction[0][0])

def finalHyperTension(df):
    df = df.get('data')
    data = {
        'male': df.get('gender'),
        'age': df.get('age'),
        'cigsPerDay': df.get('cigsPerDay'),
        'BPMeds' : df.get('BPMeds'),
        'totChol' : df.get('totChol'),
        'sysBP' : df.get('sysBP'),
        'diaBP' : df.get('diaBP'),
        'BMI': df.get('BMI'),
        'heartRate':df.get('heartRate'),
        'glucose' : df.get('glucose')
    }
    data = pd.DataFrame([data])
    # print(data)
    prediction = hypertensionfull.predict_proba(data)[0]
    # print(prediction)
    return float(prediction[0])
    
def diabetes(df):
    d = df.copy()


    data = {
        'gender': df.get('gender'),
        'age': df.get('age'),
        'hypertension': hyperTension(d),  
        'heart_disease': heartDisease(d),
        'smoking_history': df.get('smoking_history'),
        'bmi': df.get('weight') / ((df.get('height') / 100) ** 2),
    }
    
    data = pd.DataFrame([data])
    
    prediction = diabeteshalf.predict_proba(data)
    # print(prediction)
    return float(prediction[0][0])

def finalDiabetes(df):
    d = df.copy()
    # Extract the 'data' column from the dataframe
    df = df.get('data')
    if df is None:
        raise ValueError("Data not found in dataframe.")
    
    # Prepare the input data for prediction
    data = {
        'gender': df.get('gender'),
        'age': df.get('age'),
        'hypertension': hyperTension(d),  # Assuming hyperTension is defined elsewhere
        'heart_disease': heartDisease(d),
        'smoking_history': df.get('smoking_history'),
        'bmi': df.get('bmi'),
        'HbA1c_level' : df.get('HbA1c_level'),
        'blood_glucose_level' : df.get('blood_glucose_level')
    }
    
    # Convert to DataFrame
    data = pd.DataFrame([data])
    
    # Make prediction
    prediction = diabetesfull.predict_proba(data)[0]
    return float(prediction[0])

def heartDisease(df):
    data = {
        'age': df.get('age')*365,
        'gender': 1 if df.get('gender') == 0 else 2,
        'height':df.get('height'),
        'weight':df.get('weight'),
        'smoke': df.get('smoking_history'),
        'alco': df.get('alco'),
        'active': df.get('active'),
        'bmi': df.get('weight') / ((df.get('height') / 100) ** 2)
    }
    data = pd.DataFrame([data])
    # print(data)
    prediction = hearthalf.predict_proba(data)
    # print(prediction)
    return float(prediction[0][0])

def finalHeartDisease(df):
    df = df.get('data')
    data = {
        'age': df.get('age')*365,
        'gender': 1 if df.get('gender') == 0 else 2,
        'height':df.get('height'),
        'weight':df.get('weight'),
        'ap_hi' : df.get('ap_hi'),
        'ap_lo' : df.get('ap_lo'),
        'cholesterol' : df.get('cholesterol'),
        'gluc' : df.get('gluc'),
        'smoke': df.get('smoking_history'),
        'alco': df.get('alco'),
        'active': df.get('active'),
        'bmi': df.get('weight') / ((df.get('height') / 100) ** 2)
    }
    data = pd.DataFrame([data])
    # print(data)
    prediction = heartfull.predict_proba(data)[0]
    # print(prediction)
    return float(prediction[0])

@app.get("/")
def root():
    return {"message": "Hello, World!"}

@app.post("/predictRisk")
def predictRisk(data: str = Form(...)):
    df = json.loads(data)
    # print(df) 
    return JSONResponse(content={
        'hypertension': hyperTension(df),
        'diabetes': diabetes(df),
        'heart':heartDisease(df)
    })

@app.post('predict')
def predict():
    return None

@app.post('/storetodb')
def storetodb(data: str = Form(...)):
    d = json.loads(data)
    # print(d)
    # d = d.get('data')
    username = d.get('username')
    dict1 = {
        'gender': d.get('gender'),
        'age': d.get('age'),
        'cigsPerDay': d.get('cigsPerDay'),
        'heartRate': d.get('heartRate'),
        'smoking_history': d.get('smoking_history'),
        'weight':d.get('weight'),
        'height':d.get('height'),
        'alco':d.get('alco'),
        'active':d.get('active')
    }
    ref = db.reference(f'data/{username}')
    ref.set(dict1)
    return JSONResponse(content={
        'message':'Successfull'
    })

@app.post('/storeRisk')
def storeRisk(data: str = Form(...)):
    d = json.loads(data)
    print(d)
    username = d.get('username')
    dict1 = {
        'hypertension' : d.get('hypertension'),
        'diabetes' : d.get('diabetes'),
        'heart': d.get('heart')
    }
    ref = db.reference(f'predictedRisk/{username}')
    ref.set(dict1)
    return JSONResponse(content={
        'message':'Successfull'
    })




@app.post('/get_hold')
def get_hold(username: str = Form(...)):
    user = json.loads(username)
    print(user)
    ref = db.reference(f'predictedRisk/{user.get('username')}')
    user_data = ref.get()  # Retrieve the data from the reference

    print(user_data)
    return JSONResponse(content={
        'predictedRisk':user_data
    })


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


