import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../Centimeter/Button/Button';
import Input from '../../Centimeter/Input/Input';
import { PATH_NAME } from '../../Configs/PathName';
import AuthService from '../../Service/AuthService';
import { toast } from 'react-hot-toast';

function PostEditor() {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const isEditing = location.state?.isEditing;

    useEffect(() => {
        if (isEditing) {
            const id = location.state?.id;
            fetchPostDetails(id);
        }
    }, [isEditing]);

    const fetchPostDetails = async (postId) => {
        const postDetails = await AuthService.getPostById(postId);
        const response = await postDetails.json();
        if (postDetails.status === 200) {
            setFormData(response);
        } else {
            toast.error(response.message);
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateAndSubmit();
    };

    const validateAndSubmit = () => {
        const errors = {};

        if (!formData.id) {
            errors.idError = 'Id is required';
        }

        if (!formData.title || formData.title.trim().length === 0) {
            errors.titleError = 'Title is required';
        }

        if (!formData.description || formData.description.trim().length === 0) {
            errors.descriptionError = 'Description is required';
        }

        setFormError(errors);

        if (Object.keys(errors).length === 0) {
            handlePostSubmission(formData);
        }
    };

    const handlePostSubmission = async (postObj) => {
        if (isEditing) {
            const updatePost = await AuthService.updatePost(postObj);
            const response = await updatePost.json();
            if (updatePost.status === 200) {
                toast.success('Post updated successfully');
                navigate(PATH_NAME.POST_LIST);
                setFormData({});
                setFormError({});

            } else {
                toast.error(response.message);
            }
        } else {
            const addPost = await AuthService.addPost(postObj);
            const response = await addPost.json();
            if (addPost.status === 201) {
                toast.success('Post added successfully');
                navigate(PATH_NAME.POST_LIST);
                setFormData({});
                setFormError({});

            } else {
                toast.error(response.message);
            }
        }

    };

    return (
        <div className='h-screen flex justify-content-between align-items-center'>
            <form className='input-container flex-column flex m-auto justify-content-center box-shadow-light'>
                <h2 className='text-center line-in-text'>
                    {isEditing ? 'Edit Post' : 'Add Post'}
                </h2>

                <div className='mb-3'>
                    <Input
                        title='Enter Id'
                        name='id'
                        type='number'
                        onChange={handleChange}
                        value={formData.id || ''}
                    />
                    {formError.idError && <p className='text-red'>{formError.idError}</p>}
                </div>

                <div className='mb-3'>
                    <Input
                        title='Enter Title'
                        name='title'
                        onChange={handleChange}
                        value={formData.title || ''}
                    />
                    {formError.titleError && (
                        <p className='text-red'>{formError.titleError}</p>
                    )}
                </div>

                <div className='mb-3'>
                    <Input
                        title='Enter Description'
                        name='description'
                        onChange={handleChange}
                        value={formData.description || ''}
                    />
                    {formError.descriptionError && (
                        <p className='text-red'>{formError.descriptionError}</p>
                    )}
                </div>

                <Button className='btn btn-black' type='submit' onClick={handleSubmit}>
                    {isEditing ? 'Update Post' : 'Add Post'}
                </Button>

                <div className='text-center mt-3'>
                    <Link to={PATH_NAME.POST_LIST}>← Back to Post List</Link>
                </div>
            </form>
        </div>
    );
}

export default PostEditor;
