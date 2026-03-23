import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs'
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    test(){
        return []
    }

    findAll(): IUser[]{
        const rawData = fs.readFileSync("./data/users.json" , 'utf-8');
        const data = JSON.parse(rawData) as IUser[];
        return data;
    }
    findOne(id: string , field?: string){
        const result= {}
        const rawData = fs.readFileSync("./data/users.json" , 'utf-8');
        const data = JSON.parse(rawData) as IUser[]
        let found: IUser | null = null;
        for(const user of data){
            if(user.id === id){
                found = user
                break;
            }
        }
        if(!found){
            throw new NotFoundException(
                {
                    statusCode: 404,
                    message: "User not found",
                    error: "Not Found"
                }
            );
        }

        if(!field){
            return found
        }
        
        const field_s: string[] = field.split(',');
        for(const f of field_s){
            result[f] = found[f]
        }
        return result
    }
    create(dto : CreateUserDto): IUser{
        const rawData = fs.readFileSync('./data/users.json' , 'utf-8');
        const data = JSON.parse(rawData) as IUser[];
        const last_id = data.length
        const createUser = {
            id: String(last_id + 1),
            ...dto
        }
        data.push(createUser);
        fs.writeFileSync('./data/users.json' , JSON.stringify(data , null ,2));
        return createUser;
    }
}
