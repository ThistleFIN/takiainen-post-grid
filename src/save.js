/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Save Component
 *
 * @param {Object} attributes - attributes from the block
 *
 * The Save component is responsible for the final output of the custom block on the frontend of the site.
 * This component fetches the posts, displays them in a grid format and also provides the 'Read More' link for each post.
 */
const Save = ( { attributes } ) => {
	// Deconstructing fetchedPosts from attributes
	const { fetchedPosts } = attributes;

	return (
		<div>
			{
				// Check if posts were fetched and if there are at least 3 posts
				fetchedPosts && fetchedPosts.length >= 3 ? (
					<div className="components-grid">
						{
							// Map through each post and render the post data
							fetchedPosts.map( ( post ) => (
								<div className="card-container" key={ post.id }>
									<div className="components-card">
										<div className="upper-card">
											<div className="components-card-media">
												<img
													src={ post.media_url }
													alt={ post.media_alt }
												/>
											</div>
										</div>
										<div className="lower-card">
											<div className="components-card-body">
												<h4 className="components-text components-heading">
													{ post.title.rendered }
												</h4>
												<span className="components-text">
													{ post.date_formatted }
												</span>
											</div>
											<div className="components-card-body">
												<span className="components-text">
													{ post.categories.join(
														', '
													) }
												</span>
											</div>
											<div className="components-card-footer">
												<a
													href={ post.link }
													target="_blank"
													rel="noopener noreferrer"
												>
													{ __(
														'Read More',
														'takiainen-post-grid'
													) }
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
											</div>
										</div>
									</div>
								</div>
							) )
						}
					</div>
				) : null
			}
		</div>
	);
};

export default Save;
