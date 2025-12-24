import React from "react"
interface ContactMethod {
    type: "email" | "phone"
    value: string
}

interface IFormInput {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    contacts: ContactMethod[]
    save?: boolean
}

import { useState } from "react"
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form"

export default function ReactForm() {
    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
        watch
    } = useForm<IFormInput>({
        defaultValues: {
            contacts: [],
        }
    })
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        console.log(data.email);
    }

    const { fields, remove, append } = useFieldArray({ control, name: "contacts" })

    const [isLogin, setIsLogin] = useState(true);

    function toggleFormState() {
        setIsLogin(!isLogin);
    }

    const formHeading = isLogin ? "Sign in to our platform" : "Sign up to our platform";
    const formTransitionStyle = isLogin ? "scale-100 h-auto" : "scale-95 overflow-hidden ";

    return (
        <div className="h-screen">
            <div className="flex justify-center items-center min-h-full overflow-y-auto ">
                <div className="w-full max-w-sm  p-2 bg-white border my-6 border-gray-200 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700">
                    <form className={`transition-all duration-300 ease-in-out h-full px-3 space-y-6 ${formTransitionStyle}`} action="#" onSubmit={handleSubmit(onSubmit)}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">{formHeading}</h5>
                        <div className={`transition-all duration-300 ease-in-out flex flex-col gap-4 `}>
                            {
                                !isLogin &&
                                <>
                                    <div>
                                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                        <input type="firstName" {...register("firstName", { required: true })}
                                            aria-invalid={errors.firstName ? "true" : "false"}
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                                       dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com
                                        ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`} />
                                        {errors.firstName?.type === "required" && (
                                            <p role="alert" className="text-red-500">First Name is required</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                        <input type="lastName" {...register("lastName", { required: true })}
                                            aria-invalid={errors.lastName ? "true" : "false"}
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                                         dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com
                                          ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`} />
                                        {errors.lastName?.type === "required" && (
                                            <p role="alert" className="text-red-500">Last Name is required</p>
                                        )}
                                    </div>
                                </>
                            }
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" {...register("email", { required: true })}
                                aria-invalid={errors.email ? "true" : "false"}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                              dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com
                              ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`} />
                            {errors.email?.type === "required" && (
                                <p role="alert" className="text-red-500">Email is required</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" id="password"
                                {...register("password", { required: true })}
                                placeholder="••••••••" className={`bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                            w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                            ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                            {errors.password?.type === "required" && (
                                <p role="alert" className="text-red-500">password is required</p>
                            )}
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start flex-col">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" {...register('save', { required: true })}
                                        value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                </div>
                                {errors.save?.type === "required" && (
                                    <p role="alert" className="text-red-500 mt-1">This Check is required</p>
                                )}
                            </div>
                            <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot Password?</a>
                        </div>
                        {
                            !isLogin && (
                                <div>
                                    <button className=" text-white flex gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => append({ type: 'email', value: '' })}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                                        </div> <span>Add Contacts</span>
                                    </button>
                                    {
                                        fields.map((field, index) => {
                                            const type = watch(`contacts.${index}.type`)
                                            return <div key={field.id} className="mt-4 relative">

                                                <div className="flex flex-col gap-2 py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg">
                                                    <select className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                                                    dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com
                                                    ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}>
                                                        <option value="email">Email</option>
                                                        <option value="phone">Phone Number</option>
                                                    </select>

                                                    <input {...register(`contacts.${index}.value`)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                                                    dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com
                                                     ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                                                        placeholder={type === "phone" ? "Phone number" : "Email address"}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="text-red-500 cursor-pointer absolute -top-3 -right-2 bg-white border border-red-200 rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#fb2c36"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                                </button>
                                            </div>
                                        })
                                    }
                                </div>
                            )

                        }
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300" onClick={toggleFormState}>
                            {isLogin ? 'not registered?' : 'Already have account?'} <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
                                {isLogin ? 'Create Account' : 'Login'}
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}