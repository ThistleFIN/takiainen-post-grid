// Importing the necessary WordPress components
import {
	__experimentalHeading as Heading,
	__experimentalText as Text,
	Card,
	CardBody,
	CardFooter,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// The SelectedPosts component displays a list of selected posts
const SelectedPosts = ( { posts } ) => {
	// If there are no posts, return null
	if ( posts.length === 0 ) {
		return null;
	}

	// If there are posts, map over the posts and create a Card for each one
	return posts.map( ( post ) => (
		<div key={ post.id }>
			<Card isBorderless variant="secondary">
				<div className="upper-card">
					<div className="components-card-media">
						<img src={ post.media_url } alt={ post.media_alt } />
					</div>
				</div>
				<div className="lower-card">
					<CardBody>
						<Heading level={ 4 }>{ post.title.rendered }</Heading>
						<Text>{ post.date_formatted }</Text>
					</CardBody>
					<CardBody>
						<Text upperCase variant="muted">
							{ post.categories.join( ', ' ) }
						</Text>
					</CardBody>
					<CardFooter>
						<a
							href={ post.link }
							target="_blank"
							rel="noopener noreferrer"
						>
							{ __( 'Read More', 'takiainen-post-grid' ) }
							<span className="arrow-right">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="1em"
									viewBox="0 0 320 512"
								>
									<path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
								</svg>
							</span>
						</a>
					</CardFooter>
				</div>
			</Card>
		</div>
	) );
};

// Export the component for use in other modules
export default SelectedPosts;
