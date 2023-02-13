import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { config } from 'dotenv';
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
config();
const uri = process.env.DB_URI;
console.log(uri);
mongoose.connect(uri,
).then(()=>{console.log("DB CONNECTION ON")}).catch((err:any) => console.log("CONNECTION FAILED "+err));

interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

//Get Users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    let posts: [User] = result.data;

    const user = new userModel(posts[0]);
    try {
      await user.save();
    } catch (error) {
      console.log("ERROR WHILE SAVING"+error);
    }
    return res.status(200).json({
        message: posts
    });
};

// Update Users
const updateUsers = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let name: string = req.body.name ?? null;
    let username: string = req.body.username ?? null;
    let email: string = req.body.email ?? null;
    let address: string = req.body.address ?? null;
    let phone: string = req.body.phone ?? null;
    let website: string = req.body.website ?? null;
    let company: string = req.body.company ?? null;
  
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        ...(name && { name }),
        ...(username && { username }),
        ...(email && { email }),
        ...(address && { address }),
        ...(phone && { phone }),
        ...(website && { website }),
        ...(company && { company }),
    });
    
    return res.status(200).json({
        message: response.data
    });
};

// deleting a User
const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
    
    let id: string = req.params.id;
   
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
   
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a User
const addUsers = async (req: Request, res: Response, next: NextFunction) => {
    
    let name: string = req.body.name ?? null;
    let username: string = req.body.username ?? null;
    let email: string = req.body.email ?? null;
    let address: string = req.body.address ?? null;
    let phone: string = req.body.phone ?? null;
    let website: string = req.body.website ?? null;
    let company: string = req.body.company ?? null;
  
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/users`, {
        name,
        username,
        email,
        address,
        phone,
        website,
        company
    });

    return res.status(200).json({
        message: response.data
    });
};

export default { getUsers, updateUsers, deleteUsers, addUsers };
