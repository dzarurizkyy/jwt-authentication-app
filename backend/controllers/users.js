import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// GET: All Users
export const getUsers = async(req, res) => {
  try {
    const users = await Users.findAll({
        attributes: ['id', 'name', 'email']
    });
    res.json(users);
  }
  catch (error) {
    console.log(error);
  }
}

// POST: Register
export const register = async(req, res) => {
 const { name, email, password, confirmPassword } = req.body;
 
 if (password !== confirmPassword) {
  return res.status(400)
            .json({message: 'Password and confirmation password not match'});
 }
  
 // Encrypted Password  
 const salt = await bcrypt.genSalt();
 const hashPassword = await bcrypt.hash(password, salt);

 // Insert into users table
 try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword     
    });
    res.json({message: 'Account registration success'})
 }
 catch(error) {
  console.log(error);
 }
}

// POST: Login
export const login = async(req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email
      }
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);

    if(!match) {
      return res.status(400)
                .json({message: 'Wrong password'});
    }

    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;

    const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, { 
      expiresIn: '20s'
    });
    const refreshToken =  jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, { 
      expiresIn: '1d'
    });
    
    // Added refresh token into users table
    await Users.update({refresh_token: refreshToken}, {
      where: {
        id: userId
      }
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({accessToken});
  }
  catch(error) {
    res.status(400)
       .json({message: 'Email was not found!'});
  }
}

// DELETE: Logout
export const logout = async(req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if(!refreshToken) {
    return res.sendStatus(204);
  }

  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken
    }
  });

  if(!user[0]) {
    return res.sendStatus(204);
  }

  const userId = user[0].id;
  await Users.update({refresh_token: null}, {
    where: {
      id: userId
    }
  });
  
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}