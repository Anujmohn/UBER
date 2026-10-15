import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CaptainSignup = () => {
const navigate = useNavigate();


const [step, setStep] = useState(1);

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [color, setColor] = useState("");
const [plate, setPlate] = useState("");
const [capacity, setCapacity] = useState("");
const [vehicleType, setVehicleType] = useState("car");

// Move to the next step
const nextStep = () => {
    if (step < 4) {
        setStep(step + 1);
    }
};

// Move to the previous step
const previousStep = () => {
    if (step > 1) {
        setStep(step - 1);
    }
};

// Create account and redirect to Captain Login
const submitHandler = (e) => {
    e.preventDefault();

    const captainData = {
        fullname: {
            firstname: firstName.trim(),
            lastname: lastName.trim(),
        },
        email: email.trim().toLowerCase(),
        password,
        vehicle: {
            color: color.trim(),
            plate: plate.trim().toUpperCase(),
            capacity: Number(capacity),
            vehicleType,
        },
    };

    console.log("Captain Data:", captainData);

    // Redirect to Captain Login without displaying a popup
    navigate("/CaptainLogin");
};

// Validate each step
const isStep1Valid = firstName.trim().length >= 3;

const isStep2Valid =
    /^\S+@\S+\.\S+$/.test(email.trim()) &&
    password.length >= 8;

const isStep3Valid =
    color.trim().length >= 3 &&
    plate.trim().length >= 6 &&
    Number.isInteger(Number(capacity)) &&
    Number(capacity) >= 1;

return (
    <div className="min-h-screen flex flex-col justify-between p-7">

        <div>
            {/* Logo */}
            <h1 className="text-3xl font-bold mb-7 text-black">
                Yoo
            </h1>

            <h2 className="text-2xl font-bold mb-2">
                Create Captain Account
            </h2>

            <p className="text-sm text-gray-600 mb-6">
                Complete the following steps to register as a captain.
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((number) => (
                    <div
                        key={number}
                        className="flex flex-col items-center flex-1"
                    >
                        <div
                            className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold ${
                                step >= number
                                    ? "bg-black text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            {number}
                        </div>

                        <span className="text-xs mt-2 text-center">
                            {number === 1 && "Personal"}
                            {number === 2 && "Account"}
                            {number === 3 && "Vehicle"}
                            {number === 4 && "Review"}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={submitHandler}>

                {/* STEP 1: PERSONAL DETAILS */}
                {step === 1 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Step 1: Personal Details
                        </h3>

                        <label className="block text-sm font-medium mb-2">
                            First Name
                        </label>

                        <input
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(e.target.value)
                            }
                            className="bg-[#eeeeee] rounded px-3 py-3 border w-full text-base mb-4"
                            type="text"
                            placeholder="Enter your first name"
                            required
                            minLength={3}
                        />

                        <label className="block text-sm font-medium mb-2">
                            Last Name (Optional)
                        </label>

                        <input
                            value={lastName}
                            onChange={(e) =>
                                setLastName(e.target.value)
                            }
                            className="bg-[#eeeeee] rounded px-3 py-3 border w-full text-base mb-6"
                            type="text"
                            placeholder="Enter your last name"
                        />

                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={!isStep1Valid}
                            className="w-full bg-black text-white rounded px-4 py-3 disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* STEP 2: ACCOUNT DETAILS */}
                {step === 2 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Step 2: Account Details
                        </h3>

                        <label className="block text-sm font-medium mb-2">
                            Email Address
                        </label>

                        <input
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="bg-[#eeeeee] rounded px-3 py-3 border w-full text-base mb-4"
                            type="email"
                            placeholder="example@email.com"
                            required
                        />

                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>

                        <input
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="bg-[#eeeeee] rounded px-3 py-3 border w-full text-base mb-6"
                            type="password"
                            placeholder="Create a password"
                            required
                            minLength={8}
                        />

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="w-1/2 bg-gray-200 text-black rounded px-4 py-3"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!isStep2Valid}
                                className="w-1/2 bg-black text-white rounded px-4 py-3 disabled:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: VEHICLE DETAILS */}
                {step === 3 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Step 3: Vehicle Details
                        </h3>

                        <label className="block text-sm font-medium mb-2">
                            Vehicle Type
                        </label>

                        <select
                            value={vehicleType}
                            onChange={(e) =>
                                setVehicleType(e.target.value)
                            }
                            className="bg-[#eeeeee] rounded px-3 py-3 border w-full text-base mb-4"
                            required
                        >
                            <option value="car">Car</option>
                            <option value="motorcycle">
                                Motorcycle
                            </option>
                            <option value="auto">Auto</option>
                        </select>

                        <label className="block text-sm font-medium mb-2">
                            Vehicle Color
                        </label>

                        <input
                            value={color}
                            onChange={(e) =>
                                setColor(e.target.value)
                            }
                            className="bg-[#eeeeee] rounded px-3 py-3 border w-full text-base mb-4"
                            type="text"
                            placeholder="e.g. White"
                            required
                            minLength={3}
                        />

                        <label className="block text-sm font-medium mb-2">
                            Vehicle Number / Plate
                        </label>

                        <input
                            value={plate}
                            onChange={(e) =>
                                setPlate(e.target.value)
                            }
                            className="bg-[#eeeeee] rounded px-3 py-3 border w-full text-base mb-4"
                            type="text"
                            placeholder="Enter vehicle number"
                            required
                            minLength={6}
                        />

                        <label className="block text-sm font-medium mb-2">
                            Seating Capacity
                        </label>

                        <input
                            value={capacity}
                            onChange={(e) =>
                                setCapacity(e.target.value)
                            }
                            className="bg-[#eeeeee] rounded px-3 py-3 border w-full text-base mb-6"
                            type="number"
                            placeholder="e.g. 4"
                            required
                            min={1}
                            step={1}
                        />

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="w-1/2 bg-gray-200 text-black rounded px-4 py-3"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!isStep3Valid}
                                className="w-1/2 bg-black text-white rounded px-4 py-3 disabled:bg-gray-400"
                            >
                                Review
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: REVIEW DETAILS */}
                {step === 4 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Step 4: Review Your Details
                        </h3>

                        <div className="bg-gray-100 rounded-lg p-4 mb-6 space-y-4">

                            <div>
                                <h4 className="font-semibold">
                                    Personal Details
                                </h4>

                                <p className="text-sm text-gray-700">
                                    Name: {firstName} {lastName}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-blue-600 text-sm mt-1"
                                >
                                    Edit
                                </button>
                            </div>

                            <hr />

                            <div>
                                <h4 className="font-semibold">
                                    Account Details
                                </h4>

                                <p className="text-sm text-gray-700">
                                    Email: {email}
                                </p>

                                <p className="text-sm text-gray-700">
                                    Password: {"•".repeat(password.length)}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="text-blue-600 text-sm mt-1"
                                >
                                    Edit
                                </button>
                            </div>

                            <hr />

                            <div>
                                <h4 className="font-semibold">
                                    Vehicle Details
                                </h4>

                                <p className="text-sm text-gray-700">
                                    Type: {vehicleType}
                                </p>

                                <p className="text-sm text-gray-700">
                                    Color: {color}
                                </p>

                                <p className="text-sm text-gray-700">
                                    Plate: {plate}
                                </p>

                                <p className="text-sm text-gray-700">
                                    Capacity: {capacity}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="text-blue-600 text-sm mt-1"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="w-1/2 bg-gray-200 text-black rounded px-4 py-3"
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                className="w-1/2 bg-black text-white rounded px-4 py-3"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                )}
            </form>

            {/* Login and User Signup Links */}
            <p className="text-center font-medium mt-6">
                Already have an account?{" "}
                <Link
                    to="/CaptainLogin"
                    className="text-blue-600"
                >
                    Login
                </Link>
            </p>
        </div>

        {/* Switch to User Signup */}
        <div className="mt-8">
            <Link
                to="/UserSignup"
                className="text-white bg-[#e1a000] flex justify-center rounded px-4 py-3 w-full"
            >
                Sign up as User
            </Link>
        </div>
    </div>
);


};

export default CaptainSignup;
