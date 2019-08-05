import bcrypt from 'bcrypt';
import { Observable } from 'rxjs';
import mongoose from "mongoose";
import { UserRegisterDAO, UserDTO } from "../repository/userRepository";
import { User } from "../models/userModel";

export async function getUsers(): Promise<any> {
    let userDto: UserDTO[] = [];
    let data: any = await User.find().exec()
    console.log(data);
    data.forEach((e: any) => {
        let userdto: UserDTO = new UserDTO();
        userdto = {
            id: e.id,
            email: e.email,
            name: e.name,
            address: e.address
        };
        userDto.push(userdto);
    })
    console.log(userDto)
    return userDto;
}

export function userRegisterModelValidator(input: any, model: UserRegisterDAO): Observable<any> {
    return new Observable(observer => {
        if (Object.keys(input).length != Object.keys(model).length) {
            observer.error(`model fields is out of range`);
        }
        Object.keys(input).forEach(key => {
            if (!model.hasOwnProperty(key)) {
                observer.error(`${key} is not belong to register model`);
            }
        });
        observer.next(true);
    })
}

export function userRegistration(model: UserRegisterDAO): Observable<any> {
    return new Observable(observer => {
        bcrypt.hash(model.password, 10, function (err, hash) {
            if (err) {
                observer.error('bcrypt error');
            }
            // Store hash in your password DB.
            let newUser = new User({
                name: model.name,
                address: model.address,
                email: model.email,
                password: hash
            })
            newUser.save()
                .then(() => {
                    observer.next(true)
                })
                .catch((err) => {
                    if (err.code == 11000) {
                        observer.error('email already used');
                    }
                    else {
                        observer.error(`${err} : bad happend while we are saving user data`);
                    }
                })
        });
    })
}

