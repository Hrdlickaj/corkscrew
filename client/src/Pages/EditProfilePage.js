import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Center,
  Box,
} from '@chakra-ui/react';
import EditProfileForm from '../Components/EditProfileForm';

function EditProfilePage({ user, setUser }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
    user_id: user.id,
  });

  function handleFormChange(e) {
    setProfileData((profileData) => ({
      ...profileData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handlePatchProfile(e) {
    e.preventDefault();

    const res = await fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (res.ok) {
      res
        .json()
        .then((updatedUser) => {
          setUser(updatedUser);
        })
        .then(navigate('/profile'));
    }
  }

  return (
    <EditProfileForm
      handleFormChange={handleFormChange}
      handlePatchProfile={handlePatchProfile}
      profileData={profileData}
    />
  );
}

export default EditProfilePage;
