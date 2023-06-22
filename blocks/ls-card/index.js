// this file will only be loaded in the editor interface
import {registerBlockType} from '@wordpress/blocks';
import Save from './save';
import Edit from './edit';
import metadata from './block.json';

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
});
