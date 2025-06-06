import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Adduser() {

    const [state, setState] = useState('');
    const [districts, setDistricts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        phone: '',
        dob: '',
        profileImage: null,
        country: 'Nepal',
        state: '',
        district: '',
        street: '',
    });
    const [errors, setErrors] = useState({});

    const states = [
        { value: 'Koshi', label: 'KOSHI' },
        { value: 'Madheshpradesh', label: 'MADESH PRADESH' },
        { value: 'Bagmati', label: 'BAGMATI' },
        { value: 'Gandaki', label: 'GANDAKI' },
        { value: 'Lumbini', label: 'LUMBINI' },
        { value: 'Karnali', label: 'KARNALI' },
        { value: 'Sudurpaschim', label: 'SUDURPASCHIM' },
    ];

    const districtOptions = {
        Koshi: [
            'Taplejung',
            'Terhrathum',
            'Panchthar',
            'Sankhuwasabha',
            'Solukhumbu',
            'Bhojpur',
            'Khotang',
            'Illam',
            'Udayapur',
            'Okhaldhunga',
            'Jhapa',
            'Dhankuta',
            'Morang',
            'Sunsari',
        ],
        Madheshpradesh: [
            'Parsa',
            'Bara',
            'Rautahat',
            'Sarlahi',
            'Mahottari',
            'Dhanusha',
            'Siraha',
            'Saptari',
        ],
        Bagmati: [
            'Kathmandu',
            'Lalitpur',
            'Bhaktapur',
            'Kavre',
            'Sindupalchowk',
            'Dolakha',
            'Dhading',
            'Nuwakot',
            'Makwanpur',
            'Rasuwa',
            'Ramechhap',
            'Chitwan',
            'Sindhuli',
        ],
        Gandaki: [
            'Kaski',
            'Gorkha',
            'Nawalpur',
            'Parbhat',
            'Tanahu',
            'Baglung',
            'Myagdi',
            'Lamjung',
            'Syangja',
            'Manang',
            'Mustang',
        ],
        Lumbini: [
            'Parasi',
            'Dang',
            'Gulmi',
            'Kapilvastu',
            'Arghakachi',
            'Palpa',
            'Rukum East',
            'Pyuthan',
            'Banke',
            'Bardiya',
            'Rupandehi',
            'Rolpa',
        ],
        Karnali: [
            'Rukum West',
            'Mugu',
            'Dailekh',
            'Dolpa',
            'Jumla',
            'Jajarkot',
            'Kalikot',
            'Salyan',
            'Surkhet',
            'Humla',
        ],
        Sudurpaschim: [
            'Kailali',
            'Kanchanpur',
            'Achham',
            'Dadeldhura',
            'Doti',
            'Darchula',
            'Bajhang',
            'Bajura',
            'Baitadi',
        ],
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setState(selectedState);
        setDistricts(districtOptions[selectedState] || []);
        setFormData({ ...formData, state: selectedState, district: '' });
        setErrors((prevErrors) => ({ ...prevErrors, state: '' }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
        setErrors({ ...errors, profileImage: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product Name is required';
            isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.proName = 'Product Name must contain only alphabets';
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else {
            if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters long.';
                isValid = false;
            } else if (!/[a-z]/.test(formData.password)) {
                newErrors.password = 'Password must include at least one lowercase letter.';
                isValid = false;
            } else if (!/[A-Z]/.test(formData.password)) {
                newErrors.password = 'Password must include at least one uppercase letter.';
                isValid = false;
            } else if (!/\d/.test(formData.password)) {
                newErrors.password = 'Password must include at least one number.';
                isValid = false;
            } else if (!/[@$!%*?&]/.test(formData.password)) {
                newErrors.password = 'Password must include at least one special character (@$!%*?&).';
                isValid = false;
            }
        }
        if (!formData.cpassword) {
            newErrors.cpassword = 'Confirm password is required';
            isValid = false;
        } else if (formData.password !== formData.cpassword) {
            newErrors.cpassword = 'Passwords do not match';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^98\d{8}$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number format. Must start with 98 and be 10 digits.';
            isValid = false;
        }
        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
            isValid = false;
        } else {
            const selectedDate = new Date(formData.dob);
            const today = new Date();
            if (selectedDate >= today) {
                newErrors.dob = 'Date of birth must be less than today.';
                isValid = false;
            }
        }
        if (!formData.profileImage) {
            newErrors.profileImage = 'Profile image is required';
            isValid = false;
        } else if (
            !['image/jpeg', 'image/jpg', 'image/png'].includes(formData.profileImage.type)
        ) {
            newErrors.profileImage = 'Invalid file type. Only JPG, JPEG, and PNG are allowed.';
            isValid = false;
        } else if (formData.profileImage.size > 5 * 1024 * 1024) {
            newErrors.profileImage = 'File size must be less than 5MB.';
            isValid = false;
        }

        if (!formData.state) {
            newErrors.state = 'State is required';
            isValid = false;
        }

        if (!formData.district) {
            newErrors.district = 'District is required';
            isValid = false;
        }

        if (!formData.street) {
            newErrors.street = 'Street is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const PasswordVisibility = () => {
        const field1 = document.getElementById('password');
        const x = document.getElementById('eye1');
        const y = document.getElementById('slash1');
        if (field1.type === "password") {
            field1.type = "text";
            x.style.display = 'none';
            y.style.display = 'block';
        } else {
            field1.type = "password";
            x.style.display = 'block';
            y.style.display = 'none';
        }
    };

    const PasswordVisibility2 = () => {
        const field2 = document.getElementById('cpassword');
        const a = document.getElementById('eye2');
        const b = document.getElementById('slash2');
        if (field2.type === "password") {
            field2.type = "text";
            a.style.display = 'none';
            b.style.display = 'block';
        } else {
            field2.type = "password";
            a.style.display = 'block';
            b.style.display = 'none';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            axios
                .post('http://localhost:3000/signup', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    alert('User added Successful');
                })
                .catch((err) => {
                    alert('Failed to add user. Please try again.');
                    console.log(err);
                });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-2">
                <div className="mb-4">
                    <p className="flex text-center w-full items-center justify-center py-2 text-xl">
                        Add User
                    </p>
                    <label htmlFor="name" className="block text-sm font-medium">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        maxLength="10"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your number"
                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-transparent mt-1 rounded-md shadow-sm relative">
                        <input id="password" name="password" type="password" placeholder="*********" onChange={handleChange} value={formData.password}
                            className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 transition duration-150 ease-in-out" />
                        <i onClick={() => PasswordVisibility('password1')} id="eye1" className="fa-regular fa-eye-slash text-[13px] text-gray-500 absolute right-2 top-4 hidden cursor-pointer"></i>
                        <i onClick={() => PasswordVisibility('password1')} id="slash1" className="fa-regular fa-eye text-[13px] text-gray-500 h-4 absolute right-2 top-4 cursor-pointer"></i>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium">
                        Confirm Password
                    </label>
                    <div className="mt-1 rounded-md shadow-sm bg-transparent relative">
                        <input id="cpassword" name="cpassword" type="password" placeholder="*********" onChange={handleChange} value={formData.cpassword}
                            className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 transition duration-150 ease-in-out" />
                        <i onClick={() => PasswordVisibility2('password2')} id="eye2" className="fa-regular fa-eye-slash text-[13px] text-gray-500 absolute right-2 top-4 hidden cursor-pointer"></i>
                        <i onClick={() => PasswordVisibility2('password2')} id="slash2" className="fa-regular fa-eye text-[13px] text-gray-500 h-4 absolute right-2 top-4 cursor-pointer"></i>
                    </div>
                    {errors.cpassword && <p className="mt-1 text-sm text-red-500">{errors.cpassword}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-sm font-medium">
                        Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    />
                    {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="profileImage" className="block text-sm font-medium">
                        Profile Image <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={handleFileChange}
                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    />
                    {errors.profileImage && <p className="mt-1 text-sm text-red-500">{errors.profileImage}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Country</label>
                    <input
                        type="text"
                        value="Nepal"
                        name="country"
                        disabled
                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    />
                    <input type="hidden" name="country" value="Nepal" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="state">
                        State <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    >
                        <option value="">-Choose state-</option>
                        {states.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="district">
                        District <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="district"
                        id="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    >
                        <option value="">-Choose district-</option>
                        {districts.map((d, index) => (
                            <option key={index} value={d.toLowerCase()}>
                                {d}
                            </option>
                        ))}
                    </select>
                    {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="street" className="block text-sm font-medium">
                        Village/street <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Enter your village"
                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    />
                    {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
                </div>
                <div className="w-full xl:flex xl:justify-end xl:px-4">
                    <button
                        type="submit"
                        className="px-2 py-1 bg-black text-white cursor-pointer rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

export default Adduser
