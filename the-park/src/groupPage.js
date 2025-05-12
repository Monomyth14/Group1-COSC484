import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Style/profile.css';
import logo from './Images/logo2.png';
import pawPlaceholder from './Images/pawPlaceholder.png';
import API_BASE_URL from './confi';

function Groups() {
  console.log('group here');
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {

      if (!groupId) {
        alert("No group selected. Redirecting to home page.");
        navigate('/');
        return;
      }try {
        const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}`);
        if (!response.ok) {
          setGroupData(null); 
        } else {
          const data = await response.json();
          setGroupData(data);
        }
      } catch (err) {
        console.error('Failed to fetch group data', err);
        setGroupData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId, navigate]);


  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="sidebar">
        <img src={logo} alt="Logo" />
        <div className="nav">
          <div onClick={() => navigate('/Main')}>🏠 Home</div>
          <div onClick={() => navigate('/About')}>ℹ️ About Us</div>
          <div onClick={() => navigate('/profile')}>👤 My Profile</div>
          <div onClick={() => navigate('/CreatePost')}>📜 Create Post</div>
          <div onClick={() => navigate('/GroupSignup')}>👥 Create Group</div>
          <div onClick={() => navigate('/LostAndFound')}>🔍 Lost and Found</div>
          <div onClick={() => navigate('/PetEvents')}>🎉 Pet Events</div>
        </div>
      </div>

      <div className="main-content">
        {groupData ? (<>
            <div className="profile-header">
              <div className="avatar">
                <img
                  src={groupData.groupProfilePic ? `${API_BASE_URL}/${groupData.groupProfilePic}` : pawPlaceholder}
                  alt="Group Avatar"
                  className="profileAvatar"
                />
              </div>
              <div className="profile-details">
                <h1>Group: {groupData.groupName}</h1>
                <p><strong>Description:</strong> {groupData.description}</p>

                <div className="stats">
                  <div><strong>{groupData.members?.length || 0}</strong><br />members</div>
                </div>
              </div>
            </div>

            <div className="profile-posts">
              <h2>Posts</h2>
              {groupData.groupPosts && groupData.groupPosts.length > 0 ? (
                groupData.groupPosts.map((post, index) => (
                  <div key={index} className="post">
                    <p>{post.content}</p>
                  </div>
                ))
              ) : (
                <div className="post-placeholder">No posts yet. Be the first to post!</div>
              )}
            </div>
          </>
        ) : (
          <div className="no-group">
            <h2>No group found 🐾</h2>
            <p>It looks like this group doesn't exist or was deleted.</p>
            <button onClick={() => navigate('/GroupSignup')}>Create a New Group</button>
          </div>
        )}
      </div>

      <div className="profile-actions">
        <h3>Group Actions</h3>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Groups;