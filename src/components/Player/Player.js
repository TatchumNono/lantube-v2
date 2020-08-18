import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Nav from '../Navbar/Nav';

export default function Player(props) {
  const { id } = props.match.params;
  const [info, setInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:4000/file/files/${id}`)
      .then((res) => {
        console.log(res.data);
        setInfo(res.data.file[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(info);

  return (
    <div>
      <Nav />
      <ReactPlayer
        style={{
          width: 210,
          height: 120,
          backgroundSize: 'cover',
        }}
        url={`http://localhost:4000/file/stream?filePath=${info.filepath}`}
        forceaudio="true"
        forcevideo="true"
        controls={true}
        playing={true}
      />
    </div>
  );
}
