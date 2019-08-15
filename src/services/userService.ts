import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Observable } from 'rxjs';
import { UserRegisterDAO, UserDTO } from "../repository/userRepository";
import { User } from "../models/userModel";
import { MongoModelToViewModel } from '../util/modelCopy';

export function getUserInfo(email: string): Observable<UserDTO> {
    return new Observable(observer => {
        User.findOne({ email: email })
            .then(user => {
                if (user === null) {
                    observer.error('can not find a user');
                }
                let userDTO: UserDTO = new UserDTO();
                MongoModelToViewModel(user, userDTO, (err: any, result: UserDTO) => {
                    if (err) {
                        observer.error(err);
                    }
                    observer.next(result);
                })
            })
            .catch(err => {
                observer.error(err);
            })
    });
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
                password: hash,
                picture: getAvatar(model.email)
            })
            newUser.save()
                .then(() => {
                    observer.next(true);
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


function getAvatar(email: string, size: number = 200): string {
    const md5 = crypto.createHash("md5").update(email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
}
