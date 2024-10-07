import userService from "../services/user-service.js";


const register = async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
      const result = await userService.get();
      res.status(200).json({
        data: result
      });
    } catch (e) {
      next(e);
    }
}

const update = async (req, res, next) => {
    try {
      const username = req.user.username;
      const request = req.body;
  
      const result = await userService.update(username, request);
      res.status(200).json({
        data: result
      });
    } catch (e) {
      next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.username);
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const getCurrent = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await userService.getCurrent(username);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    get,
    update,
    login,
    register,
    logout,
    getCurrent
}