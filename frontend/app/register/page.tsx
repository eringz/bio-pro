"use client"

import { useState } from "react";
// import FaceCapture from "@/components/features/FaceCapture";
import { registerUser } from "@/lib/api/face";
import { people } from "@/data";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function RegisterForm() {
    const [form, setForm] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email_address: "",
        contact_number: "",
        role: "",
        face_template: "",
    });

    const [status, setStatus] = useState("");
    const [selected, setSelected] = useState(people[1]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFaceCapture = (faceTemplate: string) => {
        setForm(prev => {
            const updated = {...prev, face_template: faceTemplate};
            console.log(`HandleFaceCapture: ${updated.face_template}`);
            return updated;
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.face_template) {
            setStatus("Please capture your face before submitting");
            alert(status);
            return;
        }
        
        try {
            setStatus("Registering user....");
            const res = await registerUser(form);
            setStatus("Registration successful!");
            console.log("Server response:", res);
            alert(status);
        } catch (err) {
            console.error(err);
            alert(err)
            setStatus("Server error");
        }
    };

    return (  
        <form 
            onSubmit={handleSubmit}
            className="flex justify-between gap-4 p-4 w-full mx-auto"
         >
                     
            <div className="p-8 mt-0 shadow-lg rounded-lg">
                {/* <FaceCapture size={960} onCapture={handleFaceCapture}  /> */}
            </div>
            <div className="flex flex-col gap-10 w-full p-20 max-w-2xl mx-auto rounded-xl  shadow-lg">
                <h1 className="col-span-2 text-3xl font-bold text-center text-[#184239]">Registration Form</h1> 
                <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="p-2 border border-gray-300 rounded " required />
                <input type="text" name="middle_name" placeholder="Middle Name" value={form.middle_name} onChange={handleChange} className="p-2 border border-gray-300 rounded" />
                <input type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
                <input type="email" name="email_address" placeholder="Email Address" value={form.email_address} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
                <input type="tel" name="contact_number" placeholder="Contact Number" value={form.contact_number} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
                <Listbox
                    value={selected}
                    onChange={(person) => {
                        setSelected(person);
                        setForm(prev => ({...prev, role:person.role}) );
                    }}
                >
                    <div className="relative mt-2">
                        <ListboxButton
                            className="grid grid-cols-1 py-1.5 pr-2 pl-3 w-full cursor-default rounded-md bg-white text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
                        >
                            <span
                                className="col-start-1 row-start-1 flex items-center gap-3 pr-6"
                            >
                                <Image alt="selected" src={selected.avatar} width={32} height={32} className="size-8 shrink-0 rounded-full bg-gray-100"/>
                                <span className="">{selected.role.charAt(0).toUpperCase() + selected.role.slice(1)}</span>
                            </span>
                            <ChevronUpDownIcon 
                                aria-hidden="true"
                                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                        </ListboxButton>
                        <ListboxOptions
                            transition
                            className="absolute z-10 py-1 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                        >
                            {people.map((person) => {
                               return (
                                <ListboxOption
                                    key={person.id}
                                    value={person}
                                    className="group relative py-2 pr-9 pl-3 cursor-default text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                >
                                    <div className="flex items-center">
                                        <Image alt={person.role} src={person.avatar} width={32} height={32} className="size-5 shrink-0 rounded-full" />
                                        <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{person.role.charAt(0).toUpperCase() + person.role.slice(1)}</span>
                                    </div>

                                    <span
                                        className="absolute pr-4 inset-y-0 right-0 flex items-center text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white"
                                    >
                                        <CheckIcon
                                            aria-hidden="true"
                                            className="size-5"
                                        />
                                    </span>
                                </ListboxOption>
                               ) 
                            })};
                        </ListboxOptions>
                    </div>
                </Listbox>

                <button 
                    type="submit" 
                    className="w-full px-4 py-2 bg-[#006D5A] text-white rounded-lg shadow"
                >
                    Register User
                </button>
            </div>
        </form>
       
        
    )
    
}