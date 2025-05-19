import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logginAs, setLogginAs] = useState(1);
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        }

        const registerData = {
            UserId: crypto.randomUUID(),
            FirstName: firstName,
            LastName: lastName,
            Gmail: email,
            Password: password,
            LogginAs: logginAs,
        };

        console.log("Registering user with data:", registerData);

        try {
            const response = await fetch(
                "https://localhost:7278/api/RegisterForm/InsertCredentialsOfUser",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registerData),
                }
            );

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch {
                result = text;
            }

            console.log("API Response:", result);

            if (!response.ok) {
                console.error("API Error:", result);
                alert(`Error: ${result.message || result || "Registration failed"}`);
            } else {
                alert("Registration Successful! Redirecting to login...");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to connect to server. Please try again later.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h2>
                <p className="text-center text-gray-500 mb-6">Join the Job Portal and find your dream job!</p>

                <form className="space-y-4" onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <div>
                        <input 
                            type="password" 
                            placeholder="Password (min 8 characters)" 
                            className={`w-full p-3 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500`} 
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (e.target.value.length >= 8) {
                                    setPasswordError("");
                                }
                            }} 
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>
                    <select 
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                        onChange={(e) => setLogginAs(parseInt(e.target.value))}
                    >
                        <option value="1">Job Seeker</option>
                        <option value="2">Recruiter</option>
                      
                    </select>
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account? 
                    <span 
                        className="text-blue-500 cursor-pointer hover:underline ml-1"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
