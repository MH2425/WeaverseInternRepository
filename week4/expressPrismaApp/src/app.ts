import {PrismaClient} from '@prisma/client';
import express, {json} from 'express';

require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(json());


/**
 * USER
 */

// GET BY ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {id : id},
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({error: 'Server error'});
  }
});

// PUT BY ID
app.put('/api/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {email, name, password} = req.body;
    const user = await prisma.user.update({
      where: {id},
      data: {email, name, password},
    });
    res.status(200).json(user);
  } catch(err : any) {
    res.status(500).json({message: err.message});
  }
});

// DELETE BY ID
app.delete('/api/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const user = await prisma.user.findUnique({
      where: {id},
    });

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    await prisma.user.delete({
      where: {id}
    })
    res.status(204).send();
  } catch(err : any) {
    res.status(500).json({message: err.message});
  }
});

/**
 * POST
 */

// GET WITH PAGINATION
app.get('/api/posts', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          category: true,
          tags: true,
          _count: {
            select: {
              comments: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.post.count()
    ]);

    res.status(200).json({
      posts, 
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch(err : any) {
    res.status(500).json({message: err.message});
  }
});

// GET WITH SEARCH BY ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const post = await prisma.post.findUnique({
      where: {id}
    });

    if (!post) {
      return res.status(404).json({message: 'Post not found'});
    }

    res.status(200).json(post);
  } catch (err : any) {
    res.status(500).json({message: err});
  }
});

// POST 
app.post('/api/posts', async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: req.body
    });
    res.status(201).json(post);
  } catch (err : any) {
    res.status(400).json({message: err});
  }
});

// PUT
app.put('/api/posts/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const post = await prisma.post.update({
      where: {id},
      data: data
    });
    res.status(200).json(post);
  } catch (err : any) {
    res.status(400).json({message: err.message});
  }
});

// DELETE 
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const post = await prisma.post.findUnique({
      where: {id}
    });

    if (!post) {
      res.status(404).json({message: 'Post not found'});
    }

    await prisma.post.delete({
      where: {id}
    });
    res.status(204).send();
  } catch (err : any) {
    res.status(400).json({message: err.message});
  }
});

/**
 * COMMENT
 */

// GET ALL COMMENTS IN postId
app.get('/api/posts/:postId/comments', async (req, res) => {
  try {
    const {postId} = req.params;
    if (!postId) {
      return res.status(404).json({message: 'Post not found'});
    }

    const post = await prisma.post.findUnique({
      where: {id: postId}
    })

    if (!post) {
      return res.status(404).json({message: 'Post not found'});
    }

    const comments = await prisma.comment.findMany({
      where: {postId: postId}
    });

    res.status(200).json(comments);
  } catch (err : any) {
    res.status(500).json({message: err.message});
  }
});

// CREATE COMMENT IN POST BY ID
app.post('/api/posts/:postId/comments', async (request, res) => {
  try {
    const {postId} = request.params;
    const {content, authorId} = request.body;
    if (!postId) {
      return res.status(404).json({message: 'Post not found'});
    }

    const post = await prisma.post.findUnique({
      where: {id: postId}
    });

    if (!post) {
      return res.status(404).json({message: 'Post not found'});
    }

    const user = await prisma.user.findUnique({
      where: {id: authorId}
    });

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId
      }
    });
    res.status(201).json(comment);
  } catch (err : any) {
    res.status(400).json({message: err.message});
  }
});

// UPDATE COMMENT BY ID
app.put('/api/comments/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {content} = req.body;
    
    if (!content) {
      return res.status(400).json({message: 'Content is required'});
    }

    const existingComment = await prisma.comment.findUnique({
      where: {id}
    });

    if (!existingComment) {
      return res.status(404).json({message: 'Comment not found'});
    }

    const comment = await prisma.comment.update({
      where: {id},
      data: {content}
    });

    res.status(200).json(comment);
  } catch (err: any) {
    res.status(500).json({message: err.message});
  }
});

// DELETE COMMENT BY ID
app.delete('/api/comments/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const existingComment = await prisma.comment.findUnique({
      where: {id}
    });

    if (!existingComment) {
      return res.status(404).json({message: 'Comment not found'});
    }

    await prisma.comment.delete({
      where: {id}
    });

    res.status(204).send(); 
  } catch (err: any) {
    res.status(500).json({message: err.message});
  }
});

/**
 * CATEGORY
 */

// GET ALL CATEGORIES
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      }
    });
    res.status(200).json(categories);
  } catch (err: any) {
    res.status(500).json({message: err.message});
  }
});

// CREATE CATEGORY
app.post('/api/categories', async (req, res) => {
  try {
    const {name} = req.body;
    
    if (!name) {
      return res.status(400).json({message: 'Name is required'});
    }

    const category = await prisma.category.create({
      data: {name}
    });

    res.status(201).json(category);
  } catch (err: any) {
    if (err.code === 'P2002') {
      return res.status(409).json({message: 'Category name already exists'});
    }
    res.status(400).json({message: err.message});
  }
});

/**
 * TAG
 */

// GET ALL TAGS
app.get('/api/tags', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      }
    });
    res.status(200).json(tags);
  } catch (err: any) {
    res.status(500).json({message: err.message});
  }
});

// CREATE TAG
app.post('/api/tags', async (req, res) => {
  try {
    const {name} = req.body;
    
    if (!name) {
      return res.status(400).json({message: 'Name is required'});
    }

    const tag = await prisma.tag.create({
      data: {name}
    });

    res.status(201).json(tag);
  } catch (err: any) {
    if (err.code === 'P2002') {
      return res.status(409).json({message: 'Tag name already exists'});
    }
    res.status(400).json({message: err.message});
  }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
