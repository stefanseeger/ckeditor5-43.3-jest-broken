/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from 'ckeditor5';
import { commentsMock as comments } from './mock-data';

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

export class CommentsIntegration extends Plugin {
	static get pluginName() {
		return 'CommentsAdapter';
	}

	static get requires() {
		return [ 'Users', 'UsersInit', 'CommentsRepository' ];
	}

	init() {
		const usersPlugin = this.editor.plugins.get( 'Users' );
		const commentsRepositoryPlugin = this.editor.plugins.get( 'CommentsRepository' );

		// Set the adapter to the `Comments#adapter` property.
		commentsRepositoryPlugin.adapter = {
			addComment: data => {
				console.log( 'Comment added', data );

				// Write a request to your database here. The returned `Promise`
				// should be resolved when the request has finished.
				return Promise.resolve( {
					createdAt: new Date(),		// Should be set server-side.
                    commentId: uuidv4(),
				} );
			},

			updateComment: data => {
				console.log( 'Comment updated', data );

				// Write a request to your database here. The returned `Promise`
				// should be resolved when the request has finished.
				return Promise.resolve();
			},

			removeComment: data => {
				console.log( 'Comment removed', data );

				// Write a request to your database here. The returned `Promise`
				// should be resolved when the request has finished.
				return Promise.resolve();
			},

			addCommentThread( data ) {
				console.log( 'Comment thread added', data );

				// Write a request to your database here. The returned `Promise`
				// should be resolved when the request has finished.
				return Promise.resolve( {
					threadId: data.threadId,
					comments: data.comments.map( comment => ( { commentId: comment.commentId || uuidv4(), createdAt: new Date() } ) ) // Should be set on the server side.
				} );
			},

			getCommentThread: ( { threadId } ) => {
				console.log( 'Get comment thread', threadId );

				// Write a request to your database here. The returned `Promise`
				// should resolve with comment thread data.
                const comment = comments.find( comment => comment.threadId === threadId );
                if(comment) {
                    return Promise.resolve( comment );
                }
                return Promise.reject(new Error("Not found"));
			},

			updateCommentThread( data ) {
				console.log( 'Comment thread updated', data );

				// Write a request to your database here. The returned `Promise`
				// should be resolved when the request has finished.
				return Promise.resolve();
			},

			resolveCommentThread( data ) {
				console.log( 'Comment thread resolved', data );

				// Write a request to your database here. The returned `Promise`
				// should be resolved when the request has finished.
				return Promise.resolve( {
                    threadId: data.threadId,
					resolvedAt: new Date(), // Should be set on the server side.
					resolvedBy: usersPlugin.me?.id ?? "u1" // Should be set on the server side.
				} );
			},

			reopenCommentThread( data ) {
				console.log( 'Comment thread reopened', data );

				// Write a request to your database here. The returned `Promise`
				// should be resolved when the request has finished.
				return Promise.resolve();
			},

			removeCommentThread( data ) {
				console.log( 'Comment thread removed', data );

				// Write a request to your database here. The returned `Promise`
				// should be resolved when the request has finished.
				return Promise.resolve();
			}
		};
	}
}