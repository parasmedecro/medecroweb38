from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pickle
import pandas as pd
# FastAPI app initialization
app = FastAPI()

# Pydantic model for incoming data validation
class PrakritiData(BaseModel):
    bodyBuild_Size_Moderatelydeveloped: bool
    bodyBuild_Size_Weaklydeveloped: bool
    bodyBuild_Size_Welldeveloped: bool
    bodyHair_Color_Black: bool
    bodyHair_Color_DarkBrown: bool
    bodyHair_Color_Dusky: bool
    bodyHair_Color_LightBrown: bool
    eye_Color_Black: bool
    eye_Color_DarkBrown: bool
    eye_Color_Grayish: bool
    eye_Color_LightBrown: bool
    forehead_Length_Long: bool
    forehead_Length_Medium: bool
    forehead_Length_Tooshort_Toolong: bool
    hair_Growth_Dense: bool
    hair_Growth_Moderate: bool
    hair_Growth_Scanty: bool
    hair_Nature_Dry: bool
    hair_Nature_Normal: bool
    hair_Nature_Oily: bool
    hair_Nature_Seasonal_Variable: bool
    lips_Color_Dark: bool
    lips_Color_PaleYellow: bool
    lips_Color_Pink: bool
    lips_Color_Reddish: bool
    skin_Nature_Dry: bool
    skin_Nature_Normal: bool
    skin_Nature_Oily: bool
    skin_Nature_Seasonal_Variable: bool
    teeth_Color_Dull_Blackish: bool
    teeth_Color_MilkyWhite: bool
    teeth_Color_Yellowish: bool
    appetite_Amount_High: bool
    appetite_Amount_Low: bool
    appetite_Amount_Medium: bool
    appetite_Amount_Variable: bool
    appetite_Frequency_Irregular: bool
    appetite_Frequency_Regular: bool
    bladder_Frequency_Irregular: bool
    bladder_Frequency_Regular: bool
    bodytemp_Amount_High: bool
    bodytemp_Amount_Low: bool
    bodytemp_Amount_Medium: bool
    bodytemp_Amount_Variable: bool
    bowel_Tendency_Constipation: bool
    bowel_Tendency_Loosemotion: bool
    perspiration_Amount_High: bool
    perspiration_Amount_Low: bool
    perspiration_Amount_Medium: bool
    sleep_Amount_High: bool
    sleep_Amount_Low: bool
    sleep_Amount_Medium: bool
    sleep_Amount_Variable: bool
    sleep_Quality_Deep: bool
    sleep_Quality_Shallow: bool
    sleep_Quality_Sound: bool
    walking_style_Firm_Steady: bool
    walking_style_Sharp_Accurate: bool
    walking_style_Unsteady: bool
    healthproblem_in_temp_Both: bool
    healthproblem_in_temp_Cold: bool
    healthproblem_in_temp_Warm: bool
    voice_clear_Clear: bool
    voice_clear_Non_Clear: bool
    skin_pimple_Non_Pimples: bool
    skin_pimple_Pimples: bool
    skin_wrinkled_Non_Wrinkled: bool
    skin_wrinkled_Wrinkled: bool
    Anger_Quality_Good: bool
    Anger_Quality_Medium: bool
    Anger_Quality_Poor: bool

# Load your pre-trained model
with open('tt.pkl', 'rb') as my_file:
    model = pickle.load(my_file)

# Define a prediction endpoint
@app.post("/predict")
async def predict(data: PrakritiData):
    # Convert input data into the format required by the model
    input_data = pd.DataFrame([data.dict().values()],columns = data.dict().keys())
    
    # Use the model to make a prediction
    prediction = model.predict(input_data)
    
    # Return the prediction result
    return {"prediction": int(prediction[0])}
