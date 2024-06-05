import React from 'react'
import axios from "axios";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {useAuth} from "../context/Authprovider.jsx";
import toast from "react-hot-toast";

function Login() {
    const [authUser, setAuthUser] = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        const userInfo={

            email: data.email,
            password: data.password,

        };
            await axios
                .post("/api/user/login", userInfo)
                .then((response)=> {

                    if (response.data){
                        toast.success("Login Successful");
                        // setTimeout(() => {
                        //     window.location.reload();},1000);

                    }
                    localStorage.setItem("WhoseApp",JSON.stringify(response.data))
                    setAuthUser(response.data);
                })
                .catch((error) => {
                    if (error.response){
                        toast.error("Error: " + error.response.data.error);
                        console.log(error)
                    }
                });


        // console.log(userInfo)
    }
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
                <div className="flex h-screen items-center justify-center -mt-20">


                    <form onSubmit={handleSubmit(onSubmit)}
                          className="border border-gray-700 rounded-md px-6 py-2 space-y-3 w-96">
                        <div>
                            <h1 className="flex justify-center text-4xl font-bold items-center text-center px-5">
                                <img src="https://img.icons8.com/?size=100&id=62giybpMlD07&format=png&color=000000" className="my-3"
                                     alt="ChatLogo" height="10"/>
                                Whose<span className="text-purple-700">App</span>
                            </h1>
                            <p className="text-xs ml-36  -mt-8">Copyright 2024 Vatsal</p>
                        </div>
                        {/*//Email*/}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                 className="w-4 h-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                            </svg>
                            <input type="text" className="grow" placeholder="Email"
                                   {...register("email", {required: true})}/>
                        </label>
                        {errors.email && <span className="text-red-500 text-sm">**This field is required**</span>}


                        {/*//Password*/}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                 className="w-4 h-4 opacity-70">
                                <path fillRule="evenodd"
                                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                      clipRule="evenodd"/>
                            </svg>
                            <input type="password" className="grow" placeholder="Password"
                                   {...register("password", {required: true})}/>
                        </label>
                        {errors.password && <span className="text-red-500 text-sm">**This field is required**</span>}


                        {/*(Text & Password)*/}
                        <div className="flex justify-between px-1">
                            <p>New User?<Link to={"/signup"}
                                              className="text-blue-700 underline cursor-pointer ml-1">Signup</Link></p>
                            <input type="submit" value="Login"
                                   className="bg-purple-700 text-white px-3 rounded-e-md cursor-pointer hover:bg-purple-400 hover:text-gray-700 duration-300 hover:scale-105 hover:font-semibold"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
