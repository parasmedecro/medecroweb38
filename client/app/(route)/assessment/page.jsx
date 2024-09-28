// "use client";

// import React, { useState } from "react";
// import { FaSpinner } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// const FeatureRichForm = () => {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     gender: "",
//     age: "",
//     height: "",
//     weight: "",
//     smokingHabit: "",
//     cigarettesPerDay: "",
//     alcoholIntake: "",
//     physicalActivity: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   // Validate form inputs
//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.gender) newErrors.gender = "Please select a gender";
//     if (!formData.age || isNaN(formData.age))
//       newErrors.age = "Please enter a valid age";
//     if (!formData.height || isNaN(formData.height))
//       newErrors.height = "Please enter a valid height";
//     if (!formData.weight || isNaN(formData.weight))
//       newErrors.weight = "Please enter a valid weight";
//     if (!formData.smokingHabit)
//       newErrors.smokingHabit = "Please select smoking habit";
//     if (
//       formData.smokingHabit === "1" &&
//       (!formData.cigarettesPerDay || isNaN(formData.cigarettesPerDay))
//     ) {
//       newErrors.cigarettesPerDay =
//         "Please enter a valid number of cigarettes";
//     }
//     if (!formData.alcoholIntake)
//       newErrors.alcoholIntake = "Please select alcohol intake";
//     if (!formData.physicalActivity)
//       newErrors.physicalActivity = "Please select physical activity";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Map form data to API expected format
//       const htdata = {
//         male: formData.gender === "0" ? 1 : 0, // Assuming "0" is Male, "1" is Female
//         age: Number(formData.age),
//         cigsPerDay:
//           formData.smokingHabit === "1"
//             ? Number(formData.cigarettesPerDay)
//             : 0,
//         BMI: calculateBMI(Number(formData.height), Number(formData.weight)),
//         heartRate: 72, // Assuming a default or calculated value
//         // Add other necessary fields if required by the API
//       };

//       const payload = {
//         hypertension: JSON.stringify({ htdata }),
//       };

//       const response = await fetch("http://127.0.0.1:8000/predictRisk", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data);
//       alert("Form submitted successfully!");

//       // Navigate to the result page
//       router.push("/assessment/result");
//     } catch (error) {
//       console.error("Error during fetch operation:", error);
//       alert(
//         "An error occurred while processing your request. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const pushing = () => {
//     const gender = formData.gender || "";
//     const age = formData.age || "";
//     const height = formData.height || "";
//     const weight = formData.weight || "";
//     const smokingHabit = formData.smokingHabit || "";
//     const cigarettesPerDay = formData.cigarettesPerDay || "";
//     const alcoholIntake = formData.alcoholIntake || "";
//     const physicalActivity = formData.physicalActivity || "";

//     const data = {
//       'gender': gender,
//       'age': age,
//       'cigsPerDay': cigarettesPerDay,
//       'heartRate': formData.get('heartRate'),
//       'smoking_history': smokingHabit,
//       'weight': weight,
//       'height': height,
//       'alco': alcoholIntake,
//       'active': physicalActivity
//   }
  
//     router.push("/assessment/result");
//   };
  

//   // Utility function to calculate BMI
//   const calculateBMI = (heightCm, weightKg) => {
//     const heightM = heightCm / 100;
//     return parseFloat((weightKg / (heightM * heightM)).toFixed(2));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 to-purple-100 flex items-center justify-center p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl space-y-6"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Health Information Form
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Gender */}
//           <div>
//             <label
//               htmlFor="gender"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Gender
//             </label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
//                 errors.gender ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <option value="">Select Gender</option>
//               <option value="0">Male</option>
//               <option value="1">Female</option>
//             </select>
//             {errors.gender && (
//               <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
//             )}
//           </div>

//           {/* Age */}
//           <div>
//             <label
//               htmlFor="age"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Age (years)
//             </label>
//             <input
//               type="number"
//               id="age"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
//                 errors.age ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your age"
//             />
//             {errors.age && (
//               <p className="text-red-500 text-xs mt-1">{errors.age}</p>
//             )}
//           </div>

//           {/* Height */}
//           <div>
//             <label
//               htmlFor="height"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Height (cm)
//             </label>
//             <input
//               type="number"
//               id="height"
//               name="height"
//               value={formData.height}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
//                 errors.height ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your height"
//             />
//             {errors.height && (
//               <p className="text-red-500 text-xs mt-1">{errors.height}</p>
//             )}
//           </div>

//           {/* Weight */}
//           <div>
//             <label
//               htmlFor="weight"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Weight (kg)
//             </label>
//             <input
//               type="number"
//               id="weight"
//               name="weight"
//               value={formData.weight}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
//                 errors.weight ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your weight"
//             />
//             {errors.weight && (
//               <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
//             )}
//           </div>

//           {/* Smoking Habit */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Smoking Habit
//             </label>
//             <div className="flex space-x-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="smokingHabit"
//                   value="0"
//                   checked={formData.smokingHabit === "0"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Non-smoker
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="smokingHabit"
//                   value="1"
//                   checked={formData.smokingHabit === "1"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Smoker
//               </label>
//             </div>
//             {errors.smokingHabit && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.smokingHabit}
//               </p>
//             )}
//           </div>

//           {/* Cigarettes per Day (Conditional) */}
//           {formData.smokingHabit === "1" && (
//             <div>
//               <label
//                 htmlFor="cigarettesPerDay"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Cigarettes per Day
//               </label>
//               <input
//                 type="number"
//                 id="cigarettesPerDay"
//                 name="cigarettesPerDay"
//                 value={formData.cigarettesPerDay}
//                 onChange={handleChange}
//                 className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
//                   errors.cigarettesPerDay
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 }`}
//                 placeholder="Number of cigarettes"
//               />
//               {errors.cigarettesPerDay && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.cigarettesPerDay}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Alcohol Intake */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Alcohol Intake
//             </label>
//             <div className="flex space-x-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="alcoholIntake"
//                   value="0"
//                   checked={formData.alcoholIntake === "0"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Non-drinker
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="alcoholIntake"
//                   value="1"
//                   checked={formData.alcoholIntake === "1"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Drinker
//               </label>
//             </div>
//             {errors.alcoholIntake && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.alcoholIntake}
//               </p>
//             )}
//           </div>

//           {/* Physical Activity */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Physical Activity
//             </label>
//             <div className="flex space-x-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="physicalActivity"
//                   value="0"
//                   checked={formData.physicalActivity === "0"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Sedentary
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="physicalActivity"
//                   value="1"
//                   checked={formData.physicalActivity === "1"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Active
//               </label>
//             </div>
//             {errors.physicalActivity && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.physicalActivity}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//             onClick={pushing}
//           type="submit"
//           className={`w-full p-3 rounded-lg text-white ${
//             isLoading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-primary hover:bg-green-700"
//           } transition duration-200 flex items-center justify-center`}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <FaSpinner className="animate-spin mr-2" />
//           ) : (
//             "Submit"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };


"use client";

import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const FeatureRichForm = () => {
  const router = useRouter();

  const { user } = useUser();

  const newusername = user?.username;

  console.log("newusername : ", newusername);

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    smokingHabit: "",
    cigarettesPerDay: "",
    alcoholIntake: "",
    physicalActivity: "",
    heartRate: "", // Added heartRate to state
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  var queryString = "";

  var h= "";
  var d = "";
  var he = "";

  let msg_main = ""; // Initial value of msg_main
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form inputs
  const validateForm = () => {
    let newErrors = {};
    if (!formData.gender) newErrors.gender = "Please select a gender";
    if (!formData.age || isNaN(formData.age))
      newErrors.age = "Please enter a valid age";
    if (!formData.height || isNaN(formData.height))
      newErrors.height = "Please enter a valid height";
    if (!formData.weight || isNaN(formData.weight))
      newErrors.weight = "Please enter a valid weight";
    if (!formData.smokingHabit)
      newErrors.smokingHabit = "Please select smoking habit";
    if (
      formData.smokingHabit === "1" &&
      (!formData.cigarettesPerDay || isNaN(formData.cigarettesPerDay))
    ) {
      newErrors.cigarettesPerDay = "Please enter a valid number of cigarettes";
    }
    if (!formData.alcoholIntake)
      newErrors.alcoholIntake = "Please select alcohol intake";
    if (!formData.physicalActivity)
      newErrors.physicalActivity = "Please select physical activity";
    if (!formData.heartRate || isNaN(formData.heartRate))
      newErrors.heartRate = "Please enter a valid heart rate"; // Heart rate validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const gender = formData.gender === "0" ? 1 : 0 || "";
    const age = Number(formData.age) || "";
    const height = Number(formData.height) || "";
    const weight = Number(formData.weight) || "";
    const smokingHabit = formData.smokingHabit === "1"
    ? 1
    : 0 || 0;
    const cigarettesPerDay = Number(formData.cigarettesPerDay) || 0;
    const alcoholIntake = Number(formData.alcoholIntake) || 0;
    const physicalActivity = Number(formData.physicalActivity) || 0;
    const heartRate = Number(formData.heartRate) || ""; // Include heartRate
    var formdata2 = new FormData();
    const data = {
      gender : gender,
      age : age,
      cigsPerDay: cigarettesPerDay,
      heartRate : heartRate, // Add heartRate to data
      smoking_history: smokingHabit,
      weight : weight,
      height : height,
      alco: alcoholIntake,
      active: physicalActivity,
      username : newusername
    };

    formdata2.append('data',JSON.stringify(data));
    fetch("http://127.0.0.1:8000/storetodb", {
      method: "POST",
      body: formdata2,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error during fetch operation:", error);
        // document.getElementById("result").innerText =
        //   "An error occurred while processing the request.";
        alert("error occurred");
      });

      fetch("http://127.0.0.1:8000/predictRisk", {
        method: "POST",
        body: formdata2,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          alert('Hypertension chances : '+data.hypertension+'\n'+'Diabetes : '+data.diabetes+'\n'+'Heart : '+data.heart);
          h = data.hypertension;
          d = data.diabetes;
          he = data.heart;
          queryString = `?hypertension=${h}&diabetes=${d}&heart=${he}`;
          router.push(`/assessment/result${queryString}`);


          formdata2 = new FormData();
        const data2 = {
          hypertension : h,
          diabetes : d,
          heart : he,
          username:newusername
        }
        formdata2.append('data',JSON.stringify(data2));

        fetch("http://127.0.0.1:8000/storeRisk", {
          method: "POST",
          body: formdata2,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {

            // msg_main = data.message;
            // // main mesg..............
            // console.log(data.message);
            // alert(data.message)


          })
          .catch((error) => {
            console.error("Error during fetch operation:", error);
            document.getElementById("result").innerText =
              "An error occurred while processing the request.";
          });
    

        })
        .catch((error) => {
          console.error("Error during fetch operation:", error);
          document.getElementById("result").innerText =
            "An error occurred while processing the request.";
        });

        
// Constructing the query string
// Use router.push to navigate with the query parameters


      // router.push("/assessment/result");

    } catch (error) {
      console.error("Error during fetch operation:", error);
      alert(
        "An error occurred while processing your request. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const calculateBMI = (heightCm, weightKg) => {
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-purple-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Health Information Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender */}
          <div>             <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age (years)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>

          {/* Height */}
          <div>
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
                errors.height ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your height"
            />
            {errors.height && (
              <p className="text-red-500 text-xs mt-1">{errors.height}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
                errors.weight ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your weight"
            />
            {errors.weight && (
              <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
            )}
          </div>

          {/* Smoking Habit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Smoking Habit
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="smokingHabit"
                  value="0"
                  checked={formData.smokingHabit === "0"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Non-smoker
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="smokingHabit"
                  value="1"
                  checked={formData.smokingHabit === "1"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Smoker
              </label>
            </div>
            {errors.smokingHabit && (
              <p className="text-red-500 text-xs mt-1">
                {errors.smokingHabit}
              </p>
            )}
          </div>

          {/* Cigarettes per Day (Conditional) */}
          {formData.smokingHabit === "1" && (
            <div>
              <label
                htmlFor="cigarettesPerDay"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cigarettes per Day
              </label>
              <input
                type="number"
                id="cigarettesPerDay"
                name="cigarettesPerDay"
                value={formData.cigarettesPerDay}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
                  errors.cigarettesPerDay
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Number of cigarettes"
              />
              {errors.cigarettesPerDay && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cigarettesPerDay}
                </p>
              )}
            </div>
          )}

          {/* Alcohol Intake */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alcohol Intake
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="alcoholIntake"
                  value="0"
                  checked={formData.alcoholIntake === "0"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Non-drinker
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="alcoholIntake"
                  value="1"
                  checked={formData.alcoholIntake === "1"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Drinker
              </label>
            </div>
            {errors.alcoholIntake && (
              <p className="text-red-500 text-xs mt-1">
                {errors.alcoholIntake}
              </p>
            )}
          </div>

          {/* Physical Activity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Physical Activity
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="physicalActivity"
                  value="0"
                  checked={formData.physicalActivity === "0"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Sedentary
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="physicalActivity"
                  value="1"
                  checked={formData.physicalActivity === "1"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Active
              </label>
            </div>
            {errors.physicalActivity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.physicalActivity}
              </p>
            )}
          </div>
          
          {/* Heart Rate */}
          <div>
            <label
              htmlFor="heartRate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Heart Rate (bpm)
            </label>
            <input
              type="number"
              id="heartRate"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 ${
                errors.heartRate ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your heart rate"
            />
            {errors.heartRate && (
              <p className="text-red-500 text-xs mt-1">{errors.heartRate}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 rounded-lg text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-green-700"
          } transition duration-200 flex items-center justify-center`}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FeatureRichForm;



export var h;
export var hd;
export var he;