const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    
    const userWithSkills = {
      ...user,
      skills: user.skills ? JSON.parse(user.skills) : []
    };

    res.status(200).json({
      success: true,
      data: { user: userWithSkills }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    if (updateData.skills && Array.isArray(updateData.skills)) {
      updateData.skills = JSON.stringify(updateData.skills);
    }

    const cleanedData = Object.fromEntries(
      Object.entries(updateData).map(([key, value]) => [
        key,
        value === '' ? null : value
      ])
    );

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: cleanedData,
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        skills: true,
        location: true,
        phone: true,
        website: true,
        linkedin: true,
        github: true,
        experience: true,
        education: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const userWithSkills = {
      ...updatedUser,
      skills: updatedUser.skills ? JSON.parse(updatedUser.skills) : []
    };

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: userWithSkills }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};


