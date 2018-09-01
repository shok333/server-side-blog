const BaseController = require('../libs/BaseController');
const dbPost = require('../models/Post');
const dbUser = require('../models/User');

class PublicController extends BaseController {
    getMainJS () {
        this.staticFileResponse('./static/main.js');
    }

    getMainCSS () {
        this.staticFileResponse('./static/main.css');
    }

    getIndex () {
        this.serverRenderingResponse([1, 2, 3]);
    }

    getInitialState () {
        this.jsonResponse([1, 2, 3, 4, 5]);
    }

    async getPosts () {
        const posts = await dbPost.getAll();
        this.serverRenderingResponse({
            posts: {
                postList: posts,
                postListHasLoaded: true,
            }
        });
    }

    async getPostsPayload () {
        const posts = await dbPost.getAll();
        this.jsonResponse({
            posts: {
                postList: posts,
                postListHasLoaded: true,
            }
        });
    }

    getCreatePost () {
        this.serverRenderingResponse();
    }
}

module.exports = PublicController;