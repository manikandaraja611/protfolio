from flask import Flask, render_template, request, redirect, url_for, jsonify, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-this'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.String(300))
    author = db.Column(db.String(100), default='Admin')
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    published = db.Column(db.Boolean, default=True)
    tags = db.Column(db.String(200))  # comma-separated tags

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)

# Routes
@app.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    posts = BlogPost.query.filter_by(published=True).order_by(BlogPost.created_date.desc()).paginate(page=page, per_page=6)
    return render_template('index.html', posts=posts)

@app.route('/post/<int:post_id>')
def post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return render_template('post.html', post=post)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# API Routes
@app.route('/api/posts', methods=['GET'])
def get_posts():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    posts = BlogPost.query.filter_by(published=True).order_by(BlogPost.created_date.desc()).paginate(page=page, per_page=per_page)

    return jsonify({
        'posts': [{
            'id': post.id,
            'title': post.title,
            'excerpt': post.excerpt,
            'author': post.author,
            'created_date': post.created_date.isoformat(),
            'tags': post.tags.split(',') if post.tags else []
        } for post in posts.items],
        'total': posts.total,
        'pages': posts.pages,
        'current_page': posts.page
    })

@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return jsonify({
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'author': post.author,
        'created_date': post.created_date.isoformat(),
        'updated_date': post.updated_date.isoformat(),
        'tags': post.tags.split(',') if post.tags else []
    })

@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.get_json()

    if not data or not data.get('title') or not data.get('content'):
        return jsonify({'error': 'Title and content are required'}), 400

    post = BlogPost(
        title=data['title'],
        content=data['content'],
        excerpt=data.get('excerpt', data['content'][:200] + '...'),
        author=data.get('author', 'Admin'),
        tags=','.join(data.get('tags', []))
    )

    db.session.add(post)
    db.session.commit()

    return jsonify({
        'id': post.id,
        'message': 'Post created successfully'
    }), 201

@app.route('/api/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    data = request.get_json()

    if 'title' in data:
        post.title = data['title']
    if 'content' in data:
        post.content = data['content']
    if 'excerpt' in data:
        post.excerpt = data['excerpt']
    if 'author' in data:
        post.author = data['author']
    if 'tags' in data:
        post.tags = ','.join(data['tags'])
    if 'published' in data:
        post.published = data['published']

    db.session.commit()

    return jsonify({'message': 'Post updated successfully'})

@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()

    return jsonify({'message': 'Post deleted successfully'})

# Admin routes (basic)
@app.route('/admin')
def admin():
    posts = BlogPost.query.order_by(BlogPost.created_date.desc()).all()
    return render_template('admin.html', posts=posts)

@app.route('/admin/post/new', methods=['GET', 'POST'])
def new_post():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        excerpt = request.form.get('excerpt', content[:200] + '...')
        tags = request.form.get('tags', '')

        post = BlogPost(
            title=title,
            content=content,
            excerpt=excerpt,
            tags=tags
        )

        db.session.add(post)
        db.session.commit()

        flash('Post created successfully!')
        return redirect(url_for('admin'))

    return render_template('edit_post.html', post=None)

@app.route('/admin/post/<int:post_id>/edit', methods=['GET', 'POST'])
def edit_post(post_id):
    post = BlogPost.query.get_or_404(post_id)

    if request.method == 'POST':
        post.title = request.form['title']
        post.content = request.form['content']
        post.excerpt = request.form.get('excerpt', post.content[:200] + '...')
        post.tags = request.form.get('tags', '')

        db.session.commit()

        flash('Post updated successfully!')
        return redirect(url_for('admin'))

    return render_template('edit_post.html', post=post)

@app.route('/admin/post/<int:post_id>/delete')
def delete_post_admin(post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()

    flash('Post deleted successfully!')
    return redirect(url_for('admin'))

@app.route("/api/contact", methods=["POST"])
def api_contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not all([name, email, message]):
        return jsonify({"success": False, "message": "All fields are required"}), 400

    # In a real application, you'd send an email here
    # For now, just log it
    print(f"Contact form submission: {name} ({email}) - {message}")

    return jsonify({"success": True, "message": f"Thanks {name}! We'll get back to you soon."})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)