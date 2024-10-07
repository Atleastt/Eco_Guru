import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {validate} from "../validation/validation.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.users.count({
        where: {
            username: user.username,
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.users.create({
        data: user,
        select: {
            username: true,
            phone: true
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.users.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = uuid().toString()
    return prismaClient.users.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
}

const logout = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.users.findUnique({
        where: {
            username: username
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.users.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}

const get = async (username) => {
  
    const user = await prismaClient.users.findMany({
      select: {
        username: true,
        phone: true
      }
    });

    return user;
}

const update = async (username,request) => {
    const user = validate(updateUserValidation, request);
    console.log(user.username);
    const totalUserInDatabase = await prismaClient.users.count({
        where: {
            username: username
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "user is not found");
    }

    const data = {};
    if (user.username) {
        data.username = user.username;
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }
    if (user.phone) {
        data.phone = user.phone;
    }
    console.log(data);
    return prismaClient.users.update({
        where: {
            username: username
        },
        data: data,
        select: {
            username: true,
            phone: true
        }
    })
}

const getCurrent = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.users.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            phone: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
}


export default {
    get,
    login,
    register,
    logout,
    update,
    getCurrent
}