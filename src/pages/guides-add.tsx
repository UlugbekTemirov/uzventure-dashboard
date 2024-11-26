import React, { useState } from 'react';
// eslint-disable-next-line
import { collection, addDoc } from 'firebase/firestore';
// eslint-disable-next-line
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from '@mui/material';
import { db } from '../../firebase'; 


const GuidesAddPage = () => {
  // State to collect form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    avatar: '',
    bio: '',
    email: '',
    phoneNumber: '',
    experience: '',
    location: '',
    price: '',
    rating: '',
    isOnline: false,
    isVerified: false,
    services: '',
    languages: '',
    instagram: '',
    telegram: '',
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === 'true',
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const guidesRef = collection(db, 'guides');
      await addDoc(guidesRef, {
        ...formData,
        id: `${formData.name}-${uuidv4()}`,
        age: formData.age,
        price: formData.price,
        rating: formData.rating,
        services: formData.services.split(',').map((item) => item.trim()),
        languages: formData.languages.split(',').map((item) => ({
            name: item.trim(),
            level: 'Advanced'
        })), 
      });
      alert('Guide added successfully!');
      setFormData({
        name: '',
        age: '',
        avatar: '',
        bio: '',
        email: '',
        phoneNumber: '',
        experience: '',
        location: '',
        price: '',
        rating: '',
        isOnline: false,
        isVerified: false,
        services: '',
        languages: '',
        instagram: '',
        telegram: '',
      });
    } catch (error) {
      console.error('Error adding guide:', error);
      alert('Failed to add guide. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Add a New Guide
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2
      }}>
      <TextField
        label="Name"
        name="name"
        fullWidth
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        fullWidth
        value={formData.age}
        onChange={handleInputChange}
      />
      <TextField
        label="Avatar URL"
        name="avatar"
        fullWidth
        value={formData.avatar}
        onChange={handleInputChange}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        fullWidth
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />
      <TextField
        label="Experience"
        name="experience"
        fullWidth
        value={formData.experience}
        onChange={handleInputChange}
      />
      <TextField
        label="Location"
        name="location"
        fullWidth
        value={formData.location}
        onChange={handleInputChange}
      />
      <TextField
        label="Price per Service"
        name="price"
        type="number"
        fullWidth
        value={formData.price}
        onChange={handleInputChange}
      />
      <TextField
        label="Rating"
        name="rating"
        type="number"
        fullWidth
        value={formData.rating}
        onChange={handleInputChange}
      />

      {/* Radio inputs for isOnline */}
      <FormControl>
      <FormLabel component="legend">Is Online</FormLabel>
      <RadioGroup
        name="isOnline"
        value={formData.isOnline.toString()}
        onChange={handleRadioChange}
        row
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No" />
      </RadioGroup>
      </FormControl>

      {/* Radio inputs for isVerified */}
      <FormControl>
      <FormLabel component="legend">Is Verified</FormLabel>
      <RadioGroup
        name="isVerified"
        value={formData.isVerified.toString()}
        onChange={handleRadioChange}
        row
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No" />
      </RadioGroup>
      </FormControl>

      <TextField
        label="Services Offered"
        name="services"
        fullWidth
        placeholder="e.g., hiking tours, city tours"
        value={formData.services}
        onChange={handleInputChange}
      />
      <TextField
        label="Languages Spoken"
        name="languages"
        fullWidth
        placeholder="e.g., English, Russian, German"
        value={formData.languages}
        onChange={handleInputChange}
      />
      <TextField
        label="Instagram Profile"
        name="instagram"
        fullWidth
        value={formData.instagram}
        onChange={handleInputChange}
      />
      <TextField
        label="Telegram Profile"
        name="telegram"
        fullWidth
        value={formData.telegram}
        onChange={handleInputChange}
      />
            <TextField
        label="Bio"
        name="bio"
        fullWidth
        multiline
        rows={4}
        value={formData.bio}
        onChange={handleInputChange}
      />
      </Box>

      <Button variant="contained" size="large" type="submit" sx={{ marginTop: '20px' }}>
        Add Guide
      </Button>
    </Box>
  );
};

export default GuidesAddPage;
