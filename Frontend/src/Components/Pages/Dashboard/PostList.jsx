import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Button from '../../Centimeter/Button/Button';
import AuthService from '../../Service/AuthService';
import { PATH_NAME } from '../../Configs/PathName';
import { clearSession } from '../../Storage/Storage';
import { toast } from 'react-hot-toast';

function PostList() {
  useEffect(() => {
    loadPostListing();
  }, []);

  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  const loadPostListing = async () => {
    const postList = await AuthService.getPostList();
    const response = await postList.json();
    if (postList.status === 200) {
      setPostList(response);
    } else {
      toast.error(response.message);
    }
  };

  const deletePost = async (id) => {
    const postList = await AuthService.deletePost(id);
    const response = await postList.json();
    if (postList.status === 200) {
      toast.success(response.message);
      loadPostListing();
    } else {
      toast.error(response.message);
    }
  };

  const handleEditClick = (id) => {
    navigate(`${PATH_NAME.EDIT_POST}`, { state: { isEditing: true, id: id } });
  };

  const handleLogout = async () => {
    try {
      await AuthService.getSignout();
      toast.success('Successfully Logout');
      clearSession();
      navigate(PATH_NAME.LOGIN);
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
  }

  return (
    <div>
      <h2 className='text-center'>Post List</h2>
      <div>
        <Button onClick={() => navigate(PATH_NAME.ADD_POST)}>Add Post</Button>
        <Button variant='danger' onClick={handleLogout}>Logout</Button>
      </div>

      <table className='customTable'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {postList?.map((onePost) => (
            <tr key={onePost.id}>
              <td>{onePost.id}</td>
              <td>{onePost.title}</td>
              <td>{onePost.description}</td>
              <td>{onePost.createdDate}</td>
              <td>
                <Button
                  variant='outlined_danger'
                  onClick={() => handleEditClick(onePost.id)}>
                  Edit
                </Button>
                {' '}
                <Button
                  variant='danger'
                  onClick={() => deletePost(onePost.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
