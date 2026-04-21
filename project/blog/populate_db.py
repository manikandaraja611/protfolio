from app import app, db, BlogPost

def populate_sample_data():
    with app.app_context():
        # Create all tables
        db.create_all()

        # Check if data already exists
        if BlogPost.query.count() > 0:
            print("Sample data already exists. Skipping...")
            return

        # Sample blog posts
        sample_posts = [
            {
                'title': 'Welcome to My Blog',
                'content': '''
<h2>Getting Started</h2>
<p>Welcome to my personal blog! This is the first post on this platform. I'm excited to share my thoughts, experiences, and insights with you.</p>

<h3>What to Expect</h3>
<p>On this blog, you'll find:</p>
<ul>
<li>Technical tutorials and guides</li>
<li>Personal development insights</li>
<li>Technology trends and reviews</li>
<li>Code snippets and best practices</li>
<li>My journey as a developer</li>
</ul>

<h2>Why I Started This Blog</h2>
<p>Writing has always been a passion of mine. It helps me organize my thoughts, learn new concepts deeply, and connect with like-minded people. In the fast-paced world of technology, blogging provides a space for thoughtful reflection and knowledge sharing.</p>

<p>Thank you for visiting! Feel free to explore the other sections of the site and reach out if you have any questions or suggestions.</p>
                ''',
                'excerpt': 'Welcome to my personal blog! This is the first post on this platform where I share my thoughts, experiences, and insights.',
                'author': 'Admin',
                'tags': 'introduction,welcome,blogging',
                'published': True
            },
            {
                'title': 'Building Modern Web Applications with Flask',
                'content': '''
<h2>Introduction to Flask</h2>
<p>Flask is a lightweight WSGI web application framework in Python. It's designed to make getting started quick and easy, with the ability to scale up to complex applications.</p>

<h3>Why Choose Flask?</h3>
<p>Flask offers several advantages:</p>
<ul>
<li><strong>Minimalist Design:</strong> Flask provides the essentials without unnecessary bloat</li>
<li><strong>Flexible:</strong> You can structure your application however you want</li>
<li><strong>Extensible:</strong> Rich ecosystem of extensions for additional functionality</li>
<li><strong>Pythonic:</strong> Follows Python conventions and best practices</li>
</ul>

<h2>Getting Started</h2>
<p>Installing Flask is simple:</p>
<pre><code>pip install flask</code></pre>

<p>Here's a basic Flask application:</p>
<pre><code>from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()</code></pre>

<h3>Database Integration</h3>
<p>For this blog, we're using Flask-SQLAlchemy for database operations. It provides a high-level ORM for working with databases in Python.</p>

<p>The key components include:</p>
<ul>
<li>Models for data structures</li>
<li>Migrations for schema changes</li>
<li>Querying and relationships</li>
</ul>

<h2>Conclusion</h2>
<p>Flask is an excellent choice for building web applications, especially when you want control over your stack and prefer Python. This blog itself is built with Flask, demonstrating its capabilities for real-world applications.</p>
                ''',
                'excerpt': 'Learn about Flask, a lightweight Python web framework, and how to build modern web applications with it.',
                'author': 'Admin',
                'tags': 'flask,python,web-development,tutorial',
                'published': True
            },
            {
                'title': 'The Importance of Clean Code',
                'content': '''
<h2>What is Clean Code?</h2>
<p>Clean code is code that is easy to read, understand, and maintain. It's not just about making code work – it's about making code that other developers (including your future self) can easily comprehend and modify.</p>

<h3>Principles of Clean Code</h3>
<p>Robert C. Martin (Uncle Bob) outlines several principles in his book "Clean Code":</p>

<h4>Meaningful Names</h4>
<p>Variable and function names should clearly express their purpose. Avoid abbreviations and single-letter names unless they're universally understood (like i for loop counters).</p>

<h4>Functions Should Do One Thing</h4>
<p>Each function should have a single responsibility. If a function does multiple things, it should be broken down into smaller, focused functions.</p>

<h4>DRY Principle</h4>
<p>Don't Repeat Yourself. If you find yourself writing the same code in multiple places, extract it into a reusable function or class.</p>

<h4>Comments Should Explain Why, Not What</h4>
<p>Good code is self-documenting. Comments should explain the reasoning behind complex logic, not what the code is doing.</p>

<h2>Benefits of Clean Code</h2>
<ul>
<li><strong>Easier Maintenance:</strong> Bugs are easier to find and fix</li>
<li><strong>Faster Development:</strong> New features can be added more quickly</li>
<li><strong>Better Collaboration:</strong> Team members can understand and contribute to the codebase</li>
<li><strong>Reduced Technical Debt:</strong> Less time spent fixing avoidable issues</li>
</ul>

<h3>Practical Tips</h3>
<ol>
<li>Use consistent formatting and style</li>
<li>Write tests for your code</li>
<li>Refactor regularly</li>
<li>Code review with peers</li>
<li>Use linters and formatters</li>
</ol>

<h2>Conclusion</h2>
<p>Writing clean code is a skill that improves with practice. It's not just about following rules – it's about developing a mindset of craftsmanship and attention to detail. The time invested in writing clean code pays dividends throughout the lifecycle of a project.</p>
                ''',
                'excerpt': 'Explore the principles and benefits of writing clean, maintainable code that other developers can easily understand and work with.',
                'author': 'Admin',
                'tags': 'clean-code,best-practices,programming,development',
                'published': True
            },
            {
                'title': 'REST API Design Best Practices',
                'content': '''
<h2>Understanding REST APIs</h2>
<p>REST (Representational State Transfer) is an architectural style for designing networked applications. REST APIs use HTTP methods to perform operations on resources, making them intuitive and scalable.</p>

<h3>Key HTTP Methods</h3>
<ul>
<li><strong>GET:</strong> Retrieve data from a resource</li>
<li><strong>POST:</strong> Create a new resource</li>
<li><strong>PUT:</strong> Update an existing resource completely</li>
<li><strong>PATCH:</strong> Update part of an existing resource</li>
<li><strong>DELETE:</strong> Remove a resource</li>
</ul>

<h2>RESTful Design Principles</h2>

<h3>1. Use Nouns for Resource Names</h3>
<p>Resources should be nouns, not verbs. Use plural forms for consistency:</p>
<pre><code>✅ GET /api/posts
✅ POST /api/posts
❌ GET /api/getPosts
❌ POST /api/createPost</code></pre>

<h3>2. Use HTTP Status Codes Appropriately</h3>
<ul>
<li><strong>200 OK:</strong> Successful request</li>
<li><strong>201 Created:</strong> Resource successfully created</li>
<li><strong>400 Bad Request:</strong> Invalid request data</li>
<li><strong>401 Unauthorized:</strong> Authentication required</li>
<li><strong>404 Not Found:</strong> Resource doesn't exist</li>
<li><strong>500 Internal Server Error:</strong> Server error</li>
</ul>

<h3>3. Version Your API</h3>
<p>Include version numbers in your API paths to maintain backward compatibility:</p>
<pre><code>/api/v1/posts
/api/v2/posts</code></pre>

<h3>4. Use Consistent JSON Structure</h3>
<p>Standardize your response format:</p>
<pre><code>{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "errors": []
}</code></pre>

<h2>Practical Implementation</h2>
<p>This blog's API follows these principles. You can explore the endpoints:</p>
<ul>
<li><code>GET /api/posts</code> - List all posts</li>
<li><code>GET /api/posts/:id</code> - Get a specific post</li>
<li><code>POST /api/posts</code> - Create a new post</li>
<li><code>PUT /api/posts/:id</code> - Update a post</li>
<li><code>DELETE /api/posts/:id</code> - Delete a post</li>
</ul>

<h3>Error Handling</h3>
<p>Proper error handling is crucial for API usability. Always return meaningful error messages and appropriate status codes.</p>

<h2>Conclusion</h2>
<p>Following REST API best practices makes your APIs more intuitive, maintainable, and scalable. This blog demonstrates these principles in action, providing a solid foundation for building robust web services.</p>
                ''',
                'excerpt': 'Learn the fundamental principles of designing RESTful APIs with proper HTTP methods, status codes, and resource naming conventions.',
                'author': 'Admin',
                'tags': 'api,rest,web-development,best-practices',
                'published': True
            }
        ]

        # Add sample posts to database
        for post_data in sample_posts:
            post = BlogPost(**post_data)
            db.session.add(post)

        db.session.commit()
        print(f"Added {len(sample_posts)} sample blog posts to the database.")

if __name__ == '__main__':
    populate_sample_data()