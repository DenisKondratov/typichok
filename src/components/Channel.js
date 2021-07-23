import React, { useState, useEffect, useRef } from "react";
import firebase from "../config/firebase";
import Message from "./Message";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";

const Channel = ({ user, db }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const dummy = useRef()

  const { uid, displayName, photoURL } = user;

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
        });
      return unsubscribe;
    }
  }, [db]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (db) {
      await db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        displayName,
      });
    }
    dummy.current.scrollIntoView({block: "center", behavior: 'smooth'});
    setNewMessage('') 
  };

  return (
    <div className='d-flex justify-content-center flex-column align-items-center' style={{margin: '0 auto', width: 600}}>
      <ul style={{listStyle: 'none', height: '70vh', overflow: 'scroll', overflowX: 'hidden'}}>
        {messages.map((message) => (
          <li ref={dummy} key={message.id}>
            <Message {...message} />
          </li>
        ))}
      </ul>
      <form onSubmit={handleOnSubmit}>
        <TextField
          id="outlined-basic"
          label="message"
          variant="outlined"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="input message"
          style={{width: '300px', color: '#fff'}}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>send</Icon>}>
          Send
        </Button>
        {/* <button >Send</button> */}
      </form>
    </div>
  );
};

export default Channel;
