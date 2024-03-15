import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import Header from "./Header";
import OurWorkflow from "./OurWorkflow";
import Review from "./Review";
import Services from "./Services";
import Slider from "./Slider";
import TestiMonials from "./TestiMonials";
import WhyVyapar from "./WhyVyapar";
import '../styles/login.css'
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
    const [modalActive, setModalActive] = useState(false);

    const [activeData, setActiveData] = useState('login')
    const [email, setEmail] = useState()
    const [password, setPasswod] = useState()
    const [createName, setCreateName] = useState()
    const [createEmail, setCreateEmail] = useState()
    const [createPassword, setCreatePassword] = useState()
    const [createNumber, setCreateNumber] = useState()
    const [createConPassword, setCreateConPassword] = useState()
    const [login, setLogin] = useState()
    const [ loginStatus, setLoginStatus] = useState(false)

    const openModal = () => {
        setModalActive(true);
    };

    const closeModal = () => {
        setModalActive(false);
    };

    const CreateAccount = async () => {
        if (createName && createEmail && createPassword && createConPassword) {
            if (createConPassword === createPassword) {
                let url = `http://localhost:5000/admin/createAccount`
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: createEmail, name: createName, password: createPassword, number: createNumber })
                    });
                    if (response.status === 200) {
                        setCreateConPassword()
                        setEmail()
                        setPasswod()
                        setCreateEmail()
                        setCreateName()
                        setCreatePassword()
                        setCreateNumber()
                        toast.success("Create Account Sucesfully!")
                        setActiveData('login')

                    } else {
                        const data = await response.json();
                        toast.error(data.error)
                    }
                } catch (e) {
                    toast.error(e)

                    console.log(e, 'error')
                }
            } else {
                toast.error("password and confirmPassword not same!")
            }
        } else {

            toast.error("please fille all filled!")
        }


    }
    // const navigate = useNavigate();

    const Login = async () => {
        if (email && password) {

            let url = `http://localhost:5000/admin/login`
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email, password: password })
                });
                const data = await response.json();
                console.log(data)
                if (response.status === 200) {
                    console.log(data)
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("id", data._id);
                    data.name && localStorage.setItem('number', data.number);
                    localStorage.setItem('name', data.name);
                    setLoginStatus(true)
                    // setLogin(data.email)
                    setCreateConPassword()
                    setEmail()
                    setPasswod()
                    setCreateEmail()
                    setCreateName()
                    setCreatePassword()
                    toast.success("Login Account Sucesfully!")
                    setModalActive(false)



                } else {
                    toast.error(data.error)
                }
            } catch (e) {
                toast.error(e)

                console.log(e, 'error')
            }
        } else {
            toast.error("please fille all filled!")

        }

    }

    const ForgotPassword = async () => {
        if (email && createPassword && createConPassword) {
            if (createConPassword === createPassword) {
                let url = `http://localhost:5000/admin/ForgotPassword`
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: email, password: createPassword })
                    });
                    if (response.status === 200) {
                        setEmail()
                        setCreateConPassword()
                        setPasswod()
                        setCreateEmail()
                        setCreateName()
                        setCreatePassword()
                        toast.success("Password Update Sucesfully!")
                        setActiveData('login')

                    } else {
                        const data = await response.json();
                        toast.error(data.error)
                    }
                } catch (e) {
                    toast.error(e)

                    console.log(e, 'error')
                }
            } else {
                toast.error("password and confirmPassword not same!")
            }
        } else {

            toast.error("please fille all filled!")
        }


    }

    useEffect(() => {
        setLogin(localStorage.getItem('email'))
    }, [loginStatus])

    return (
        <>
            <div className="App">


                {modalActive && (
                    <>
                        <div className="modal-overlay" onClick={closeModal}></div>
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">

                            <section className="vh-100 container_body">
                                <div className="container py-5 h-100">
                                    <div className="row px-3 d-flex align-items-center justify-content-center h-100">
                                        <div className="col-md-10 col-lg-10 col-xl-9 card flex-row mx-auto px-0">
                                            <div className="img-left d-none d-md-flex"></div>

                                            <div className="card-body">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "30px" }} onClick={closeModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                {
                                                    activeData === "login" &&
                                                    <>

                                                        <h2 class="title text-center mt-4 modal_heading" >
                                                            Login  account
                                                        </h2>
                                                        <div class="form-box px-3">
                                                            <div class="form-input">
                                                                <span><i class="bi bi-envelope-fill"></i></span>
                                                                <input type="email" placeholder="Email Address" tabindex="10" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                                            </div>
                                                            <div class="form-input">
                                                                <span><i class="fa fa-key"></i></span>
                                                                <input type="password" name="" placeholder="Password" required value={password} onChange={(e) => { setPasswod(e.target.value) }} />
                                                            </div>

                                                            <div class="mb-3">
                                                                <div class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input" id="cb1" name="" />
                                                                    <label class="custom-control-label" for="cb1">Remember me</label>
                                                                </div>
                                                            </div>

                                                            <div class="mb-3">
                                                                <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={() => { Login() }}>
                                                                    Login
                                                                </button>
                                                            </div>

                                                            <div class="text-right">
                                                                <a class="forget-link" onClick={() => {
                                                                    setEmail()
                                                                    setPasswod()
                                                                    setCreatePassword()
                                                                    setCreateConPassword()
                                                                    setActiveData('forgot')
                                                                }} style={{ cursor: "pointer" }}>
                                                                    Forget Password?
                                                                </a>
                                                            </div>

                                                            <div class="text-center ">
                                                                <h4 class="title text-center mb-2" style={{ color: 'rgb(25, 135, 84)' }}>
                                                                    OR
                                                                </h4>
                                                            </div>

                                                            <div class="row mb-3">
                                                                <div class="col-12 text-center">
                                                                    <a onClick={() => { setCreateNumber(); setActiveData('OTP') }} class="w-auto btn btn-block btn-social btn-facebook modal_button_bg">
                                                                        login with Mobile Otp
                                                                    </a>
                                                                </div>


                                                            </div>

                                                            <hr class="my-4" />

                                                            <div class="text-center mb-2">
                                                                Don't have an account?
                                                                <a class="register-link" onClick={() => { setActiveData('create') }} style={{ cursor: "pointer" }} >
                                                                    Register here
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                {
                                                    activeData === "create" &&
                                                    <>

                                                        <h2 class="title text-center mt-4 modal_heading" >
                                                            Create Account
                                                        </h2>
                                                        <div class="form-box px-3">
                                                            <div class="form-input">
                                                                <span><i class="fa-solid fa-user"></i></span>
                                                                <input type="text" placeholder="Name" tabindex="10" required value={createName} onChange={(e) => { setCreateName(e.target.value) }} />
                                                            </div>
                                                            <div class="form-input">
                                                                <span><i class="bi bi-envelope-fill"></i></span>
                                                                <input type="email" placeholder="Email Address" tabindex="10" required value={createEmail} onChange={(e) => { setCreateEmail(e.target.value) }} />
                                                            </div>
                                                            <div class="form-input">
                                                                <span><i class="fa-solid fa-phone-volume"></i></span>
                                                                <input type="tel" name="" placeholder="Mobile Number" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12" tabindex="10" required
                                                                    value={createNumber} onChange={(e) => {
                                                                        const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                                        setCreateNumber(onlyNumbers);
                                                                    }}

                                                                />
                                                            </div>
                                                            <div class="form-input">
                                                                <span><i class="fa fa-key"></i></span>
                                                                <input type="password" name="" placeholder="Password" required value={createPassword} onChange={(e) => { setCreatePassword(e.target.value) }} />
                                                            </div>
                                                            <div class="form-input">
                                                                <span><i class="fa-regular fa-circle-check"></i></span>
                                                                <input type="password" name="" placeholder="Confirm Password" required value={createConPassword} onChange={(e) => { setCreateConPassword(e.target.value) }} />
                                                            </div>



                                                            <div class="mb-3">
                                                                <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={() => { CreateAccount() }}>
                                                                    Submit
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </>
                                                }
                                                {
                                                    activeData === "forgot" &&
                                                    <>

                                                        <h2 class="title text-center mt-4 modal_heading" >
                                                            Forgot Password
                                                        </h2>
                                                        <div class="form-box px-3">
                                                            <div class="form-input">
                                                                <span><i class="fa-regular fa-envelope"></i></span>
                                                                <input type="text" placeholder="Email Address" tabindex="10" required value={email}
                                                                    onChange={(e) => { setEmail(e.target.value) }}
                                                                />
                                                            </div>
                                                            <div class="form-input">
                                                                <span><i class="fa fa-key"></i></span>
                                                                <input type="password" name="" placeholder=" New Password" required value={createPassword} onChange={(e) => { setCreatePassword(e.target.value) }} />
                                                            </div>
                                                            <div class="form-input">
                                                                <span><i class="fa-regular fa-circle-check"></i></span>
                                                                <input type="password" name="" placeholder="Confirm Password" required value={createConPassword} onChange={(e) => { setCreateConPassword(e.target.value) }} />
                                                            </div>



                                                            <div class="mb-3">
                                                                <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={() => { ForgotPassword() }}>
                                                                    Submit
                                                                </button>
                                                            </div>


                                                        </div>
                                                    </>
                                                }
                                                {
                                                    activeData === "OTP" &&
                                                    <>

                                                        <h2 class="title text-center mt-4 modal_heading" >
                                                            Login With Otp
                                                        </h2>
                                                        <div class="form-box px-3">
                                                            <div class="form-input">
                                                                <span><i class="fa-solid fa-phone-volume"></i></span>
                                                                <input type="tel" name="" placeholder="Mobile Number" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12" required value={createNumber} onChange={(e) => {
                                                                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                                    setCreateNumber(onlyNumbers);
                                                                }} />
                                                            </div>




                                                            <div class="mb-3">
                                                                <button type="submit" class="btn btn-block text-uppercase modal_button_bg" >
                                                                    Send otp
                                                                </button>
                                                            </div>


                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </>
                )}

                <Header setModalActive={setModalActive} setActiveData={setActiveData} login={login} />
                <Slider />
                <Services />
                <OurWorkflow />
                <AboutUs />
                <WhyVyapar />
                <Review />
                <TestiMonials />
                <ContactUs />
                <Footer />
                <ToastContainer />
            </div>
        </>
    );
};

export default Home;
