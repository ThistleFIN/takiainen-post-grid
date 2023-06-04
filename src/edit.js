// Importing necessary modules and components
import { InspectorControls } from '@wordpress/block-editor';
import {
	__experimentalGrid as Grid,
	PanelBody,
	Placeholder,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SelectedPosts from './components/SelectedPosts';
import PostSelection from './components/PostSelection';
import {Fragment, useEffect, useState} from 'react';
import fetch from 'isomorphic-fetch';

// Fetches data for a given post by its ID
async function getPost( post_id ) {
	const response = await fetch( `/wp-json/wp/v2/posts/${ post_id }` );
	return await response.json();
}

// Fetches the media related to a post
async function getCardMedia( post ) {
	if ( post.featured_media ) {
		const response = await fetch(
			`/wp-json/wp/v2/media/${ post.featured_media }`
		);
		return await response.json();
	} else {
		return null;
	}
}

// Fetches category names associated with a post
async function getCategories( post ) {
	const category_ids = post.categories ? post.categories : [];
	return await Promise.all(
		category_ids.map( async ( id ) => {
			const response = await fetch( `/wp-json/wp/v2/categories/${ id }` );
			const category = await response.json();
			return category.name;
		} )
	);
}

const Edit = ( { attributes, setAttributes } ) => {
	const { fetchedPosts } = attributes;

	// Initialize state for selected posts
	const [ selectedPosts, setSelectedPosts ] = useState(
		fetchedPosts.map( ( post ) => ( {
			value: post.id,
			label: post.title.rendered,
		} ) )
	);

	// Fetches posts whenever the selected posts change
	useEffect( () => {
		const fetchPosts = async () => {
			// Array of promises to fetch all post data
			const fetchPostPromises = selectedPosts.map(
				async ( selected_post ) => {
					const post = await getPost( selected_post.value );
					post.categories = await getCategories( post );
					const media = await getCardMedia( post );
					post.media_url = media
						? media.source_url
						: 'https://placekitten.com/g/300/300';
					post.media_alt =
						media && media.alt_text
							? media.alt_text
							: __( 'Featured image for the post' );

					let date_object = new Date( post.date );
					post.date_formatted =
						date_object.getDate() +
						'.' +
						( date_object.getMonth() + 1 ) +
						'.' +
						date_object.getFullYear();
					return post;
				}
			);

			// Wait for all fetch promises to resolve
			const newPosts = await Promise.all( fetchPostPromises );

			// Update the attributes with the new posts
			setAttributes( { fetchedPosts: newPosts } );

			// Update selectedPosts if they are different
			const newSelectedPosts = newPosts.map( ( post ) => ( {
				value: post.id,
				label: post.title.rendered,
			} ) );
			if (
				JSON.stringify( selectedPosts ) !==
				JSON.stringify( newSelectedPosts )
			) {
				setSelectedPosts( newSelectedPosts );
			}
		};
		if ( selectedPosts.length ) {
			fetchPosts();
		}
	}, [ selectedPosts ] );

	// Rendering the block in the editor
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Shown Posts', 'takiainen-post-grid' ) }>
					<PostSelection
						selectedPosts={ selectedPosts }
						setSelectedPosts={ setSelectedPosts }
					/>
				</PanelBody>
			</InspectorControls>
			{ fetchedPosts && fetchedPosts.length >= 3 ? (
				<Grid alignment="spaced" gap="4">
					<SelectedPosts posts={ fetchedPosts } />
				</Grid>
			) : (
				<Placeholder
					label={ __( 'Choose three posts.', 'takiainen-post-grid' ) }
				/>
			) }
		</Fragment>
	);
};

export default Edit;
