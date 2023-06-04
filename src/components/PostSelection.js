import fetch from 'isomorphic-fetch';
import AsyncSelect from 'react-select/async';

// Define the PostSelection functional component.
// This component is used to select posts.
const PostSelection = ( { selectedPosts, setSelectedPosts } ) => {
	// Initial empty options array.
	let options = [];

	// This function is responsible for loading options.
	const loadOptions = ( inputValue, callback ) => {
		// Define the default endpoint URL.
		let endpoint = `/wp-json/wp/v2/posts?per_page=10&orderby=date&order=desc`;

		// If there's an inputValue, adjust the endpoint to include a search parameter.
		if ( inputValue ) {
			endpoint = `/wp-json/wp/v2/posts?search=${ inputValue }`;
		}

		// Fetch data from the endpoint and process it into JSON format.
		// Then map the posts to options.
		fetch( endpoint )
			.then( ( response ) => response.json() )
			.then( ( posts ) => {
				options = posts.map( ( post ) => ( {
					value: post.id,
					label: post.title.rendered,
				} ) );
				callback( options );
			} );
	};

	// Return the AsyncSelect component with the required props.
	return (
		<AsyncSelect
			name="select-two"
			value={ selectedPosts }
			onChange={ ( newSelectedPost ) =>
				setSelectedPosts( newSelectedPost )
			}
			isMulti={ true }
			isOptionDisabled={ () => selectedPosts.length >= 3 }
			loadOptions={ loadOptions }
			defaultOptions
		/>
	);
};

// Export the PostSelection component as a default export.
export default PostSelection;
