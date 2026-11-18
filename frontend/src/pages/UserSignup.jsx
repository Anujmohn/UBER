import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios'
import {UserContext}  from '../context/UserContext';

const UserSignup = () => {
const [step, setStep] = useState(1);

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [phone, setPhone] = useState('');
const [countryCode, setCountryCode] = useState('+91');
const [signupMethod, setSignupMethod] = useState('email');
const [submitError, setSubmitError] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const navigate = useNavigate() 

const { updateUser } = React.useContext(UserContext)


/// -------------- SUbmit Handler ----------------


const submitHandler =async (e) => {
    e.preventDefault();

    setSubmitError('');

    if (signupMethod !== 'email') {
        setSubmitError('Phone signup is not available yet. Please create your account with email.');
        return;
    }

    const userData = {
        fullname: {
            firstname: firstName.trim(),
            lastname: lastName.trim(),
        },
        email: email.trim().toLowerCase(),
        password,
    };

    setIsSubmitting(true);

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/register`,
            userData
        );

        if (response.status !== 201) {
            throw new Error('Your account could not be created. Please try again.');
        }

        const { user, token } = response.data;
        updateUser(user, token);
        navigate('/Home');

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setCountryCode('+91');
        setSignupMethod('email');
        setStep(1);
    } catch (error) {
        const responseData = error.response?.data;
        const validationErrors = responseData?.errors
            ?.map(({ msg }) => msg)
            .filter(Boolean)
            .join(' ');

        setSubmitError(
            responseData?.message ||
                validationErrors ||
                error.message ||
                'Unable to create your account. Please try again.'
        );
    } finally {
        setIsSubmitting(false);
    }
};



// Validate personal details
const isPersonalDetailsValid = firstName.trim().length >=3;

// Validate account details
const isAccountDetailsValid =
    signupMethod === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
          password.length >= 6
        : /^[0-9]{7,15}$/.test(phone.replace(/\D/g, ''));

// Go to next step
const nextStep = () => {
    if (step < 3) {
        setStep((previousStep) => previousStep + 1);
    }
};

// Go to previous step
const previousStep = () => {
    if (step > 1) {
        setStep((previousStep) => previousStep - 1);
    }
};

// Google/Facebook signup handler
const socialSignup = (provider) => {
    console.log(`Signup with ${provider}`);

    // Integrate Google or Facebook authentication here.
};

// Create account

return (
    <div className="min-h-screen bg-white px-3 py-3 sm:px-5 sm:py-4 flex flex-col justify-between">

        <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
            {/* Logo */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-black">
                Yoo
            </h1>

            <hr className="border-slate-200" />

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl text-center font-semibold mt-3 mb-1 text-black">
                Create an Account
            </h2>

            <p className="text-sm text-center text-gray-500 mb-3">
                Sign up to get started
            </p>

            {/* SOCIAL SIGNUP - VISIBLE ON FIRST PAGE */}
           {step ===1 && (
                <div>
                     <div className="mb-3">

                            {/* Google */}
                            <button
                                type="button"
                                onClick={() => socialSignup('Google')}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-3 py-2 mb-2 bg-white text-black font-medium hover:bg-gray-100 active:scale-[0.99] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    className="w-5 h-5 shrink-0"
                                />

                                <span className="font-medium">
                                    Continue with Google
                                </span>
                            </button>

                            {/* Facebook */}
                            <button
                                type="button"
                                onClick={() => socialSignup('Facebook')}
                                className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-lg px-3 py-2 mb-2 hover:bg-[#166FE5] active:scale-[0.99] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 fill-white shrink-0"
                                    aria-hidden="true"
                                >
                                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.884v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
                                </svg>

                                <span className="font-medium">
                                    Continue with Facebook
                                </span>
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-2 mt-3">
                                <div className="h-px bg-slate-200 flex-1" />

                                <span className="text-[10px] sm:text-xs text-gray-500 text-center">
                                    OR SIGN UP WITH EMAIL OR PHONE
                                </span>

                                <div className="h-px bg-slate-200 flex-1" />
                            </div>
                        </div>


                        
                {/* STEP 1: PERSONAL DETAILS */}

                        <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black">
                            Step 1: Personal Details
                        </h3>

                        <label className="block text-sm mb-1 font-medium text-black">
                            First Name
                        </label>

                        <input
                            className="w-full rounded-lg border border-gray-300 bg-[#eeeeee] px-3 py-2 text-sm sm:text-base text-black placeholder:text-gray-500 outline-none transition-all duration-150 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 mb-3"
                            required
                            minLength={3}
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <label className="block text-sm mb-1 font-medium text-black">
                            Last Name (Optional)
                        </label>

                        <input
                            className="w-full rounded-lg border border-gray-300 bg-[#eeeeee] px-3 py-2 text-sm sm:text-base text-black placeholder:text-gray-500 outline-none transition-all duration-150 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 mb-4"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={!isPersonalDetailsValid}
                            className="w-full rounded-lg px-3 py-2.5 bg-black text-white text-sm sm:text-base font-medium transition-all duration-150 hover:bg-gray-800 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
                        >
                            Next
                        </button>
                    </div>

                </div>
           )}

            {/* Progress Indicator */}
            <div className="flex items-center mb-4 mt-4 px-1">
                {[
                    { number: 1, label: 'Personal' },
                    { number: 2, label: 'Account' },
                    { number: 3, label: 'Review' },
                ].map((item, index) => (
                    <React.Fragment key={item.number}>
                        <div className="flex min-w-0 flex-col items-center">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold shadow-sm transition-all duration-300 ${
                                    step >= item.number
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}
                            >
                                {item.number}
                            </div>

                            <span className="mt-1 text-[10px] sm:text-xs text-gray-600">
                                {item.label}
                            </span>
                        </div>

                        {index < 2 && (
                            <div
                                className={`mx-2 mb-5 h-1.5 flex-1 rounded-full transition-colors duration-300 ${
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
                {submitError && (
                    <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                        {submitError}
                    </p>
                )}

                {/* STEP 2: ACCOUNT DETAILS */}
                {step === 2 && (
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black">
                            Step 2: Account Details
                        </h3>

                        {/* Signup Method */}
                        <label className="block text-base font-medium mb-2">
                            Choose Signup Method
                        </label>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <button
                                type="button"
                                onClick={() => setSignupMethod('email')}
                                className={`rounded-lg border px-3 py-2 font-medium text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${
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
                                className={`rounded-lg border px-3 py-2 font-medium text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${
                                    signupMethod === 'phone'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                Phone Number
                            </button>
                        </div>

                        {/* Email Form */}
                        {signupMethod === 'email' ? (
                            <>
                                <label className="block text-sm mb-1 font-medium text-black">
                                    Enter Your Email
                                </label>

                                <input
                                    className="w-full rounded-lg border border-gray-300 bg-[#eeeeee] px-3 py-2 text-sm sm:text-base text-black placeholder:text-gray-500 outline-none transition-all duration-150 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 mb-3"
                                    required
                                    type="email"
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <label className="block text-sm mb-1 font-medium text-black">
                                    Enter Password
                                </label>

                                <input
                                    className="w-full rounded-lg border border-gray-300 bg-[#eeeeee] px-3 py-2 text-sm sm:text-base text-black placeholder:text-gray-500 outline-none transition-all duration-150 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 mb-2"
                                    required
                                    minLength={8}
                                    type="password"
                                    placeholder="Create a password (min. 8 characters)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <p className="text-xs text-gray-500 mb-3">
                                    Password must contain at least 8 characters.
                                </p>
                            </>
                        ) : (
                            <>
                                <label className="block text-sm mb-1 font-medium text-black">
                                    Enter Your Phone Number
                                </label>

                                <div className="flex flex-row gap-2 mb-3">
                                    <select
                                        className="min-w-[95px] rounded-lg border border-gray-300 bg-[#eeeeee] px-2 py-2 text-sm text-black outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
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
                                        className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-[#eeeeee] px-3 py-2 text-sm sm:text-base text-black placeholder:text-gray-500 outline-none transition-all duration-150 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200"
                                        required
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="Phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <p className="text-sm text-gray-500 mb-3">
                                    OTP verification is not implemented yet.
                                </p>
                            </>
                        )}

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="w-1/2 rounded-lg px-3 py-2.5 bg-gray-200 text-black text-sm font-medium transition-all duration-150 hover:bg-gray-300 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!isAccountDetailsValid}
                                className="w-1/2 rounded-lg px-3 py-2.5 bg-black text-white text-sm font-medium transition-all duration-150 hover:bg-gray-800 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: REVIEW */}
                {step === 3 && (
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black">
                            Step 3: Review Your Details
                        </h3>

                        <div className="mb-4 space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                            <div>
                                <h4 className="font-semibold text-black">
                                    Personal Details
                                </h4>

                                <p className="mt-1 break-words text-sm text-gray-700">
                                    First Name: {firstName}
                                </p>

                                <p className="break-words text-sm text-gray-700">
                                    Last Name: {lastName || 'Not provided'}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="mt-2 inline-flex text-sm text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    Edit Personal Details
                                </button>
                            </div>

                            <hr className="border-slate-200" />

                            <div>
                                <h4 className="font-semibold text-black">
                                    Account Details
                                </h4>

                                <p className="mt-1 break-words text-sm text-gray-700">
                                    Signup Method: {signupMethod === 'email' ? 'Email' : 'Phone Number'}
                                </p>

                                {signupMethod === 'email' ? (
                                    <>
                                        <p className="break-words text-sm text-gray-700">
                                            Email: {email}
                                        </p>

                                        <p className="break-words text-sm text-gray-700">
                                            Password: {'•'.repeat(password.length)}
                                        </p>
                                    </>
                                ) : (
                                    <p className="break-words text-sm text-gray-700">
                                        Phone: {countryCode} {phone}
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="mt-2 inline-flex text-sm text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    Edit Account Details
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="w-1/2 rounded-lg px-3 py-2.5 bg-gray-200 text-black text-sm font-medium transition-all duration-150 hover:bg-gray-300 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-1/2 rounded-lg px-3 py-3 bg-black text-white font-medium hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>
                    </div>
                )}
            </form>

            {/* Login Link */}
            <p className="mt-4 mb-3 text-center text-sm font-medium text-gray-700">
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
        <div className="mt-3">
            <Link
                to="/CaptainSignup"
                className="flex w-full items-center justify-center rounded-lg border px-3 py-2.5 text-base bg-[#26bc85] text-white transition-all duration-150 hover:bg-[#20a876] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            >
                Sign up as Captain
            </Link>
        </div>
    </div>
);


};

export default UserSignup;
