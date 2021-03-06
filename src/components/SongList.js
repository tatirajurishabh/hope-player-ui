import React, { useContext, useState } from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import GlobalState from '../contexts/GlobalState';
import { shufflePlaylist } from '../utils/utils';

import EditIcon from '../assets/pencil.svg'
import { editAccess } from '../utils/EnvProvider';

import EditSongModal from './EditSong';


const SongList = (props) => {
    const [state, setState] = useContext(GlobalState);
    const [showEditSongModal, setShowEditSongModal] = useState(false);
    const [songToEdit, setSongToEdit] = useState(null);

    const showEditModal = (song) => {
        setSongToEdit(song);
        setShowEditSongModal(true);
    }

    const onEditSuccess = (newDetails) => {
        props.playlist.forEach(element => {
            if (element.id === newDetails.id) {
                element = newDetails;
            }
        });
    }

    const callPlay = (song) => {
        let newQueue = [...props.playlist]
        if (state.shuffleOn) {
            newQueue = shufflePlaylist(newQueue, song);
        }
        setState(state => ({ ...state, currentSong: song, queue: newQueue, originalQueue: props.playlist }))
    }

    const playlist = props.playlist.map(song => {
        const className = (state.currentSong !== null && state.currentSong?.id === song?.id) ? 'song-listing-active' : 'song-listing';
        return <Row key={song.id} className={className + ' pt-3 pb-3 m-0'}>
            <Col md="auto" className="p-0 m-0 align-self-center" onClick={() => callPlay(song)}>
                <Image src={song.art} roundedCircle className="song-listing-art mr-4" />
            </Col>
            <Col className="p-0 m-0 align-self-center" onClick={() => callPlay(song)}>
                <div>
                    <p className="song-listing-title">{song.name}</p>
                    <p className="song-listing-artist">{song.artist}</p>
                </div>
            </Col>
            <Col md="auto" className="p-0 m-0 align-self-center">
                <div>
                    {song.tags.map(tag => {
                        return <Badge variant="dark" className="mr-2" key={tag}>{tag}</Badge>
                    })}
                </div>
            </Col>
            {
                editAccess() ?
                    <Col md="auto" className="p-0 m-0 ml-3 mr-3 align-self-center">
                        <Image src={EditIcon} width="16px" alt="" onClick={() => showEditModal(song)}/>
                    </Col>
                    :
                    ''
            }
        </Row>;
    });

    return (
        <div className="mr-4 mt-3">
            {playlist}
            <EditSongModal
                showEditModal={showEditSongModal}
                setShowEditModal={setShowEditSongModal}
                song={songToEdit}
                callback={onEditSuccess} />
        </div>
    );
}

export default SongList;