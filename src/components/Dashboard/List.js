import React, {useState} from "react";

const ListItem = ({ item, index, onDeleteItem, onEditItem }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(item);

    const handleSave = () => {
        onEditItem(index, editValue);
        setIsEditing(false);
    };

    return (
        <li key={index}>
                <>
                    {item}
                    <button onClick={() => onDeleteItem(index)}>Go</button>
                </>
        </li>
    )
}

const List = ({ items }) => {
    return(
        <div>
            {items.length > 0 ? (
                <ul>
                   {items.map((item,index) => (
                    <ListItem
                        key={index}
                        item={item}
                        index={index}
                        
                    />
                   ))}
                </ul>
            ) : (
                <p>No items in the list</p>
            )}
        </div>
    );
};

export default List;