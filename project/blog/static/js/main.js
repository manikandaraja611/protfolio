// Blog JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize any interactive elements
    initializeBlog();
});

function initializeBlog() {
    // Add any initialization code here

    // Example: Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states for forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';
            }
        });
    });
}

// API helper functions
class BlogAPI {
    static async getPosts(page = 1, perPage = 10) {
        try {
            const response = await fetch(`/api/posts?page=${page}&per_page=${perPage}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    static async getPost(postId) {
        try {
            const response = await fetch(`/api/posts/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    }

    static async createPost(postData) {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    static async updatePost(postId, postData) {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to update post');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    }

    static async deletePost(postId) {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function createElement(tag, className = '', textContent = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

// Export for use in other scripts
window.BlogAPI = BlogAPI;
window.formatDate = formatDate;
window.truncateText = truncateText;
window.createElement = createElement;</content>
<parameter name="filePath">c:\Users\mmani\Documents\protfolio\project\blog\static\js\main.js