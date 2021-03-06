import React from 'react';
import AudioQuality from '../components/settings/AudioQuality';
import DefaultSort from '../components/settings/DefaultSort';
import ExportLibrary from '../components/settings/ExportLibrary';
import ImportLibrary from '../components/settings/ImportLibrary';
import { editAccess } from '../utils/EnvProvider';


const Settings = () => {
    return (
        <div className="page-root settings-container">
            <h3 className="page-headline mt-5 ml-5 mr-5 mb-0 bottom-border">Settings</h3>
            <div className="settings-list-container">
                <AudioQuality />

                <DefaultSort />

                <ExportLibrary />

                {editAccess() ? <ImportLibrary /> : ''}
            </div>
        </div>
    );
}

export default Settings;