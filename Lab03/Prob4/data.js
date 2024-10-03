"use strict"

let data = [];

export function get_items() { 
    return data; 
} 

export function add_item(new_item) { 
    // add item (if id does not exist) 
    // return true if item is added successfully, false otherwise 
    const exists = data.some(item => item.id === new_item.id)
    if (!exists) {
        data.push(new_item)
        return true
    }
    else {
        return false
    }
} 

export function update_item_title_by_id(id, new_title) { 
    // update the title (if id exist) 
    // return true if item is update successfully, false otherwise 
    const item = data.find(item => item.id === id)
    if (item) {
        item.title = new_title
        return true
    }
    else {
        return false
    }
}

export function delete_item_by_id(id) { 
    // delete the item (if id exist) 
    // return true if item is deleted successfully, false otherwise
    const index = data.findIndex(item => item.id === id)
    if (index !== -1) {
        data.splice(index, 1)
        return true
    }
    else {
        return false
    }
} 

export function get_item_title_by_id(id) { 
    // return the item title by id (if id exist) 
    const item = data.find(item => item.id === id)
    if (item) {
        return item.title
    }
    else {
        return null
    }
}