import React, { useState } from 'react';
import EditProfileForm from '../Components/EditProfileForm';
import { useNavigate } from 'react-router-dom';

function EditProfilePage({ user, setUser }) {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
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
      user={user}
      profileData={profileData}
    />
  );
}

export default EditProfilePage;
