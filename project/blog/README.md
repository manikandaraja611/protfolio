# Python Blog Application

A modern, full-stack blog application built with Flask, SQLAlchemy, and vanilla JavaScript.

## Features

- **Dynamic Blog Posts**: Create, read, update, and delete blog posts
- **RESTful API**: Complete API for blog operations
- **Admin Panel**: Web interface for managing posts
- **Responsive Design**: Modern, mobile-friendly UI
- **SQLite Database**: Lightweight database for data persistence
- **Rich Text Content**: Support for HTML content in posts
- **Tagging System**: Organize posts with tags
- **Contact Form**: Functional contact form with API integration

## Tech Stack

- **Backend**: Python Flask
- **Database**: SQLite with SQLAlchemy ORM
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom responsive CSS
- **API**: RESTful JSON API

## Project Structure

```
blog/
├── app.py                 # Main Flask application
├── populate_db.py         # Database seeding script
├── requirements.txt       # Python dependencies
├── blog.db               # SQLite database (created automatically)
├── templates/            # Jinja2 templates
│   ├── base.html
│   ├── index.html
│   ├── post.html
│   ├── about.html
│   ├── contact.html
│   ├── admin.html
│   └── edit_post.html
└── static/               # Static assets
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Initialize Database**:
   ```bash
   python populate_db.py
   ```

3. **Run the Application**:
   ```bash
   python app.py
   ```

4. **Access the Blog**:
   - Blog: http://localhost:5001
   - Admin Panel: http://localhost:5001/admin

## API Endpoints

### Blog Posts
- `GET /api/posts` - List all published posts
- `GET /api/posts/<id>` - Get specific post
- `POST /api/posts` - Create new post
- `PUT /api/posts/<id>` - Update post
- `DELETE /api/posts/<id>` - Delete post

### Contact
- `POST /api/contact` - Submit contact form

## Database Schema

### BlogPost Model
- `id`: Primary key
- `title`: Post title
- `content`: Full post content (HTML)
- `excerpt`: Short summary
- `author`: Post author
- `created_date`: Publication date
- `updated_date`: Last modified date
- `published`: Publication status
- `tags`: Comma-separated tags

## Usage

### Viewing Posts
- Visit the homepage to see all published posts
- Click on any post title to read the full content
- Use pagination to navigate through multiple pages

### Admin Panel
- Access `/admin` to manage posts
- Create new posts with the "New Post" button
- Edit existing posts by clicking "Edit"
- Delete posts with the "Delete" button

### API Usage
The API can be used by external applications or for AJAX requests:

```javascript
// Get all posts
fetch('/api/posts')
  .then(response => response.json())
  .then(data => console.log(data));

// Create a new post
fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Post',
    content: '<p>Post content</p>',
    tags: ['tag1', 'tag2']
  })
});
```

## Development

### Adding New Features
1. Update the database models in `app.py` if needed
2. Add new routes for functionality
3. Create corresponding templates
4. Update the API endpoints
5. Add CSS styling and JavaScript as required

### Database Migrations
When changing the database schema:
1. Update the model classes
2. Delete the existing `blog.db` file
3. Run `python app.py` to recreate tables
4. Run `python populate_db.py` to add sample data

## Deployment

For production deployment:
1. Set `app.config['SECRET_KEY']` to a secure random value
2. Use a production WSGI server (gunicorn, uwsgi)
3. Consider using PostgreSQL instead of SQLite
4. Set `app.config['DEBUG'] = False`
5. Configure proper logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.</content>
<parameter name="filePath">c:\Users\mmani\Documents\protfolio\project\blog\README.md