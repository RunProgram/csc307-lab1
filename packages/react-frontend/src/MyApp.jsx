// src/MyApp.jsx
import React, { useState, useEffect } from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(id) {
        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.status !== 204) {
                    throw new Error();
                }
                setCharacters(characters.filter((character) => character._id !== id));
            })
            .catch((error) => console.log(error));
    }

    function updateList(person) {
        postUser(person)
            .then((res) => {
                if (res.status !== 201) {
                    throw new Error();
                }
                return res.json();
            })
            .then((json) => setCharacters([...characters, json]))
            .catch((error) => console.log(error));
    }

    function fetchUsers() {
        return fetch("http://localhost:8000/users");
    }

    function postUser(person) {
        return fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => console.log(error));
    }, []);


    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;