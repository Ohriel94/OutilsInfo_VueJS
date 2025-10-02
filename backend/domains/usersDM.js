// This module provides functions to manage users in the system, including creating, retrieving, updating, and deleting users.
// It interacts with the database layer to perform these operations and includes error handling and logging for debugging purposes.

import db from '../databases/usersDB.js';

const debugTag = '[DM_USERS]';

const createUser = async (lastName, firstName, email, phone) => {
    console.log(`${debugTag} Creating a new user...`);
    try {
        const result = await db.create(lastName, firstName, email, phone);
        if (result == 0) {
            console.log(`${debugTag} No user was created.`);
        return result;
        }
    } catch (error) {
        throw error; 
    }
}

const retrieveUsers = async () => {
    console.log(`${debugTag} Demanding all users from DB...`);
    try {
        const users = await db.retrieve();        
        return users;
    } catch (error) {
        console.error(`${debugTag} Error fetching users:`, error.detail);
        throw error;
    }
}

export default {
    createUser,
    retrieveUsers
}
