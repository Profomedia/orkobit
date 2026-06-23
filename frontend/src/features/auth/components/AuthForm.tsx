import Button from "@/components/ui/Button";
import {useState} from "react";

import {Link} from "react-router-dom";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

type AuthMode = "login" | "register";

interface AuthFormProps {
    mode?: AuthMode;

    onSubmit: (data: AuthFormData) => Promise<void>;
}

interface AuthFormData {
    username: string;
    email?: string;
    password: string;
    password2?: string;
}

interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    password2?: string;
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export default function AuthForm({mode = "login", onSubmit}: AuthFormProps) {
    const isRegister = mode === "register";

    const [formData, setFormData] = useState<AuthFormData>({
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const [loading, setLoading] = useState(false)
    const [submitError, setSubmitError] = useState("")

    const [errors, setErrors] = useState<FormErrors>({});


    // --------------------------------------------------
    // HANDLE INPUT CHANGE
    // --------------------------------------------------

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    const validate = () => {
        const errs: FormErrors = {};

        if (!formData.username) {
            errs.username = "Username is required";
        }

        if (!formData.password) {
            errs.password = "Password is required";
        }

        if (isRegister) {
            if (!formData.email) {
                errs.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                errs.email = "Invalid email";
            }

            if (!formData.password2) {
                errs.password2 = "Confirm your password";
            } else if (formData.password !== formData.password2) {
                errs.password2 = "Passwords do not match";
            }
        }

        setErrors(errs);

        return Object.keys(errs).length === 0;
    };

    // --------------------------------------------------
    // SUBMIT
    // --------------------------------------------------

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitError("");

        console.log("before validate");

        if (!validate()) {
            return;
        }

        console.log("before submit");

        try {
            setLoading(true);

            await onSubmit(formData);
            console.log("after submit");
        } catch (error) {
            setSubmitError(
                error instanceof Error ? error.message : "Login failed",
            );
        } 
        finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // UI
    // --------------------------------------------------


    return (
        <div className="w-full max-w-80 absolute">
            {/* Logo */}

            <div className="bg-zinc-900 border border-primary rounded-sm md:rounded-2xl p-2 md:p-5 text-center">
                <h1 className="text-white text-3xl font-bold">Orkobit</h1>
            </div>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 border border-zinc-700 rounded-sm md:rounded-2xl mt-4 p-6 md:p-8 w-full"
            >
                {loading && (
                    <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 text-center text-sm text-primary">
                        Authenticating...
                    </div>
                )}
                <h2 className="text-3xl font-bold text-white text-center">
                    {isRegister ? "Register" : "Login"}
                </h2>

                <div className="mt-8 space-y-4">
                    {/* Username */}

                    <div>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                            placeholder="Username"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-sm md:rounded-xl px-4 py-3 outline-none text-white placeholder:text-zinc-500 focus:border-zinc-500"
                        />

                        {errors.username && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    {/* Email */}

                    {isRegister && (
                        <div>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                placeholder="Email"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-sm md:rounded-xl px-4 py-3 outline-none text-white placeholder:text-zinc-500 focus:border-zinc-500"
                            />

                            {errors.email && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Password */}

                    <div>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete={
                                isRegister ? "new-password" : "current-password"
                            }
                            placeholder="Password"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-sm md:rounded-xl px-4 py-3 outline-none text-white placeholder:text-zinc-500 focus:border-zinc-500"
                        />

                        {errors.password && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}

                    {isRegister && (
                        <div>
                            <input
                                name="password2"
                                type="password"
                                value={formData.password2}
                                onChange={handleChange}
                                autoComplete="new-password"
                                placeholder="Confirm Password"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-sm md:rounded-xl px-4 py-3 outline-none text-white placeholder:text-zinc-500 focus:border-zinc-500"
                            />

                            {errors.password2 && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.password2}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Submit */}

                    <Button
                        type="submit"
                        variant="form-auth"
                        disabled={loading}
                        className="w-full mt-4 rounded-sm md:rounded-xl"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Signing In...
                            </span>
                        ) : isRegister ? (
                            "Register"
                        ) : (
                            "Login"
                        )}
                    </Button>

                    {/* Footer Links */}

                    {/* <div className="text-center mt-6">

            {mode === "login" ? (

              <Link
                to="/reset"
                className="text-sm text-zinc-400 hover:text-zinc-300"
              >
                Forgot password?
              </Link>

            ) : (

              <Link
                to="/login"
                className="text-sm text-zinc-400 hover:text-zinc-300"
              >
                Already have an account?
              </Link>
            )}

          </div> */}
                    {submitError && (
                        <div className="rounded-xl border text-center border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                            {submitError}
                        </div>
                    )}

                    <div className="text-center mt-4 text-zinc-400 text-sm">
                        {mode === "login"
                            ? "New to Orkobit?"
                            : "Already registered?"}

                        <Link
                            to={mode === "login" ? "/register" : "/login"}
                            className="ml-2 text-white underline"
                        >
                            {mode === "login" ? "Create account" : "Login"}
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
