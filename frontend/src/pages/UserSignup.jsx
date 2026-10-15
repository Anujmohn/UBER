import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
const [step, setStep] = useState(1);

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [phone, setPhone] = useState('');
const [countryCode, setCountryCode] = useState('+91');
const [signupMethod, setSignupMethod] = useState('email');

// Validation
const isPersonalDetailsValid = firstName.trim().length >= 2;

const isAccountDetailsValid =
    signupMethod === 'email'
        ? /^\S+@\S+\.\S+$/.test(email.trim()) && password.length >= 8
        : /^[0-9]{7,15}$/.test(phone.replace(/\D/g, ''));

// Next step
const nextStep = () => {
    if (step < 3) {
        setStep((previousStep) => previousStep + 1);
    }
};

// Previous step
const previousStep = () => {
    if (step > 1) {
        setStep((previousStep) => previousStep - 1);
    }
};

// Create account
const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
        fullname: {
            firstname: firstName.trim(),
            lastname: lastName.trim(),
        },
        ...(signupMethod === 'email'
            ? {
                email: email.trim().toLowerCase(),
                password,
            }
            : {
                phone: `${countryCode}${phone.replace(/\D/g, '')}`,
            }),
    };

    console.log('Signup Data:', userData);

    // Connect your signup API here.
    // This currently logs the data; it does not create an account.

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setCountryCode('+91');
    setSignupMethod('email');
    setStep(1);
};

// Google/Facebook placeholder handlers
const socialSignup = (provider) => {
    console.log(`Signup with ${provider}`);

    // Integrate the provider's authentication here.
};

return (
    <div className="min-h-screen p-4 flex flex-col justify-between">

        <div>
            {/* Logo */}
            <h1 className="text-2xl font-bold mb-2 text-black">
                Yoo
            </h1>

            <hr />

            <h2 className="text-xl text-center font-semibold mt-3 mb-6">
                Create an Account
            </h2>

            {/* Progress Indicator */}
            <div className="flex items-center mb-8">
                {[
                    { number: 1, label: 'Personal' },
                    { number: 2, label: 'Account' },
                    { number: 3, label: 'Review' },
                ].map((item, index) => (
                    <React.Fragment key={item.number}>
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold ${
                                    step >= item.number
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}
                            >
                                {item.number}
                            </div>

                            <span className="text-xs mt-2">
                                {item.label}
                            </span>
                        </div>

                        {index < 2 && (
                            <div
                                className={`h-1 flex-1 mx-2 mb-5 rounded ${
                                    step > item.number
                                        ? 'bg-black'
                                        : 'bg-gray-200'
                                }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <form onSubmit={submitHandler}>

                {/* STEP 1: PERSONAL DETAILS */}
                {step === 1 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Step 1: Personal Details
                        </h3>

                        <label className="block text-lg mb-2 font-medium">
                            First Name
                        </label>

                        <input
                            className="bg-[#eeeeee] rounded-lg px-3 py-3 border w-full text-base mb-4"
                            required
                            minLength={2}
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <label className="block text-lg mb-2 font-medium">
                            Last Name (Optional)
                        </label>

                        <input
                            className="bg-[#eeeeee] rounded-lg px-3 py-3 border w-full text-base mb-6"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={!isPersonalDetailsValid}
                            className="w-full rounded-lg px-3 py-3 bg-black text-white font-medium disabled:bg-gray-400"
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

                        {/* Signup Method */}
                        <p className="text-sm font-medium mb-2">
                            Choose Signup Method
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <button
                                type="button"
                                onClick={() => setSignupMethod('email')}
                                className={`rounded-lg py-2 border font-medium transition ${
                                    signupMethod === 'email'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                Email
                            </button>

                            <button
                                type="button"
                                onClick={() => setSignupMethod('phone')}
                                className={`rounded-lg py-2 border font-medium transition ${
                                    signupMethod === 'phone'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                Phone Number
                            </button>
                        </div>

                        {/* Email Registration */}
                        {signupMethod === 'email' ? (
                            <>
                                <label className="block text-lg mb-2 font-medium">
                                    Enter Your Email
                                </label>

                                <input
                                    className="bg-[#eeeeee] rounded-lg px-3 py-3 border w-full text-base mb-4"
                                    required
                                    type="email"
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <label className="block text-lg mb-2 font-medium">
                                    Enter Password
                                </label>

                                <input
                                    className="bg-[#eeeeee] rounded-lg px-3 py-3 border w-full text-base mb-2"
                                    required
                                    minLength={8}
                                    type="password"
                                    placeholder="Create a password (min. 8 characters)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <p className="text-xs text-gray-500 mb-5">
                                    Password must contain at least 8 characters.
                                </p>
                            </>
                        ) : (
                            <>
                                <label className="block text-lg mb-2 font-medium">
                                    Enter Your Phone Number
                                </label>

                                <div className="flex gap-2 mb-4">
                                    <select
                                        className="bg-[#eeeeee] rounded-lg px-2 py-3 border"
                                        aria-label="Country code"
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                    >
                                        <option value="+91">🇮🇳 +91</option>
                                        <option value="+1">🇺🇸 +1</option>
                                        <option value="+44">🇬🇧 +44</option>
                                        <option value="+61">🇦🇺 +61</option>
                                    </select>

                                    <input
                                        className="bg-[#eeeeee] rounded-lg px-3 py-3 border w-full text-base"
                                        required
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="Phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <p className="text-sm text-gray-500 mb-5">
                                    Phone verification with an OTP is not yet implemented.
                                </p>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="w-1/2 rounded-lg px-3 py-3 bg-gray-200 text-black font-medium"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!isAccountDetailsValid}
                                className="w-1/2 rounded-lg px-3 py-3 bg-black text-white font-medium disabled:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: REVIEW DETAILS */}
                {step === 3 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Step 3: Review Your Details
                        </h3>

                        <div className="bg-gray-100 rounded-lg p-4 mb-6 space-y-4">

                            <div>
                                <h4 className="font-semibold">
                                    Personal Details
                                </h4>

                                <p className="text-sm text-gray-700 mt-1">
                                    First Name: {firstName}
                                </p>

                                <p className="text-sm text-gray-700">
                                    Last Name: {lastName || 'Not provided'}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-blue-600 text-sm mt-2 hover:underline"
                                >
                                    Edit Personal Details
                                </button>
                            </div>

                            <hr />

                            <div>
                                <h4 className="font-semibold">
                                    Account Details
                                </h4>

                                <p className="text-sm text-gray-700 mt-1">
                                    Signup Method: {signupMethod === 'email' ? 'Email' : 'Phone Number'}
                                </p>

                                {signupMethod === 'email' ? (
                                    <>
                                        <p className="text-sm text-gray-700">
                                            Email: {email}
                                        </p>

                                        <p className="text-sm text-gray-700">
                                            Password: {'•'.repeat(password.length)}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-700">
                                        Phone: {countryCode} {phone}
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="text-blue-600 text-sm mt-2 hover:underline"
                                >
                                    Edit Account Details
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="w-1/2 rounded-lg px-3 py-3 bg-gray-200 text-black font-medium"
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                className="w-1/2 rounded-lg px-3 py-3 bg-black text-white font-medium hover:bg-gray-700"
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Social Signup */}
                        <div className="flex items-center gap-3 my-5">
                            <div className="h-px bg-gray-300 flex-1" />

                            <span className="text-sm text-gray-500 whitespace-nowrap">
                                OR CONTINUE WITH
                            </span>

                            <div className="h-px bg-gray-300 flex-1" />
                        </div>

                        <button
                            type="button"
                            onClick={() => socialSignup('Google')}
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 mb-3 hover:bg-gray-100 transition"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt=""
                                className="w-5 h-5"
                            />

                            <span className="font-medium">
                                Continue with Google
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => socialSignup('Facebook')}
                            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white rounded-lg px-4 py-3 hover:bg-[#166FE5] transition"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 fill-white"
                                aria-hidden="true"
                            >
                                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.884v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
                            </svg>

                            <span className="font-medium">
                                Continue with Facebook
                            </span>
                        </button>
                    </div>
                )}
            </form>

            {/* Login Link */}
            <p className="text-center font-medium mt-6 mb-6">
                Already have an account?{' '}
                <Link
                    to="/UserLogin"
                    className="text-blue-600 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>

        {/* Captain Signup Link */}
        <div className="mt-5">
            <Link
                to="/CaptainSignup"
                className="text-white bg-[#26bc85] hover:bg-[#20a876] flex justify-center rounded-lg px-3 py-3 border w-full text-lg transition"
            >
                Sign up as Captain
            </Link>
        </div>
    </div>
);


};

export default UserSignup;
