import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.models.js';
import apiResponse from '../utils/apiResponse.js';
import uploadonCloudinary from '../utils/cloudinary.js';    


const registerUser = asyncHandler(async (req, res) => {
    const {fullName, username, password, email } = req.body;
    if([fullName, username, password, email].some(field => field?.trim() === '')) {
        throw new ApiError(400,'All fields are required');
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new ApiError(409, 'Username or email already exists');
    }
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    let coverImageLocalPath ;
    if(req.files&&Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    if(!avatarLocalPath){
        throw new ApiError(400, 'Avatar is required');
    }
    const avatar = await uploadonCloudinary(avatarLocalPath);
    const coverImage = await uploadonCloudinary(coverImageLocalPath) ;
    if (!avatar) {
        throw new ApiError(400, 'avatar file is required');
    }
    const user = await User.create({
        fullName,
        username,
        password,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    });
    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if(!createdUser) {
        throw new ApiError(500, 'User not created');
    }
    return res.status(201).json(new apiResponse(201, 'User created successfully'));
});

export { registerUser };