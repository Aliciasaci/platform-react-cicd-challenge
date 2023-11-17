import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
export default function Login() {
    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-200 login">
            <div className=" flex justify-center items-center w-1/3 h-3/5 bg-white rounded-xl">
                <div>
                <p class="capitalize text-zinc-900 text-2xl text-center font-bold mb-8 w-96" >SE CONNECTER</p>
                    <div className="form-group mb-5">
                        <div className="block flex justify-start mb-2">
                            <Label htmlFor="base" className='text-xl text-center font-bold' value="Email " />
                        </div>
                        <TextInput id="base" type="text" placeholder="Addresse email" sizing="md" name="email" />
                    </div>
                    <div className="form-group mb-5">
                        <div className="block flex justify-start mb-2">
                            <Label htmlFor="base" className='text-xl text-center font-bold' value="Mot de passe" />
                        </div>
                        <TextInput id="base" type="password" placeholder="*******" sizing="md" name="password" />
                    </div>
                    <Button className="bg-black uppercase w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                        Se connecter
                    </Button>
                </div>
            </div>
        </div>
    )
}