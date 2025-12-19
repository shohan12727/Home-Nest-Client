import React from 'react';
import useAuth from '../hooks/useAuth';

const AddProperties = () => {
    const {user} = useAuth();
    const userName = user?.displayName;
    const userEmail = user?.email;
    
    return (
        <div>
            add properties 
        </div>
    );
};

export default AddProperties;