"use strict"

import { get_items, add_item, update_item_title_by_id, delete_item_by_id, get_item_title_by_id } from './data.js';

// Adding items
console.log(add_item({ id: 1, title: 'Book 1' }));  // true
console.log(add_item({ id: 2, title: 'Book 2' }));  // true
console.log(add_item({ id: 1, title: 'Book 1' }));  // false (ID 1 already exists)

// Getting all items
console.log(get_items());  // [{id: 1, title: 'Book 1'}, {id: 2, title: 'Book 2'}]

// Updating an item by ID
console.log(update_item_title_by_id(1, 'Updated Book 1'));  // true
console.log(update_item_title_by_id(3, 'Non-existing Book'));  // false

// Getting the title of an item by ID
console.log(get_item_title_by_id(1));  // "Updated Book 1"
console.log(get_item_title_by_id(3));  // null

// Deleting an item by ID
console.log(delete_item_by_id(2));  // true
console.log(delete_item_by_id(3));  // false (no item with ID 3)

// Final items list
console.log(get_items());  // [{id: 1, title: 'Updated Book 1'}]
